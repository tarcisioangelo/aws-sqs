require('dotenv').config()

const  { subscribeMessage } = require('./messages')

const service = ['logger','user-logger']

const attributes = ['id', 'service']

subscribeMessage(service[1], attributes, handleMessage)

async function handleMessage(message) {
  try {

    console.log({ 
      id: parseInt(message.MessageAttributes.id.StringValue),
      title: message.MessageAttributes.service.StringValue,
      message: message.Body
    })

  } catch (error) {
    console.error(error.message)    
  }
}
