const expressLayouts = require('express-ejs-layouts')
const express = require("express");
const app = express();
const port = 3000;
const {loadContact, findContact} =require('./utils/contact.js')

// gunakan ejs
app.set("view engine", "ejs");
// middleware thirparty
app.use(expressLayouts)

// built in middleware
app.use(express.static('public'))

// jalankan app, saat ada request GET ke halaman '/' jalankan fungsi berikut
// res apa yg dikirim express, req apa yg dikirimkan ke express
app.get("/", (req, res) => {
  // cara menambahkan variabel dan mengirimnya ke file html
  const mahasiswa = [
    {
      nama: "sandika",
      email: "nfafnwi@nngen",
    },
    {
        nama:'dody',
        email:'ebfiebfi@biebgie'
    },
    {
        nama:'erik',
        email:'awdwaudguw@biebgie'
    }
  ];
  res.render("index", { nama: "sandika galih",title:'halaman beranda',mahasiswa, layout:'layouts/main-layout' });
});
app.get("/about", (req, res) => {
  res.render("about", {layout:'layouts/main-layout'});
});
app.get("/contact", (req, res) => {
  const contacts = loadContact()
  res.render("contact", {layout:'layouts/main-layout', contacts});
});
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama)
  res.render("detail", {layout:'layouts/main-layout', contact});
});
// mendapatkan string di bagian id
// http://localhost:3000/product/1/category/20
app.get("/product/:id/category/:idCat", (req, res) => {
  res.send(
    `product ID: ${req.params.id} <br> category ID: ${req.params.idCat}`
  );
});
// mendapatkan string di bagian id menggunakan query
// http://localhost:3000/product/1?category=shoes
app.get("/product/:id", (req, res) => {
  res.send(
    `product ID: ${req.params.id} <br> category ID: ${req.query.category}`
  );
});
// app.use digunakan untuk menjalankan middleware
// contoh menangani 404
app.use("/", (req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
