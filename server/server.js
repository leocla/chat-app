const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publik_path = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
var app = express()

// var server = http.createServer((req, res)=> {

// })

var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publik_path)) // middleware


/// calling IO
// connection bukan membuat sendiri... tapi dari socket.io
// ~~~~~~ this is sending from server to CLIENT ~~~!!!
io.on('connection', (socket) => { 
    console.log('User baru telah terkoneksi');

    
    //~~ iki solution broooo
    // socket.emit('newMessage', {
    //     from : "tika",
    //     text: 'Pokoke asik',
    //     createdAt: 12345
    // })

    socket.on('createMessage', (newMessage) => {
        console.log('create Message', newMessage);
        io.emit('message', {
            from : newMessage.from,
            text : newMessage.text,
            createdAt : new Date().getTime()
        })
    });



    // ~~~~~~~~~~~~~~~~~~~~~~~~~ini yang lama
    socket.emit('emailBaru', {
        to : 'tono@hore.com',
        text : 'Halo dunia',
        createdAt : 123
    });

    socket.on('createEmail', (emailBaru) => {
        console.log('buat Email', emailBaru)
    });

    // ~~~~~~~~~~~ start gaweanku
    socket.emit('pesanBaru', {
        from : 'hokya@ea.com',
        pesan : 'INi pesan hehehhehe'
    })

    socket.on('buatPesan', (pesanBaru) => {
        console.log('pesan datang: ', pesanBaru);
    })
    // ~~~~~~~~~ end gaweanku

    socket.on('disconnect', () => {
        console.log('User telah disconnected')
    })

})


server.listen(port, () => {
    console.log(`SERVER BERJALAN!!! in ${port}`)
})

/**
 * ~~~~~~~~~~~~~~~~~
 * fungsi socket... 
 * agar tersambung terus... (real time communications)
 * membuat request terus ... hehehe..
 * untuk membuat Realtime Apps
 * ~~~~~~~~~~~~~~~~~
 */