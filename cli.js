#!/usr/bin/env node

const fs = require("fs");

const execa = require("execa");

const lib = require("./lib");

const argv = process.argv.splice(2);

if (argv.length === 0) {
  console.log(`
    # USAGE:
    npx pdehaan/ftl-spellcheck './src/locales/en/*.ftl'
  `);
  process.exit(1);
}

main(...argv);

async function main(ftlGlob) {
  const output = lib.createSpellingFile(ftlGlob);
  fs.writeFileSync(".spelling", output);
  const args = [
    "markdown-spellcheck",
    "--en-us",
    "--ignore-acronyms",
    "--ignore-numbers",
    "--no-suggestions",
    "--report",
    `"${ftlGlob}"`
  ];
  const cmd = `npx ${args.join(" ")}`;
  const res = await execa.shell(cmd);
  console.log(cmd);
  console.log(res);
  if (res.stderr) {
    console.error(stderr);
    process.exit(1);
  }
  console.log(res.stdout);
}
