#!/usr/bin/env node
const readline = require('readline');
const parser = require('../lib/pg2ypg_parser.js');

const commander = require('commander')
      .arguments('<PG_FILE>')
      .version(require("../package.json").version)
      .parse(process.argv);

// Get input and output file names
if(commander.args[0]) {
} else if (process.stdin.isTTY) {
  commander.help();
} else {
  const reader = readline.createInterface(process.stdin);
  reader.on('line', (line) => {
    outputYPG(line);
  });
  process.stdin.on('end', () => {
  });
}

// Functions
function outputYPG(line) {
  if (line.charAt(0) != '#' && line != '') {
    const objectTree = parser.parse(line);
    const nodeProps = Object.keys(objectTree.nodeProperties);
    const edgeProps = Object.keys(objectTree.edgeProperties);
    objectTree.nodes.forEach(n => {
      let line = [];
      line.push(n.id);
      line.push('['+n.labels.join(',')+']:{');
      let props = [];
      nodeProps.forEach(p => {
        n.properties[p].forEach(val => {
          props.push(`${p}:${val}`);
        });
      });
      line.push(props.join(','));
      line.push('}');
      console.log(line.join(''));
    });
    objectTree.edges.forEach(e => {
      let line = [];
      line.push(`(${e.from})`);
      line.push('-['+e.labels.join(',')+']'+e.direction);
      edgeProps.forEach(p => {
        if (e.properties[p]) {
          line.push(e.properties[p].join(';'));
        } else {
          line.push('');
        }
      });
      line.push(`(${e.to})`);
      console.log(line.join(''));
    });
  }
}
