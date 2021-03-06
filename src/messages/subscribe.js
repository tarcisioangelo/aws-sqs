const AWS = require('aws-sdk')
const https = require('https')
const { Consumer } = require('sqs-consumer');

// Configurações da AWS
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID, 
  secretAccessKey: process.env.SECRET_ACCESS_KEY, 
  region: process.env.REGION 
})

/**
 * Adicionando o httpOptions para manter uma conexão ativa
 * Caso contrário ele ficará se conectando a cada requisição
 */
const sqsConfig = {
  apiVersion: process.env.API_VERSION,
  httpOptions: {
    agent: new https.Agent({
      keepAlive: true, 
      maxSockets: Infinity
    })
  }
}

function subscribe(service, callback) {

  /**
   * Construo a url de acordo com o nome do serviço (fila)
   * Em especial estou usando a fila fifo
   * Para entender leia a documentação da AWS
   */
  const queueUrl = `${process.env.QUEUE_URL}/${service}.fifo`
  
  const app = Consumer.create({ 
    queueUrl,  
    sqs: new AWS.SQS(sqsConfig),
    messageAttributeNames: ['All'],
    handleMessage: (message => {
      const items = JSON.parse(message.Body)

      let obj = undefined
      
      if(Array.isArray(items)) {
        obj = {}

        items.forEach(value => {
          var item = value.split(':');
          obj[item[0]] = item[1]
        })
      }

      return callback(obj)
    }), 
  })

  app.on('message_processed', (message) => console.log('Mensagem recebida com sucesso!'))

  app.on('error', (error) => console.error(error.message))
  
  app.on('processing_error', (error) => console.error(error))
  
  app.start()
  
  console.log(`** Recebendo mensagens da fila ${service}...`)
}

module.exports = { subscribe }


