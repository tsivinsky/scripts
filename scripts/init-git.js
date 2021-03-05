#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const [, , ...args] = process.argv;

const root = args[0] ? path.resolve(args[0]) : process.cwd();
if (!fs.existsSync(root)) {
  fs.mkdirSync(root);
}

const projectName = path.resolve(root).split("/").pop();

// Cd into specified directory
if (args[0] && fs.existsSync(args[0])) {
  process.chdir(args[0]);
}

// Initialize git in the specified directory
cp.execSync(`git init`);

// Create README.md and .gitignore files
fs.appendFileSync(
  path.join(root, "README.md"),
  `# ${capitalizeString(projectName)}`
);
fs.appendFileSync(path.join(root, ".gitignore"), "");

function capitalizeString(string = "") {
  const letters = string.split("");
  const [firstLetter, ...otherLetters] = letters;

  return [firstLetter.toUpperCase(), ...otherLetters].join("");
}
