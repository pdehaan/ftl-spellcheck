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
  execa("npx", [
    "markdown-spellcheck",
    "--en-us",
    "--ignore-acronyms",
    "--ignore-numbers",
    "--no-suggestions",
    "--report",
    `"${ftlGlob}"`
  ]).stdout.pipe(process.stdout);
}
