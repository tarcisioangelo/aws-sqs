require('dotenv').config()

const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID, 
  secretAccessKey: process.env.SECRET_ACCESS_KEY, 
  region: process.env.REGION 
})

const QueueUrl = process.env.QUEUE_URL

const sqs = new AWS.SQS({ apiVersion: process.env.API_VERSION })

const idMessage = Date.now() + Math.random()

const params = {
  QueueUrl,
  // DelaySeconds: 10, // Remove DelaySeconds parameter and value for FIFO queues
  MessageAttributes: {
    "title": {
      DataType: "String",
      StringValue: "Enviando mensagens com AWS SQS"
    }
  },
  MessageBody: 'Corpo da mensagem, cuidado com o limite máximo de 256k',
  MessageDeduplicationId: String(idMessage),  // Required for FIFO queues
  MessageGroupId: "SQSIdTest",  // Required for FIFO queues
}

sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log("Error", err)
  } else {
    console.log("Success", data.MessageId)
  }
})
