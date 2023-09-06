const { program } = require("commander");
const contacts = require("./contacts");

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const listContacts = await contacts.getListOfContacts();
            return console.table(listContacts);
            break;

        case "get":
            const getContactById = await contacts.getContactById(id);
            return console.table(getContactById);
            break;

        case "add":
            const addContact = await contacts.addContact(name, email, phone);
            return console.table(addContact);
            break;

        case "remove":
            const removeContact = await contacts.removeContact(id);
            return console.table(removeContact);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);