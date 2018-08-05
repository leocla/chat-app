const expect = require('expect');

const {isRealString} = require('./validation');

describe('Test Case of Validation', () => {
    it('Harus menolak non string', () => {
        var res = isRealString(99);
        expect(res).toBe(false);
    });

    it('Harus menolak jika string hanya spasi saja', () => {
        var res = isRealString('      ');
        expect(res).toBe(false);
    });


    it('Menerima String dari karakter non-spasi... contoh ?&-*', ()=> {
        var res = isRealString('  Tono#-&Blank');
        expect(res).toBe(true);
    });
})

// import is realString


/// isRealString
    // harus reject non string
    // harus reject string only space
    // harus menerima string dengan non-space karakter


