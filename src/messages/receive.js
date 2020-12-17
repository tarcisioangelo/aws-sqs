const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
})

const sqs = new AWS.SQS({ apiVersion: process.env.API_VERSION })

async function receiveMessage(service) {
    return new Promise((resolve, reject) => {
        try {
            /**
             * Construo a url de acordo com o nome do serviço (fila)
             * Em especial estou usando a fila fifo
             * Para entender leia a documentação da AWS
             */
            const QueueUrl = `${process.env.QUEUE_URL}/${service}.fifo`

            const params = {
                QueueUrl,
                AttributeNames: ["SentTimestamp"],
                MaxNumberOfMessages: 1,
                MessageAttributeNames: ["All"],
                VisibilityTimeout: 20,
                WaitTimeSeconds: 0
            }

            sqs.receiveMessage(params, function (error, data) {
                if (error) reject(error.message)

                if (data.Messages) {
                    resolve(data.Messages[0])
                } else {
                    reject('Nenhuma mensagem na fila')
                }
            })

        } catch (error) {
            reject(error.message)
        }
    })
}

module.exports = { receiveMessage }