const myFuntions = require("./contacts.js");
// const argv = require("yargs").argv;

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, ...data }) => {
  switch (action) {
    case "list":
      const allContacts = await myFuntions.listContacts();
      return console.log(allContacts);
    case "get":
      const oneContact = await myFuntions.getContactById(id);
      return console.log(oneContact);
    case "add":
      const newContact = await myFuntions.addContact(data);
      console.log(newContact);
    case "remove":
      const newList = await myFuntions.removeContact(id);
      console.log(newList);
    default:
      console.log("Unknown action type!");
  }
};

// const actionIndex = process.argv.indexOf("--action");
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   invokeAction({ action });
// }

invokeAction(argv);
