const express = require('express')
const app = express()
const port = 3000
// jalankan app, saat ada request GET ke halaman '/' jalankan fungsi berikut
// res apa yg dikirim express, req apa yg dikirimkan ke express
app.get('/', (req, res) => {
//   res.send('Hello World!')
    // res.json({
    //     nama:'sandika',
    //     email:'adwhbdi@mail.com',
    //     no:'386498364983'
    // })
    // __dirname artinya rootnya adalah folder app.js disimpan
    res.sendFile('./index.html', {root: __dirname})
})
app.get('/about', (req, res) => {
    //   res.send('Ini adalah halaman about!')
    res.sendFile('./about.html', {root: __dirname})
})
app.get('/contact', (req, res) => {
    //   res.send('Ini adalah halaman contact!')
    res.sendFile('./contact.html', {root: __dirname})
})
// mendapatkan string di bagian id
// http://localhost:3000/product/1/category/20
app.get('/product/:id/category/:idCat', (req,res)=>{
    res.send(`product ID: ${req.params.id} <br> category ID: ${req.params.idCat}`)
})
// mendapatkan string di bagian id menggunakan query
// http://localhost:3000/product/1?category=shoes
app.get('/product/:id', (req,res)=>{
    res.send(`product ID: ${req.params.id} <br> category ID: ${req.query.category}`)
})
// app.use digunakan untuk menjalankan middleware
// contoh menangani 404
app.use('/', (req,res)=>{
    res.status(404)
    res.send('404')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})