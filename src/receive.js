require('dotenv').config()

const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID, 
  secretAccessKey: process.env.SECRET_ACCESS_KEY, 
  region: process.env.REGION 
})

const QueueUrl = process.env.QUEUE_URL

const sqs = new AWS.SQS({ apiVersion: process.env.API_VERSION })

const params = {
    QueueUrl,
    AttributeNames: [
        "SentTimestamp"
    ],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: [
        "All"
    ],
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0
}

const receiveMessage = async () => {
    
    sqs.receiveMessage(params, function(err, data) {
      if (err) {
        console.log("Receive Error", err)
      } else if (data.Messages) {
    
        console.log({ 
            author: data.Messages[0].MessageAttributes.title.StringValue,
            message: data.Messages[0].Body
        })
    
        const deleteParams = {
          QueueUrl,
          ReceiptHandle: data.Messages[0].ReceiptHandle
        }

        sqs.deleteMessage(deleteParams, function(err, data) {
          if (err) {
            console.log("Delete Error", err)
          } else {
            console.log("Message Deleted")
          }
        })
        
        receiveMessage()
      }
    })

}

module.exports = {receiveMessage}