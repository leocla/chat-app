const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const {generatePesan, generateLokasiPesan} = require('./utils/pesan');
const {isRealString} = require('./utils/validation');

const {Users} = require('./utils/users');

const publik_path = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
var app = express()

// include module
const pesan = require('./utils/pesan')

// var server = http.createServer((req, res)=> {

// })

var server = http.createServer(app)
var io = socketIO(server)

// create .... @27/08/2018
var users = new Users();


app.use(express.static(publik_path)) // middleware

/// GET TIME --- membuat new variable waktu
var time = new Date().getTime();

/// calling IO
// connection bukan membuat sendiri... tapi dari socket.io
// ~~~~~~ this is sending from server to CLIENT ~~~!!!
io.on('connection', (socket) => { 
    console.log('User baru telah terkoneksi');

    /// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SECTION  2.5  ---- join event
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Nama dan Room dibutuhkan coy');
        }

        // membuat orang lain bisa join
        socket.join(params.room);

        /// new create on @27/08/2018
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room)); /// get from chat.js


        // socket.leave('Kantor A')

        // io.emit ---> io.to('Kantor A').emit
        // socket.broadcast.emit  --> socket.broadcast.to('Kantor A').emit
        //socket.emit

        
        // ~~~~~~~~~~~~~~~~ SECTION number (2.3) --- moving here
        socket.emit('pesanCinta', generatePesan('Admin', `Selamat Datang di aplikasi chat, ${params.name}`))
        socket.broadcast.to(params.room).emit('pesanCinta', generatePesan('Admin', `${params.name} telah bergabung`));
    
        callback();
    });
    
    //~~~~~~~ GUIDE
    // socket.emit from Admin text ... Welcome to the chat app
    // socket.broadcast.emit ... from Admin text ... New user joined

    // ~~~~~~~~~~~~~~~~ SECTION number (2.2) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // socket.emit from Admin text ... Welcome to the chat app
    /*
    socket.emit('pesanCinta', {
        from : 'Admin',
        text : 'Selamat datang di NODE CHAT APP',
        createdAt : time
    }); 

    // socket.broadcast.emit ... from Admin text ... New user joined
    socket.broadcast.emit('pesanCinta', {
        from : 'Admin',
        text: 'User baru bergabung woiiiiii',
        createdAt : time
    }) */

    /// ~~~~~~~~~~~~~~~~ SECTION number (2.1) --- backend  ~~~~~~~~~~~~~~~~~~~~~~~~~ /// sinonim dari createMessage
    socket.on('Hahaha', (pesan, callback) => { /// ini perintahnya.. ini buatan SAYA
        //console.log('buat pesan', pesan); /// ini muncul di SERVER
        // new code create @27/08/2018
        var user = users.getUser(socket.id); // get from getUser in users.js

        /// digunakan untuk private chat... ruang beda chat tidak keluar
        if(user && isRealString(pesan.text)){
            io.to(user.room).emit('pesanCinta', generatePesan(user.name, pesan.text));
        }

        
        //callback('this is ACK from server --> ini data dari SERVER looo');
        callback(); // dikosongi untuk menghilangkan pesan yang ada dalam kolom penulisan pesan ketika pesan sudah dikirim
        /*socket.broadcast.emit('pesanDatang', {  /// yang digunakan front end
            from : pesan.from,
            text: pesan.text,
            dibuatPada : new Date().getTime()
        })  */
    })
    /// ~~~~~~~~~~~~~~~ SECTION 2.4 ~~~~~~~~~~ GEOLOKASI
    socket.on('buatLokasiPesan', (koordinat) => {
        // code create in @27/08/2018
        // private send location  --- hanya muncul pada ROOM yang sama
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('pesanLokasiCinta', generateLokasiPesan(user.name, koordinat.lat, koordinat.long));
        }


        // print in apps client
        
        // print in server log
        console.log(`Mengirim koordinat : lat ${koordinat.lat} dan long ${koordinat.long}`);
    });


    //~~ iki solution broooo
    // socket.emit('newMessage', {
    //     from : "tika",
    //     text: 'Pokoke asik',
    //     createdAt: 12345
    // })

    socket.on('createMessage', (newMessage) => {
        console.log('create Message', newMessage);
        //~~~ lama
        /*
        io.emit('message', {
            from : newMessage.from,
            text : newMessage.text,
            createdAt : new Date().getTime()
        }) */
        //~~ broadcasting
        socket.broadcast.emit('pesanBaru', {
            from : newMessage.from,
            text: newMessage.text,
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
        // code created @@27/08/2018
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(users.room)); /// digunakan untuk update user list
            io.to(user.room).emit('pesanCinta', generatePesan('Admin', `${user.name} telah keluar`)); // print little message
        }
        console.log('User telah disconnected')
    })

})

//~~~~~~~~~~~~~~~~~~~~~ SERVER LISTENING ~~~~~~~~~~~~~~~~~~~~~~~~
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