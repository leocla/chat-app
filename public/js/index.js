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

socket.on('pesanBaru', function(newMessage){
    console.log('Pesan Baru brooo: ', JSON.stringify(newMessage))
})

/// ~~~~~~~~~~~~~~~~ SECTION number (2.1) --- front end ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ini untuk kemunculan di FRONT END
socket.on('pesanDatang', function(pesan){
    console.log('Pesan hahaha datang : ', JSON.stringify(pesan))
})

/// ~~~~~~~~~~~~~~~~ SECTION number (2.2) --- front end --- welcome by admin ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// berarti yang digunakan yang ini bro -- jQuery
socket.on('pesanCinta', function(pesan){
    console.log(JSON.stringify(pesan, undefined, 0));
    // get data
    var li = jQuery('<li></li>');
    li.text(`${pesan.from} : ${pesan.text}`);
    
    // data akan di render ke UI 
    jQuery('#pesan').append(li);
})

/// ~~~~~~~~~~~~~~~~ SECTION (2.3) in this file
/// untuk jQuery --- sementara dihapus
/*
socket.emit('Hahaha', {
    from : 'Tononk',
    text : 'Hi'
}, function(data){
    console.log('Hore Got it :', data);
});
*/


/**
 * contoh pengiriman data chat
 * ~~~~~~~~~~~~~~~~~~~
 * socket.emit('createMessage', {from: 'Toni', text:'Hy dunia'})
 */

///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// SECTION (2.4) -- jQuery -- message form

jQuery('#pesan-form').on('submit', function(ehe){
   ehe.preventDefault(); // untuk mencegah reload/refresh page...
   //disini kasusnya mencegah reload sesudah klik tombol 'kirim' --- silahkan buktikan sendiri dan inyong sudah membuktikan

   socket.emit('Hahaha', {
       from: 'User Asik',
       text: jQuery('[name=pesan]').val()
   }, function(){
        //console.log(text)
   })
})