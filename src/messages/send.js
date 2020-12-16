const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
})

const sqs = new AWS.SQS({ apiVersion: process.env.API_VERSION })

// const services = ['logger', 'user_person']

async function sendMessageFifo(service, attributes, message) {

    const QueueUrl = `${process.env.QUEUE_URL}/${service}.fifo`

    return new Promise(async (resolve, reject) => {
        try {
            const idMessage = Date.now() + Math.random()

            const attrs = {}

            attributes.forEach(att => {
                attrs[att.n] =  {
                    DataType: 'String',
                    StringValue: String(att.v)
                }
            })

            const params = {
                QueueUrl,
                MessageAttributes: attrs,
                MessageBody: String(message),
                MessageDeduplicationId: String(idMessage),  
                MessageGroupId: "AC_",  
            }

            const objSize = JSON.stringify(message).length;
            
            if(objSize > 256) {
                throw `Mensagem maior que 256k -> ${objSize}k`
            } else {
                console.log(`Enviando... size: ${objSize}k`)
    
                sqs.sendMessage(params, function (error, data) {
                    if (error) {
                        reject(error.message)
                    } else {
                        resolve(data.MessageId)
                    }
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { sendMessageFifo }

