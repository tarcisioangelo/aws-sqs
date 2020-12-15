require('dotenv').config()

const  { receiveMessage, deleteMessage } = require('./messages')

const service = 'logger'

async function receive() {
    try {
        const message = await receiveMessage(service)

        console.log({
            id: parseInt(message.MessageAttributes.id.StringValue),
            title: message.MessageAttributes.title.StringValue
        })

        await deleteMessage(service, message.ReceiptHandle)

    } catch (error) {
        console.error(error)
    }
}

receive()
