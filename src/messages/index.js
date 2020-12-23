const { sendMessageFifo } = require('./send')
const { receiveMessage } = require('./receive')
const { subscribe } = require('./subscribe')
const { deleteMessage } = require('./delete')

module.exports = { sendMessageFifo, receiveMessage, subscribe, deleteMessage }