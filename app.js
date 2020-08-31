const colors = require("colors");
const argv = require("./config/yargs").argv;
const todo = require("./todo/todo");

let command = argv._[0];

switch (command) {
  case "create":
    todo.create(argv.description);
    break;
  case "update":
    let update = todo.update(argv.description, argv.completed);
    console.log(update);
    break;
  case "list":
    let list = todo.getList();
    for (let task of list) {
      console.log("==== TODO ====".green);
      console.log(task.description);
      console.log("status: ", task.completed);
      console.log("==============".green);
    }
    break;
  case "remove":
    let remove = todo.remove(argv.description);
    console.log("remove", remove);
    break;

  default:
    break;
}
