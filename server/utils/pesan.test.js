var expect = require('expect')

var {generatePesan} = require('./pesan')

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
    })
})