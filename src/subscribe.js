require('dotenv').config()

const AWS = require('aws-sdk')

const { Consumer } = require('sqs-consumer');

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID, 
  secretAccessKey: process.env.SECRET_ACCESS_KEY, 
  region: process.env.REGION 
})

const QueueUrl = process.env.QUEUE_URL

const app = Consumer.create({ 
  queueUrl: QueueUrl, 
  handleMessage, 
  messageAttributeNames: ["title"],
  sqs: new AWS.SQS()
})
  
async function handleMessage(message) {
  try {
    console.log({ 
      author: message.MessageAttributes.title.StringValue,
      message: message.Body
    })

  } catch (error) {
    console.error('Ex: ', error.message)    
  }
}

app.on('error', (err) => console.error(err.message))

app.on('processing_error', (err) => console.error(err.message))

app.start()

console.log('** Recebendo mensagens...')
