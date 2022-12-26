const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");
console.log(__dirname);
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
    const newContacts = await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts)
    );
    return newContacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const findContact = contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    return findContact || null;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const deleteContact = contacts.filter(
      (contact) => contact.id !== contactId.toString()
    );

    if (deleteContact === []) {
      return null;
    }
    await updateContacts(deleteContact);

    return deleteContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
