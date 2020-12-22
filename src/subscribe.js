require("dotenv").config()

const { subscribeMessage } = require("./messages")

const service = "logger"

// Atributos que quero pegar da mensagem
const attributes = ["id", "service"]

subscribeMessage(service, attributes, handleMessage)

async function handleMessage(message) {
  return new Promise((resolve, reject) => {
    try {
      /**
       * A mensagem trás outras informações, estou pegando apenas os atributos
       * id, title e o corpo da mensagem (body)
       */
       const obj = {
        id: parseInt(message.MessageAttributes.id.StringValue),
        title: message.MessageAttributes.service.StringValue,
        message: message.Body,
      }

      console.log(obj)
      resolve()

    } catch (error) {
      console.error(error.message)
      reject()
    }
  })
}
