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
            const idMessage = Date.now() + Math.random()

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

            const params = {
                QueueUrl,
                MessageAttributes: attrs,
                MessageBody: JSON.stringify(message),
                MessageDeduplicationId: String(idMessage),  
                MessageGroupId: "AC_",  
            }

            // /**
            //  * Aqui estou calculando o tamanho da mensage
            //  * Por padrão não pode ser maior que 256k
            //  */
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

module.exports = { sendMessageFifo }

