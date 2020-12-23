require('dotenv').config()

const  { sendMessageFifo } = require('./messages')

// Nome da minha fila
const service = 'logger'

// Atributos que estou passando na mensagem
const attributes = []

const message = [
  'id:1', 
  'service:events',
  'imageId:234324.234324',
  'imageUrl:234324.234324.jpg',
  'destination:cover',
  'user:parse',
  'userId:1',
  'lat:',
  'lng:',
]

async function send() {
  try {
    const result = await sendMessageFifo(service, message, attributes)
    console.log(`Mensagem com id: ${result.id} e ${result.size} enviada com sucesso!`)
  } catch (error) {
    console.log(error)  
  }
}

send()
