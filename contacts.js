const path = require("path");
const fs = require("fs");

const contactsPath = path.join(__dirname, "./db/contacts.json");
console.log(contactsPath);

async function listContacts() {
  try {
    const contactList = await fs.readFile(contactsPath);
    return JSON.parse(contactList);
  } catch (error) {
    console.log(error.message);
  }
}

async function updateContacts(contacts) {
  try {
    const updateContacts = await fs.writeFile(
      contactsPath,
      JSON,
      stringify(contacts)
    );
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const id = String(contactId);
  const findContact = contacts.find((contact) => contact.id !== id);
  return findContact || null;
}

async function removeContact(contactId) {
  // ...твій код
}

async function addContact(name, email, phone) {
  // ...твій код
}
