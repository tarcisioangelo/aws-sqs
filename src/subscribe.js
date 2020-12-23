require("dotenv").config()

const { subscribe } = require("./messages")

/**
 * Função responsável por ficar escutando as novas mensagens
 * Está em formato de callback pois não retorna uma promisse
 * 
 * @param service String
 * @param callback Function Promisse
 */
subscribe('logger', callback)

/**
 * Função de callback
 * Essa sim deve retornar uma promisse
 * Caso a mensagem seja processada de acordo com suas regras deve retornar um resolve
 * Assim a mensagem será excluída automaticamente da fila
 * @param {*} message 
 */
async function callback(message) {
  return new Promise((resolve, reject) => {
    try {
      if (!message)
        reject()


      /**
       * Aqui você deverá fazer toda lógica da sua aplicação
       * A mensagem vem em formato de objeto
       * Feito toda lógica retorna um resolve()
       */
      console.log(message)
      resolve()

    } catch (error) {
      console.error(error.message)
      reject()
    }
  })
}
