const path = require('path')
const express = require('express')

const publik_path = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
var app = express()

app.use(express.static(publik_path))

app.listen(port, () => {
    console.log(`SERVER BERJALAN!!! in ${port}`)
})