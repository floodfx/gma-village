var AWS = require('aws-sdk');
var config = require('../config');

AWS.config.update({
  accessKeyId: config.get("SNS_AWS_ACCESS_KEY"),
  secretAccessKey: config.get("SNS_AWS_SECRET_KEY"),
  region: config.get("SNS_REGION")
});

var sns = new AWS.SNS();

const sendSMS = (body, phone, subj="Gma Village") => {
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
