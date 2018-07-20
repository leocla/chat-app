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
io.on('connection', (socket) => { 
    console.log('User baru telah terkoneksi')

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