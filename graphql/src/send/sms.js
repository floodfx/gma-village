var AWS = require('aws-sdk');
var config = require('../config');

AWS.config.update({
  accessKeyId: config.get("SNS_AWS_ACCESS_KEY"),
  secretAccessKey: config.get("SNS_AWS_SECRET_KEY"),
  region: config.get("SNS_REGION")
});

var sns = new AWS.SNS();

var isProd = process.env.NODE_ENV === 'production';

const sendSMS = (body, phone, subj="Gma Village") => {
  var msgBody = isProd ? body : `TEST ${body}`;
  var msgPhone = isProd ? phone : '4157027236';
  return new Promise((resolve, reject) => {  
    var params = {
      Message: body, 
      PhoneNumber: phone,
      Subject: subj,
    }
    console.log("Sending SMS", params)
    sns.publish(params, (err, data) => {
      if (err) {
        reject(err); 
      } else {
        resolve(data);
      } 
    })
  })
}

module.exports = {
  sendSMS
} 
