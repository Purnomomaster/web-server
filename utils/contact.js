const fs = require("fs");

// membuat folder data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
// membuat file json
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// ambil semua data
const loadContact = ()=>{
    //   readfile json
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    //   from string into json
    const contacts = JSON.parse(file);
    return contacts
}
// cari contact berdasarkan nama
const findContact = (nama) =>{
  const contacts = loadContact()
  const contact = contacts.find((contact)=> contact.nama.toLowerCase() === nama.toLowerCase())
  return contact
}

module.exports = {loadContact, findContact}