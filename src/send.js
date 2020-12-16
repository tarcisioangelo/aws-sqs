require('dotenv').config()

const  { sendMessageFifo } = require('./messages')

const service = 'user-logger'

const attributes = [
  { n:'id', v: 1 },
  { n:'service', v: 'logger' },
  { n:'user', v: 3 },
  { n:'url', v: '2434234.234324.234324.jpg' },
  { n:'user', v: 'S' },
  { n:'teste', v: 'N' },
]

const message = service

async function send() {
  try {
    const idMessage = await sendMessageFifo(service, attributes, message)
    console.log('Mensagem enviada, id: ' + idMessage)
  } catch (error) {
    console.log(error)  
  }
}

send()
