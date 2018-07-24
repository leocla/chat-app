/**
 * refactoring from index.html
 * ~~~~~ sending from CLIENT to server
 */

var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

    /// ~~~ client to server
    /*
    socket.emit('createMessage', {
        from : 'Tono', 
        text: 'Hai, I am tono'
    });

    socket.emit('createEmail', {
        to : 'asik@asik.com',
        text : 'Halo hahahha'
    });

    socket.emit('buatPesan', {
        text: "asik asiks jossss"
    });
    */
});

// ini method asli dari socket.io --- disconnect
socket.on('disconnect', function() {
    console.log('Putus dari server')
});

// socket.on('emailBaru', function(email){
//     console.log('Email baru hehehe', email);
//     console.log(JSON.stringify(email, undefined, 2))
// });

// ~~~ baru ! solution ..
socket.on('message', function(newMessage){
    console.log('Pesan baru : ', JSON.stringify(newMessage, undefined, 2))
} )


/**
 * contoh pengiriman data chat
 * ~~~~~~~~~~~~~~~~~~~
 * socket.emit('createMessage', {from: 'Toni', text:'Hy dunia'})
 */