#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const root = process.cwd();

// Check if yarn is installed
const yarnVersion = cp.execSync("yarn -v").toString("utf-8").replace("\n", "");
const isYarnInstalled = /[0-9]+.[0-9]+.[0-9]+/.test(yarnVersion);

// Install typescript and @tsivinsky17/tsconfig as devDependencies
const packageManager = Boolean(
  isYarnInstalled && fs.existsSync(path.join(root, "yarn.lock"))
    ? "yarn"
    : "npm"
);
const commandForInstall = packageManager === "yarn" ? "yarn add" : "npm i";
cp.execSync(`${commandForInstall} -D typescript @tsivinsky17/tsconfig`);

// Create new tsconfig.json file
const tsconfig = {
  extends: "@tsivinsky17/tsconfig",
  compilerOptions: {
    rootDir: "src",
    outDir: "dist",
  },
  exclude: ["node_modules", "dist"],
  include: ["src"],
};
fs.appendFileSync(
  path.join(root, "tsconfig.json"),
  JSON.stringify(tsconfig, null, 2),
  { encoding: "utf-8" }
);

console.log("TSconfig file created.");
