const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

// Step - 2
const contactsPath = path.join("db", "contacts.json");

const readContacts = async () => {
  const text = await fs.readFile(contactsPath, "utf-8");
  console.log(text);
};

const writeContacts = async () => {
  const text = await fs.write(contactsPath, "utf-8");
  console.log(text);
};

// Step - 3

// TODO: задокументировать каждую функцию
async function listContacts() {
  const text = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(text);
}

async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  //   console.log("our", contacts[index]);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const myFuntions = {
  readContacts,
  writeContacts,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = myFuntions;
