const path = require('path')   /// untuk join direktori
const express = require('express')

const app = express();

//app.use(express.static(__dirname+'/public'))
app.use(express.static(path.join(__dirname, 'public')))

var port = 3000;

const publicPath = path.join(__dirname, '../public')

/*
console.log('testing server__ SUKSES')
console.log(__dirname);
console.log(__dirname + "\\public\\")
console.log(publicPath)  // ini yang benar
*/
app.get('/', (req, res) => {
    //res.send('Halo') 
    //res.sendFile(path.join('index.html')) // SALAH
    res.sendFile(path.join(__dirname+'/../public/index.html'))
})

app.get('/web', (req, res) => {
    res.sendFile('index.html')
})

app.listen(port, ()=> {
    console.log(`Server berjalan pada ${port}`)
})