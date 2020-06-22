#!/usr/bin/env node
const readline = require('readline');
const parser = require('../lib/pg2jsonl_parser.js');

const commander = require('commander')
      .arguments('<PG_FILE>')
      .version(require("../package.json").version)
      .parse(process.argv);

// Get input and output file names
const sep = '\t';
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

// Functions
function outputJsonLines(line) {
  if (line.charAt(0) != '#' && line != '') {
    const objectTree = parser.parse(line);
    const nodeProps = Object.keys(objectTree.nodeProperties);
    const edgeProps = Object.keys(objectTree.edgeProperties);
    objectTree.nodes.forEach(n => {
      let line = [];
      line.push(`"id": ${n.id},`);
      line.push('"labels": [ '+n.labels.join(',')+' ],');
      let props = [];
      nodeProps.forEach(p => {
        n.properties[p].forEach(val => {
          props.push(`${p}: ${val}`);
        });
      });
      line.push('"properties": { ' + props.join(', ') + ' }');
      console.log('{ "type": "node",', line.join(' '), '}');
    });
    objectTree.edges.forEach(e => {
      let line = [];
      line.push(`"from": ${e.from},`);
      line.push(`"to": ${e.to},`);
      line.push(`"direction": "${e.direction}",`)
      line.push('"labels": [ ' + e.labels.join(', ') + ' ]')
      let props = [];
      edgeProps.forEach(p => {
        e.properties[p].forEach(val => {
          props.push(`${p}: ${val}`);
        });
      });
      line.push('"properties": { ' + props.join(', ') + ' }');
      console.log('{ "type": "edge",', line.join(' '), '}');
    });
  }
}
