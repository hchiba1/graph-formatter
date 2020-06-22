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
    outputPG(line);
  });
  process.stdin.on('end', () => {
  });
}

// Functions
function outputPG(line) {
  obj = JSON.parse(line);
  array = []
  if (obj.type == "node") {
    array.push(obj.id);
    obj.labels.forEach(lab => {
      array.push(`:"${lab}"`);
    });
    const props = Object.keys(obj.properties);
    props.forEach(p => {
      obj.properties[p].forEach(val => {
        array.push(`"${p}":"${val}"`);
      });
    });
  } else if (obj.type == "edge") {
    if (obj.undirected) {
      array.push(`${obj.from} -- ${obj.to}`);
    } else {
      array.push(`${obj.from} -> ${obj.to}`);
    }
    obj.labels.forEach(lab => {
      array.push(`:"${lab}"`);
    });
    const props = Object.keys(obj.properties);
    props.forEach(p => {
      obj.properties[p].forEach(val => {
        array.push(`"${p}":"${val}"`);
      });
    });
  } else {
    array.push(`Invalid line: ${line}`);
  }
  console.log(array.join('\t'))
}
