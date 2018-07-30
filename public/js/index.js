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

//// ~~~~~~~~~~~~~~~~~~~~~~~~ SECTION 2.5 ~~~~~~~~~~~
socket.on('pesanLokasiCinta', function(lokasi){
    var li_lokasi = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li_lokasi.text(`${lokasi.from}: `);
    a.attr('href', lokasi.url);
    li_lokasi.append(a);
    jQuery('#pesan').append(li_lokasi);

})
///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// SECTION (2.4) -- jQuery -- message form

jQuery('#pesan-form').on('submit', function(ehe){
   ehe.preventDefault(); // untuk mencegah reload/refresh page...
   //disini kasusnya mencegah reload sesudah klik tombol 'kirim' --- silahkan buktikan sendiri dan inyong sudah membuktikan

   var pesanTextBox = jQuery('[name=pesan]');
   socket.emit('Hahaha', {
       from: 'User Asik',
       text: pesanTextBox.val()
   }, function(){
        //console.log(text)

        pesanTextBox.val('')
   })
})

var lokasiButton = jQuery('#kirim-lokasi');
// sama dengan ::: jQuery('#kirim-lokasi').on()
lokasiButton.on('click', function(e){ // menggunakan perintah klik
    e.preventDefault();

    //alert('Berhasil diklik')
    if(!navigator.geolocation){
        return alert('no lokasi - Geolokasi tidak didukung oleh browser anda')
    }

    lokasiButton.attr('disabled', 'disabled').text('sedang proses mengirim lokasi...');// untuk disable button

    navigator.geolocation.getCurrentPosition(function(position){
        lokasiButton.removeAttr('disabled').text('Kirim lokasi');

       // if Sukses
        console.log(position);
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        var hasilLokasi = document.getElementById('apps');
        hasilLokasi.innerHTML = `<p>Hasil lokasi latitude-nya adalah ${lat} sedangkan longitude-nya adalah ${long}`;
        
        // socket
        socket.emit('buatLokasiPesan', {
            lat,
            long
        });

    }, function(){
        lokasiButton.removeAttr('disabled').text('Kirim lokasi');
        // if not sukses dan tidak diijinkan akses ambil lokasi
       // alert('Gagal mengambil lokasi');
        //\\outputHore.innerHTML('<p>Gagal mengambil lokasi... Hehehe</p>') // SALAH
        var outputHore = document.getElementById('apps')
        outputHore.innerHTML = '<p>Maaf, gagal mengambil lokasi</p>'
        //~~~ bawah ini benar
        //var telo = document.getElementById('apps');
        //telo.innerHTML = 'asik'
    }); 

    //my code is NOT YET ... ternyata benar
    // navigator.geolocation.getCurrentPosition(function(position){
    //     let lat = position.coords.latitude;
    //     let lang = position.coords.longitude;
    //     console.log(`Hasile adalah Lat : ${lat} dan Long : ${lang}`);
    // })

})
