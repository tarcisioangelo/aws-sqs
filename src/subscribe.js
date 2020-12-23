require("dotenv").config()

const { subscribe } = require("./messages")

/**
 * @params
 * service
 * callback
 */
subscribe('logger', callback)

async function callback(message) {
  return new Promise((resolve, reject) => {
    try {
      if(!message) 
        reject()


      console.log(message)
      resolve()

    } catch (error) {
      console.error(error.message)
      reject()
    }
  })
}
