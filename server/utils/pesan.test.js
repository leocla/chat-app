var expect = require('expect')

var {generatePesan, generateLokasiPesan} = require('./pesan')

describe('Generate Pesan', () => {
    it('Harus generate pesan yang benar', (done) => {
        //~~~~ yang benar
        var from = "Tugiyo";
        var text = "Somethings is not wrong";
        // ES6
        var pesan = generatePesan(from, text);

        expect(pesan.createdAt).toBeA('number')
        expect(pesan).toInclude({from, text});
        done();
        /*
        // old
        var pesan = generatePesan({
            from : from,
            text: text
        })
        */
        /// store respon in var
        // assert from match
        // assert text match
        // assert createdAt is angka

        /* 
        /// salah jebule boss.... rapopo
        var from = "tono";
        var text = "Halo dunia";
        var createdAt = 388849439;
        
        expect(from).toBe('tono');
        expect(text).toBe('Halo dunia').toBeA('string');
        expect(createdAt).toBeA('number');
        done()
        */
    });
});

// testing lokasi ... lokasi yang diberikan benar atau tidak
describe('Testing Lokasi', () => {
    it('Harus menentukan lokasi sudah benar dari objek', (done)=> {
        var from ="Admin2"
        var lat = 15;
        var long = 1;
        var url = `https://www.google.com/maps?q=15,1`;
        var lokasi = generateLokasiPesan(from, lat, long);
    
        // make association
        ///expect(url).toInclude(15,1) // ini salah
        expect(lokasi.createdAt).toBeA('number');
        expect(lokasi).toInclude({from, url})
        done();
    })
})