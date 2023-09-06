const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

async function getListOfContacts() {
    try {
        const contacts = await fs.readFile(contactsPath, 'utf8');
        return JSON.parse(contacts);
    } catch (error) {
        throw error;
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await getListOfContacts();
        const oneContact = contacts.find(item => item.id === contactId);
        return oneContact || null;
    } catch (error) {
        throw error;
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await getListOfContacts();
        const index = contacts.findIndex(item => item.id === contactId);
        if (index === -1) {
            return null;
        }
        const [result] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return result;
    } catch (error) {
        throw error;
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await getListOfContacts();
        const { nanoid } = await import('nanoid'); 
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getListOfContacts,
    getContactById,
    removeContact,
    addContact,
};
