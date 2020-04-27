const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const chai = require('chai');
const assert = chai.assert;
chai.use(require('chai-fs'));

describe('pgfmt', () => {
  describe('--debug', () => {
    it('pgfmt.js', () => {
      const result = execSync(`bin/pgfmt.js --debug test/example.pg`).toString();
      const expect = fs.readFileSync('test/answer/example.debug').toString();
      assert.equal(result, expect);
    });
  });

  describe('--neo', () => {
    execSync(`bin/pgfmt.js --neo --outdir out test/example.pg`).toString();
    it('nodes', () => {
      const result = fs.readFileSync('out/example.neo.nodes').toString();
      const expect = fs.readFileSync('test/answer/example.neo.nodes').toString();
      assert.equal(result, expect);
    });
    it('edges', () => {
      const result = fs.readFileSync('out/example.neo.edges').toString();
      const expect = fs.readFileSync('test/answer/example.neo.edges').toString();
      assert.equal(result, expect);
    });
  });
  
});
