#!/usr/bin/env node
const readline = require('readline');

const commander = require('commander')
      .arguments('<PG_FILE>')
      .version(require("../package.json").version)
      .parse(process.argv);

if(commander.args[0]) {
} else if (process.stdin.isTTY) {
  commander.help();
} else {
  const reader = readline.createInterface(process.stdin);
  reader.on('line', (line) => {
    outputJsonLines(line);
  });
  process.stdin.on('end', () => {
  });
}
