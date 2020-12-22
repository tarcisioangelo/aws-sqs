const AWS = require('aws-sdk')
const https = require('https')
const { Consumer } = require('sqs-consumer');

// Configurações da AWS
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID, 
  secretAccessKey: process.env.SECRET_ACCESS_KEY, 
  region: process.env.REGION 
})

const sqsConfig = {
  apiVersion: process.env.API_VERSION,
  httpOptions: {
    agent: new https.Agent({
      keepAlive: true, 
      maxSockets: Infinity // Infinity is read as 50 sockets
    })
  }
}

function subscribeMessage(service, attributes = [], callback) {

  /**
   * Construo a url de acordo com o nome do serviço (fila)
   * Em especial estou usando a fila fifo
   * Para entender leia a documentação da AWS
   */
  const queueUrl = `${process.env.QUEUE_URL}/${service}.fifo`
  
  const app = Consumer.create({ 
    queueUrl, 
    handleMessage: callback, 
    messageAttributeNames: attributes,
    sqs: new AWS.SQS(sqsConfig)
  })
    
  app.on('message_processed', (message) => console.log('Mensagem recebida com sucesso!'))

  app.on('error', (error) => console.error(error.message))
  
  app.on('processing_error', (error) => console.error('Erro em processar a mensagem'))
  
  app.start()
  
  console.log(`** Recebendo mensagens da fila ${service}...`)
}

module.exports = { subscribeMessage }


