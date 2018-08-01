console.log('halo dunia')

/// Januari 

var tanggal = new Date().getDate();
var bulan = new Date().getMonth();
var jam = new Date().getTime();

console.log(tanggal)
console.log(jam)
console.log(bulan)

var hehe = new Date();

console.log(hehe);
console.log('----------------------------');
var moment = require('moment');
var date1 = moment(); /// digunakan untuk biasa
var date = moment().locale('id'); // digunakan untuk bahasa lokal
console.log(date1.format('D MMMM YYYY, h:mm:ss a')) // en
console.log(date.format('D MMMM YYYY, h:mm:ss a')) // id
console.log(date.format('MMMMMMMMMMMM YYYY dddd'))

// coba
// Rabu, 1 Agustus 2018
console.log(date.format('dddd, D MMMM YYYY')) /// yeee benar

// ~~~~~~~~~~~~~~~~~~~~~  // penambahan tanggal
var telo = date.add(10, 'years').subtract(12, 'months')  /// tambah 10 tahun kurangi 1 tahun
console.log(telo.format('D MMMM YYYY'))


/// 10:35 am
console.log(date1.format('h:mm a'));
var jambaru = date1.subtract(5, 'hours');
console.log(jambaru.format('h:mm a'))


/////////////
var createdAt = 1284928549;
var date2 = moment(createdAt);
console.log(date2.format('dddd, D MMMM YYYY  ,    h:mm a'));

////////////
var waktuNow = new Date().getTime();
var date3 = moment(waktuNow);
console.log(date3.format('dddd, D MMMM YYYY'));

//// 
var timeStamp = moment().valueOf();
console.log(timeStamp)
var date4 = moment(timeStamp);
console.log(date4.format('dddd, D MMMM YYYY'));


console.log(new Date().getTime())