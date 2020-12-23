require('dotenv').config()

const  { sendMessageFifo } = require('./messages')

// Nome da minha fila
const service = 'logger'

// Atributos que estou passando na mensagem
const attributes = []

/**
 * No caso montamos sempre a mensagem no formato de objeto
 * Ele vai fazer toda regra e colocar no padrão para ficar menor
 * Porque ele tem um limite de 256k por mensagem
 */
const message = {
  id: 1,
  service: service,
  imageId: '234324.234324',
  imageUrl: '234324.234324.jpg',
  destination: 'cover',
  user: 'parse',
  userId: 1,
  lat: '',
  lng: ''
}

/**
 * O result retornará em caso de sucesso o id e o tamanho da mensagem enviada
 * Estou usando await porque ele retorna uma Promisse
 */
async function send() {
  try {
    const result = await sendMessageFifo(service, message, attributes)
    console.log(`Mensagem com id: ${result.id} e ${result.size} enviada com sucesso!`)
  } catch (error) {
    console.log(error)  
  }
}

send()
