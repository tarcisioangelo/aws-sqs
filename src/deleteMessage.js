require('dotenv').config()

const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID, 
  secretAccessKey: process.env.SECRET_ACCESS_KEY, 
  region: process.env.REGION 
})

const sqs = new AWS.SQS({ apiVersion: process.env.API_VERSION })

const execute = async (QueueUrl, ReceiptHandle) => {
  sqs.deleteMessage({ QueueUrl, ReceiptHandle }, function(err, data) {
    if (err) {
      console.log("Delete Error", err)
    } else {
      console.log("Message Deleted")
    }
  })
}

module.exports = {execute}