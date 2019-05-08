#!/usr/bin/env node

const lib = require("./lib");

const argv = process.argv.splice(2);

if (argv.length === 0) {
  console.log(`
    # USAGE:
    npx pdehaan/ftl-spellcheck './src/locales/en/*.ftl' > .spelling
  `);
  process.exit(1);
}

main(...argv);

function main(ftlGlob) {
  const output = lib.createSpellingFile(ftlGlob);
  console.log(output);
}
