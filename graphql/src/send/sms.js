var AWS = require('aws-sdk');
var config = require('../config');

AWS.config.update({
  accessKeyId: 'AKIAIAW4JF3FNAYEDYXQ',
  secretAccessKey: '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',
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
