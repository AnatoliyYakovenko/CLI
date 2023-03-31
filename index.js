const { program } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;
    case "get":
      const filteredContact = await getContactById(id);
      console.table(filteredContact);
      break;
    case "add":
      const addedContactList = await addContact(name, email, phone);
      console.table(addedContactList);
      break;
    case "remove":
      const deletedContact = await removeContact(id);
      console.table(deletedContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();

const options = program.opts();
console.log(options);
invokeAction(options);
