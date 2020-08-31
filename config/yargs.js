const description = {
  demand: true,
  alias: "d",
  description: "Task description",
};

const argv = require("yargs")
  .command("create", "Create an element", {
    description,
  })
  .command("update", "Update task to complete", {
    description,
    completed: {
      default: true,
      alias: "c",
    },
  })
  .command("remove", "Remove task", {
    description,
  })
  .help().argv;

module.exports = { argv };
