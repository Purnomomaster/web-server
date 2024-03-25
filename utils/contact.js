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
// menuliskan file contact dengan data baru
const saveContacts = contacts => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts))
}
// menambahkan data baru
const addContact = contact => {
  const contacts = loadContact()
  contacts.push(contact)
  saveContacts(contacts)
}

// cek nama yang duplikat
const cekDuplikat = nama =>{
  const contacts =loadContact()
  return contacts.find((contact)=> contact.nama === nama)
}
// delete kontak
const deleteContact = nama => {
  const contacts = loadContact()
  const filteredContacts =  contacts.filter(contact=>contact.nama !== nama)
  saveContacts(filteredContacts)
}
// mengubah kontak
const updateContacts = contactBaru => {
  const contacts = loadContact()
  // menghilangkan kontak dengan nama yang sama
  const filteredContacts = contacts.filter(contact=>contact.nama !== contactBaru.oldName)
  delete contactBaru.oldName
  filteredContacts.push(contactBaru)
  saveContacts(filteredContacts)
}

module.exports = {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts}