const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const app = express();
const port = 3000;
const { Contact, mongoose } = require("./model/contact.js");
const { check, body, validationResult } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const method = require('method-override')

// gunakan ejs
app.set("view engine", "ejs");
// middleware thirparty
app.use(expressLayouts);

// built in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(method('_method'))

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
      nama: "dody",
      email: "ebfiebfi@biebgie",
    },
    {
      nama: "erik",
      email: "awdwaudguw@biebgie",
    },
  ];
  res.render("index", {
    nama: "sandika galih",
    title: "halaman beranda",
    mahasiswa,
    layout: "layouts/main-layout",
  });
});
app.get("/about", (req, res) => {
  res.render("about", { layout: "layouts/main-layout" });
});
app.get("/contact", async(req, res) => {
  const contacts = await Contact.find();
  res.render("contact", {
    title: "form tambah data",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash("msg"),
  });
});

// halaman form tambah data
app.get("/contact/add", (req, res) => {
  res.render("add-contact", { layout: "layouts/main-layout" });
});
// proces data contact
app.post(
  "/contact",
  [
    body("nama").custom( async (value) => {
      const duplikat = await Contact.findOne({ nama:value});
      if (duplikat) {
        throw new Error("Nama sudah digunakan!");
      }
      return true;
    }),
    check("email", "email tidak valid").isEmail(),
    check("noHP", "nomor hp tidak valid").isMobilePhone("id-ID"),
  ],
   (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
       Contact.insertMany(req.body, (error, result)=>{
        req.flash("msg", "Data contact berhasil ditambahkan!");
        res.redirect("/contact");
      });
    }
  }
);
// // proses delete contact
// app.get("/contact/delete/:nama", async (req, res) => {
//   const contact = await Contact.findOne({nama :req.params.nama});
//   // jika kontak tidak ada
//   if (!contact) {
//     res.status(404);
//     res.send("<h1>404</h1>");
//   } else {
//     // untuk parameter "nama: req.params.nama" bisa diganti dengan "_id: contact._id"(mengambil data dari const contact)
//     Contact.deleteOne({nama: req.params.nama}).then((result)=>{
//       req.flash("msg", "Data contact berhasil dihapus!");
//       res.redirect("/contact");
//     });
//   }
// });
// dijadikan restful
app.delete('/contact', (req,res)=>{
  Contact.deleteOne({nama: req.body.nama}).then((result)=>{
          req.flash("msg", "Data contact berhasil dihapus!");
          res.redirect("/contact");
        });
})
// form ubah data kontak
app.get("/contact/edit/:nama", async(req, res) => {
  const contact = await Contact.findOne({nama:req.params.nama});
  res.render("edit-contact", { layout: "layouts/main-layout", contact });
});
// // proses ubah kontak
// dijadikan restful
app.put(
  "/contact",
  [
    body("nama").custom(async(value, { req }) => {
      const duplikat = await Contact.findOne({nama:value});
      if (value !== req.body.oldName && duplikat) {
        throw new Error("Nama sudah digunakan!");
      }
      return true;
    }),
    check("email", "email tidak valid").isEmail(),
    check("noHP", "nomor hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("edit-contact", {
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne({_id: req.body._id},
        {$set:{
          nama: req.body.nama,
          email: req.body.email,
          noHP: req.body.noHP
        }}).then((result)=>{
          req.flash("msg", "Data contact berhasil diubah!");
          res.redirect("/contact");
        });
    }
  }
);
// detail contact
app.get("/contact/:nama", async(req, res) => {
  const contact = await Contact.findOne({nama:req.params.nama});
  res.render("detail", { layout: "layouts/main-layout", contact });
});
// // mendapatkan string di bagian id
// // http://localhost:3000/product/1/category/20
// app.get("/product/:id/category/:idCat", (req, res) => {
//   res.send(
//     `product ID: ${req.params.id} <br> category ID: ${req.params.idCat}`
//   );
// });
// // mendapatkan string di bagian id menggunakan query
// // http://localhost:3000/product/1?category=shoes
// app.get("/product/:id", (req, res) => {
//   res.send(
//     `product ID: ${req.params.id} <br> category ID: ${req.query.category}`
//   );
// });
// // app.use digunakan untuk menjalankan middleware
// // contoh menangani 404
// app.use("/", (req, res) => {
//   res.status(404);
//   res.send("404");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
