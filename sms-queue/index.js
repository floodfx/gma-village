var AWS = require('aws-sdk');
var Promise = require("bluebird");
var twilio = require('twilio');

var sqs = new AWS.SQS();
var sns = new AWS.SNS();

var SQS_QUEUE_URL = process.env.SQS_QUEUE_URL;
var TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
var TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

var twilioClient = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

console.log('Running GmaVillage SMS Queue');

exports.handle = function (event, context, callback) {
  console.log("request: " + JSON.stringify(event));

  processMessages(event, context, callback)
};

function processMessages(event, context, callback) {
  var receiveParams = {
    MaxNumberOfMessages: 10,
    MessageAttributeNames: [
      "All"
    ],
    VisibilityTimeout: 45,
    QueueUrl: SQS_QUEUE_URL
  };

  sqs.receiveMessage(receiveParams, function (err, data) {
    if (err) {
      console.log("SQS Receive Error", err);
      callback(err);
    } else {
      var sendPromises = [];
      console.log("data", data)
      if (!data.Messages) {
        callback();
      } else {
        console.log("Processing", data.Messages.length, "messages");
        for (var i = 0; i < data.Messages.length; i++) {
          var message = data.Messages[i];
          var body = message.Body;
          var phone = message.MessageAttributes['phone'].StringValue;
          var receipt = message.ReceiptHandle;
          console.log("received", message, body, phone);
          sendPromises.push(new Promise((resolve, reject) => {
            sendTwilioSms(phone, body, receipt)
              .then((data) => {
                var deleteParams = {
                  QueueUrl: SQS_QUEUE_URL,
                  ReceiptHandle: data.receipt
                };
                console.log("Delete Params", deleteParams);
                sqs.deleteMessage(deleteParams, (err, data) => {
                  if (err) {
                    console.log("Deleting SQS Message Error", err);
                    reject(err)
                  } else {
                    console.log("SQS Message Deletion Success", data);
                    resolve(data)
                  }
                });
              })
              .catch(err => reject(err));
          }));
        }
        // wait for all the sends to finish before calling callback with resolution
        Promise.all(sendPromises)
          .then(() => {
            callback()
          })
          .catch(err => callback(err));
      }
    }
  });

}

function sendSms(phone, body, receipt) {
  return new Promise(function (resolve, reject) {
    var params = {
      Message: body,
      PhoneNumber: phone,
      Subject: 'GmaVillage'
    }
    console.log("Sending SMS", params)
    sns.publish(params, (err, data) => {
      if (err) {
        console.log("SMS Error")
        reject(err);
      } else {
        console.log("SMS Sent", data)
        resolve({ sendSmsData: data, receipt: receipt });
      }
    })
  })
}

function sendTwilioSms(phone, body, receipt) {
  return new Promise(function(resolve, reject) {
    twilioClient.messages.create({
      body,
      to: `+${phone}`,  // Text this number
      from: '+15102444627' // From a valid Twilio number
    }, function (err, message) {
      if (err) {
        console.log("Twilio SMS Error", err)
        reject(err.message);
      } else {
        console.log("TWilio SMS Sent", message)
        resolve({sendSmsData: message, receipt: receipt});
      }
    });
  })
}