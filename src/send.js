require('dotenv').config()

const  { sendMessageFifo } = require('./messages')

// Nome da minha fila
const service = 'logger'

// Atributos que estou passando na mensagem
const attributes = [
  { name:'id', value: 1 },
  { name:'service', value: 'logger' },
  { name:'user', value: 3 },
  { name:'url', value: '2434234.234324.234324.jpg' },
  { name:'user', value: 'S' },
  { name:'teste', value: 'N' },
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
