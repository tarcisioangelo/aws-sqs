const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
})

const sqs = new AWS.SQS({ apiVersion: process.env.API_VERSION })

async function deleteMessage(service, ReceiptHandle) {
    return new Promise((resolve, reject) => {
        try {
            /**
             * Construo a url de acordo com o nome do serviço (fila)
             * Em especial estou usando a fila fifo
             * Para entender leia a documentação da AWS
             */
            const QueueUrl = `${process.env.QUEUE_URL}/${service}.fifo`

            sqs.deleteMessage({ QueueUrl, ReceiptHandle }, (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    resolve('Mensagem excluída')
                }
            })

        } catch (error) {
            reject(error)
        }
    })

}

module.exports = { deleteMessage }