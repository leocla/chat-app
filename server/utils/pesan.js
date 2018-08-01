var moment = require('moment');

var waktuNow = moment().valueOf();

var generatePesan = (from, text) =>  {
    return {
        from,
        text,
        createdAt : waktuNow
    }
}

// menggunakan 3 arguments
var generateLokasiPesan = (from, lat, long) => { // admin, lat, long
    return {
        from,
        url : `https://www.google.com/maps?q=${lat},${long}`,   /// argument... namanya argument disebut parameter? benar? tidak tahu saya hehehe... ya nanti tahu 
        createdAt: waktuNow
        ///wkwkwkw salah
        //lat,
        //long
    }
}


module.exports = {
    generatePesan,
    generateLokasiPesan
};