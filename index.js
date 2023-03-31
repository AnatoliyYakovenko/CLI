const { program } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

// getContactById("QiGN7JvI0WlsTapSnBfbo");

// addContact("John Doe", "john@example.com", "123456789");
// listContacts();
// removeContact("ETXXev463JPMKWyXVIQ0C");
// listContacts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "listContacts":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;
    case "getContactById":
      const filteredContact = await getContactById(id);
      console.table(filteredContact);
      break;
    case "removeContact":
      const deletedContact = await removeContact(id);
      console.table(deletedContact);
      break;
    case "addContact":
      const addedContact = await addContact(name, email, phone);
      console.table(addedContact);
      break;
    default:
      console.log("Unknown action");
  }
};

program
  .action("-a, --action <type>")
  .action("-i, --id <type>")
  .action("-n, --name <type>")
  .action("-e, --email <type>")
  .action("-p, --phone <type>");

program.parse();

const options = program.opts();
console.table(options);
invokeAction(options);
