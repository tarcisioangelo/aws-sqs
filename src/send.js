require('dotenv').config()

const  { sendMessageFifo } = require('./messages')

const service = 'logger'

const attributes = [
  { name: 'id', value: 1 },
  { name: 'title', value: 'Erro na consulta do banco de dados' }
]

const message = 'Error no serviço X'

async function send() {
  try {
    const idMessage = await sendMessageFifo(service, attributes, message)
    console.log('Mensagem enviada, id: ' + idMessage)
  } catch (error) {
    console.log(error.message)  
  }
}

send()
