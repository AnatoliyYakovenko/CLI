const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contactList = JSON.parse(data);
    console.table(contactList);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contactList = JSON.parse(data);
    const contact = contactList.find((el) => el.id === contactId);
    console.log(contact);
  } catch (error) {
    console.log("Контакт з цим id не знайдено!");
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contactList = JSON.parse(data);
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
    const data = await fs.readFile(contactsPath);
    const contactList = JSON.parse(data);
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
