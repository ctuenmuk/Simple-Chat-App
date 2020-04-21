const io = require("socket.io")(3000)

const users = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('connected-user', name)
    })
    socket.on('send-chat-message', message =>{
        socket.broadcast.emit('chat-message', { message: message, name:
        users[soket.id]})
    })
})

io.on('dc', () => {
    socket.on('new-user', name => {
        socket.broadcast.emit('dc-user', users[socket.id])
        delete users[socket.id]
    })