#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const [, , ...args] = process.argv;

let command = args[0];
if (!command) {
  console.log("You need to enter a command.");
  process.exit(0);
}

command = command.toLowerCase().replace(" ", "-");

const scriptFilePath = path.join(__dirname, "scripts", `${command}.js`);

// Check if file with command as name exists
if (!fs.existsSync(scriptFilePath)) {
  console.log(`Command '${command}' does not exist.`);
  process.exit(0);
}

const [, ...argsWithoutCommand] = args;

cp.exec(
  `node ${scriptFilePath} ${argsWithoutCommand.join(" ")}`,
  (error, stdout) => {
    process.stdout.write(stdout);
  }
);
