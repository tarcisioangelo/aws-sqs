const AWS = require('aws-sdk')

// Configurações da AWS
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
})

const sqs = new AWS.SQS({ apiVersion: process.env.API_VERSION })

async function sendMessageFifo(service, message, attributes = []) {

    /**
     * Construo a url de acordo com o nome do serviço (fila)
     * Em especial estou usando a fila fifo
     * Para entender leia a documentação da AWS
     */
    const QueueUrl = `${process.env.QUEUE_URL}/${service}.fifo`

    return new Promise(async (resolve, reject) => {
        try {
           
            const params = {
                QueueUrl,
                MessageAttributes: patternAttrs(attributes),
                MessageBody: patternMessage(message),
                MessageDeduplicationId: getIdMessage(),  
                MessageGroupId: "AC_",  
            }

            /**
             * Aqui estou calculando o tamanho da mensage
             * Por padrão não pode ser maior que 256k
             */
            const objSize = JSON.stringify(message).length;

            if(objSize > 256) {
                throw `Mensagem maior que 256k -> ${objSize}k`
            } else {
                sqs.sendMessage(params, function (error, data) {
                    if (error) 
                        reject(error.message)
                        
                    resolve({ id: data.MessageId, size: `${objSize}k` })
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

/**
 * Função responsável para deixar os atributos no formato padrão da AWS
 * @param {*} attributes Object 
 */
function patternAttrs (attributes) {

    const attrs = {}

    /**
     * Faço uma lógica para pegar os atributos do array
     * e coloco no formato de objeto que é o padráo
     */
    attributes.forEach(att => {
        attrs[att.name] =  {
            DataType: 'String',
            StringValue: String(att.value)
        }
    })

    return attrs
}

/**
 * Recebe um objeto e transforma em array separando chaves e valores por :
 * Depois coloca em formato de string para ficar mais leve a mensagem
 * @param {*} message 
 */
function patternMessage (message) {

    const values = Object.values(message)
    const keys = Object.keys(message)

    const msg = []

    keys.forEach((key, k) => {
        msg.push(`${key}:${values[k]}`)
    })

    return JSON.stringify(msg)
}

/**
 * Gera um ID único para as mensagens
 */
function getIdMessage () {
    const id = Date.now() + Math.random()
    return String(id)
}

module.exports = { sendMessageFifo }

