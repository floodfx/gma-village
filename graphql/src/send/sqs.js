var AWS = require('aws-sdk');
var uuid = require('uuid/v4'); // random uuid
var config = require('../config');

AWS.config.update({
  accessKeyId: config.get("SQS_AWS_ACCESS_KEY"),
  secretAccessKey: config.get("SQS_AWS_SECRET_KEY"),
  region: config.get("SQS_REGION")
});
var QueueUrl = config.get("SQS_QUEUE_URL");
var isProd = process.env.NODE_ENV === 'production';

var sqs = new AWS.SQS();

const sendSQSBatch = (body, phones) => { 
  var msgBody = isProd ? body : `TEST: (${phones.length} msgs) ${body}`;
  var msgPhones = isProd ? phones : ['4157027236'];
  if(msgPhones.length === 0) {
    return;
  } 
  if(msgPhones.length > 10) {
    // only send 10 messages per batch
    var newPhones = msgPhones.splice(0, 10);
    return Promise.all([
      sendSQSBatch(body, newPhones),
      sendSQSBatch(body, msgPhones)
    ]);
  }

  var Entries = msgPhones.map((msgPhone) => {
    var msgId = uuid();
    if(msgPhone.length === 10) {
      // make sure phone starts with 1
      msgPhone = `1${msgPhone}`;
    }
    return {
      Id: msgId,
      MessageBody: msgBody,
      MessageAttributes: {
        "phone": {
          DataType: "String", 
          StringValue: msgPhone
        }      
      },
      MessageDeduplicationId: msgId,
      MessageGroupId: "sms"
    }
  })
  var batchParams = {
    Entries,
    QueueUrl
  }  
  return new Promise((resolve, reject) => {      
    sqs.sendMessageBatch(batchParams, function(err, data) {
      if (err) {
        reject(err); 
      } else {
        resolve(data);
      }      
    });
  })
}

const sendSQS = (body, phone) => {
  var msgBody = isProd ? body : `TEST ${body}`;
  var msgPhone = isProd ? phone : '14157027236';
  return new Promise((resolve, reject) => {  
    var params = {
      MessageAttributes: {
      "phone": {
        DataType: "String", 
        StringValue: msgPhone
        }      
      }, 
      MessageBody: msgBody, 
      MessageDeduplicationId: uuid(),
      MessageGroupId: "sms",
      QueueUrl: config.get("SQS_QUEUE_URL")
    };
    sqs.sendMessage(params, function(err, data) {
      if (err) {
        reject(err); 
      } else {
        resolve(data);
      }      
    });
  })
}

module.exports = {
  sendSQS,
  sendSQSBatch
} 

