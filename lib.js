const fs = require("fs");

const {parse} = require("fluent-syntax");
const glob = require("glob").sync;

module.exports = {
  createSpellingFile
};

function createSpellingFile(ftlGlob) {
  const ftlDist = readFile(".spelling-dist");
  const files = glob(ftlGlob);
  const keys = files.reduce((acc, file) => acc.concat(` - ${file}`, fetchFtlKeys(file), "\n"), [ftlDist]);
  return keys.join("\n").trim();
}

function readFile(file) {
  try {
    return fs.readFileSync(file).toString();
  } catch (err) {
    // ignore missing file
    // console.error(err.message);
  }
  return "";
}

function fetchFtlKeys(file) {
  const ftl = readFile(file);
  const keys = new Set();

  parse(ftl)
    .body
    .forEach(item => {
      switch (item.type) {
        case "Message":
        case "Term":
          keys.add(item.id.name);
          if (item.attributes) {
            item.attributes.forEach(attr => keys.add(attr.id.name));
          }
          break;
        case "Comment":
        case "GroupComment":
          // ignore
          break;
        default:
          console.error(`UNKNOWN TYPE: ${item.type}`);
          process.exitCode = 1;
          break;
      }
    });
  return [...keys].sort();
}
