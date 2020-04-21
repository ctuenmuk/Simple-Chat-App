const socket = io('http://localhost:3000')
const messageform = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const meessagecontainer = document.getElementById('message-container')

const name = prompt('what is you name?')
appendmessage('You have joined the chat!')
socket.emit('new-user', name)

socket.on('connected-user', name => {
    appendmessage(`${name} connected`)
})
socket.on('dc', name => {
    appendmessage(`${name} disconnected`)
})

socket.on('chat-message', data => {
    appendmessage(`${data.name}: ${data.message}`)
})

messageform.addEventListener('submit', i => {
    i.preventDefault()
    const message = messageInput.value
    socket.emit('send-chat-message',message)
    appendmessage(`$You ${message}`)
    messageInput.value =''
})

function appendmessage(message){
    const messageelement = document.createElement('div')
    messageelement.innerText = message
    meessagecontainer.appendChild(messageelement)
}