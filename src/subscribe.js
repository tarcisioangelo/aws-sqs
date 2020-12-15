require('dotenv').config()

const  { subscribeMessage } = require('./messages')

const service = 'logger'

const attributes = ['id', 'title']

subscribeMessage(service, attributes, handleMessage)

async function handleMessage(message) {
  try {
    console.log({ 
      id: parseInt(message.MessageAttributes.id.StringValue),
      title: message.MessageAttributes.title.StringValue,
      message: message.Body
    })

  } catch (error) {
    console.error(error.message)    
  }
}
