require('dotenv').config()

const  { subscribeMessage } = require('./messages')

const service = 'logger'

// Atributos que quero pegar da mensagem
const attributes = ['id', 'service']

subscribeMessage(service, attributes, handleMessage)

async function handleMessage(message) {
  try {

    /**
     * A mensagem trás outras informações, estou pegando apenas os atributos 
     * id, title e o corpo da mensagem (body)
     */
    console.log({ 
      id: parseInt(message.MessageAttributes.id.StringValue),
      title: message.MessageAttributes.service.StringValue,
      message: message.Body
    })

  } catch (error) {
    console.error(error.message)    
  }
}
