const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// async function getContacts() {
//   try {
//     const data = await fs.readFile(contactsPath);
//     return JSON.parse(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contactList = await listContacts();
    const contact = contactList.find((el) => el.id === contactId);
  } catch (error) {
    console.log("Контакт з цим id не знайдено!");
  }
}

async function removeContact(contactId) {
  try {
    const contactList = await listContacts();
    const removedContactList = contactList.filter((el) => el.id !== contactId);
    if (removedContactList.length < contactList.length) {
      fs.writeFile(contactsPath, JSON.stringify(removedContactList), (err) => {
        if (err) {
          console.error(err);
        }
      });
    } else {
      console.log("Контакт з цим id не знайдено!");
    }
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactList = await listContacts();
    const addedContact = { id: nanoid(), name, email, phone };
    const updatedContactList = JSON.stringify(
      [addedContact, ...contactList],
      null,
      "\t"
    );

    fs.writeFile(contactsPath, updatedContactList, {
      if(err) {
        console.error(err);
      },
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
