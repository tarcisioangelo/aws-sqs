const AWS = require('aws-sdk')

const { Consumer } = require('sqs-consumer');

// Configurações da AWS
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID, 
  secretAccessKey: process.env.SECRET_ACCESS_KEY, 
  region: process.env.REGION 
})

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
    sqs: new AWS.SQS({ apiVersion: process.env.API_VERSION })
  })
    
  app.on('error', (error) => console.error(error.message))
  
  app.on('processing_error', (error) => console.error(error.message))
  
  app.start()
  
  console.log(`** Recebendo mensagens da fila ${service}...`)
}

module.exports = { subscribeMessage }


