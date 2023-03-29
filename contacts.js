const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");
// console.log(contactsPath);

// async function readData() {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// }

async function listContacts() {
  try {
    // readData();
    const data = await fs.readFile(contactsPath);
    const contactList = JSON.parse(data);
    // console.log(contactList);
    return contactList;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath);
  const contactList = JSON.parse(data);
  const filtered = contactList.filter((el) => el.id !== contactId);
  console.log(filtered);
}

// function removeContact(contactId) {}

// function addContact(name, email, phone) {}

module.exports = {
  listContacts,
  getContactById,
  //   removeContact,
  //   addContact,
};
