var AWS = require('aws-sdk');
var uuid = require('uuid/v4'); // random uuid
var config = require('../config');

AWS.config.update({
  accessKeyId: config.get("SQS_AWS_ACCESS_KEY"),
  secretAccessKey: config.get("SQS_AWS_SECRET_KEY"),
  region: config.get("SQS_REGION")
});

var sqs = new AWS.SQS();

var isProd = process.env.NODE_ENV === 'production';

const sendSQSBatch = (body, phones) => { 
  if(phones.length === 0) {
    return;
  } 
  if(phones.length > 10) {
    // only send 10 messages per batch
    var newPhones = phones.splice(0, 10);
    sendSQSBatch(body, newPhones);
    sendSQSBatch(body, phones);
    return;
  }
  
  var Entries = phones.map((phone) => {
    var msgId = uuid();
    var msgBody = isProd ? body : `TEST:${msgId} ${body}`;
    var msgPhone = isProd ? phone : '14157027236';
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
     QueueUrl: config.get("SQS_QUEUE_URL")
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

