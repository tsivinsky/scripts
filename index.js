#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const [, , ...args] = process.argv;

let command = args[0];
if (!command) {
  console.log("You need to enter a command.\n");

  showAvailableCommands();

  process.exit(0);
}

command = command.toLowerCase().replace(" ", "-");

const scriptFilePath = path.join(__dirname, "scripts", `${command}.js`);

// Check if file with command as name exists
if (!fs.existsSync(scriptFilePath)) {
  console.log(`Command '${command}' does not exist.\n`);

  showAvailableCommands();

  process.exit(0);
}

const [, ...argsWithoutCommand] = args;

cp.exec(
  `node ${scriptFilePath} ${argsWithoutCommand.join(" ")}`,
  (error, stdout) => {
    process.stdout.write(stdout);
  }
);

function showAvailableCommands() {
  const scripts = fs.readdirSync(path.join(__dirname, "scripts"), "utf-8");

  console.log("Available commands:");

  // Remove file extension for scripts and log them
  scripts.forEach((script) => {
    script = script.replace(".js", "");

    console.log(` - ${script}`);
  });
}
