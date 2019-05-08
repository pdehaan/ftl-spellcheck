# ftl-spellcheck

Spell checker for .ftl files.

## Usage

```sh
node lint-ftl.js > .spelling
npx markdown-spellcheck -n -a -x --en-us ./src/locales/en-US/*.ftl -r
```

**NOTE:** If you need to add custom entries to your .spelling file, you need to create a .spelling-dist file which will be prepended to the .spelling file.
