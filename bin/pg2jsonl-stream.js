#!/usr/bin/env node
const readline = require('readline');
const parser = require('../lib/pg2jsonl_parser.js');

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
    outputJsonLines(line);
  });
  process.stdin.on('end', () => {
  });
}

// Functions
function outputJsonLines(line) {
  if (line.charAt(0) != '#' && line != '') {
    let objectTree;
    try {
      objectTree = parser.parse(line);
    } catch (err) {
      printError(line, err);
      process.exit(1);
    }
    const nodeProps = Object.keys(objectTree.nodeProperties);
    const edgeProps = Object.keys(objectTree.edgeProperties);
    objectTree.nodes.forEach(n => {
      let line = [];
      line.push(`"id": ${n.id},`);
      line.push('"labels": [ '+n.labels.join(',')+' ],');
      let props = [];
      nodeProps.forEach(p => {
        vals = n.properties[p];
        props.push(`${p}: [ ` + vals.join(', ') + ' ]');
      });
      line.push('"properties": { ' + props.join(', ') + ' }');
      console.log('{ "type": "node",', line.join(' '), '}');
    });
    objectTree.edges.forEach(e => {
      let line = [];
      line.push(`"from": ${e.from},`);
      line.push(`"to": ${e.to},`);
      if (e.direction === '->') {
        // line.push(`"direction": "${e.direction}",`)
      } else {
        line.push(`"undirected": true,`)
      }
      line.push('"labels": [ ' + e.labels.join(', ') + ' ],')
      let props = [];
      edgeProps.forEach(p => {
        vals = e.properties[p];
        props.push(`${p}: [ ` + vals.join(', ') + ' ]');
      });
      if (props.length) {
        line.push('"properties": { ' + props.join(', ') + ' }');
      } else {
        line.push('"properties": {}');
      }
      console.log('{ "type": "edge",', line.join(' '), '}');
    });
  }
}

function printError(line, err) {
  const startCol = err.location.start.column;
  const endCol = err.location.end.column;
  console.error(`ERROR col:${startCol}-${endCol}`);
  console.error(err.message);
  console.error('--');
  console.error(makeRed(line.substring(0, startCol - 1)) + line.substring(startCol - 1));
}

function makeRed(text) {
  // const red = '\u001b[31m'; // foreground
  const red = '\u001b[41m'; // backgrond
  const reset = '\u001b[0m';
  return red + text + reset;
}
