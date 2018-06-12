const assert = require('assert');
const path = require('path');
const promisify = require('util').promisify;
const read = promisify(require('fs').readFile);
const _exec = promisify(require('child_process').exec);
const root = path.dirname(__dirname);
const fixtures = `${root}/test/fixtures`;
const exec = function(cmd) {
  return _exec(cmd).then(
    function(output) {
      return output;
    }
  );
}
const postcss = function(src)
{
  return exec(`${root}/node_modules/.bin/postcss --config ${fixtures}/postcss.config.js ${src}`);
}
const compare = function(src, expected) {
    return Promise.all(
      [
        postcss(src).then(res => res.stdout),
        read(expected)
      ]
    ).then(
      function([src, expected]) {
        assert.equal(src.toString().trim(), expected.toString().trim());
      }
    );
}
describe('Compilation', function() {
  describe('postcss', function() {
    it('should compile to empty if nothing is used', function() {
      this.timeout(5000);
      return compare(
        `${fixtures}/empty/index.css`,
        `${fixtures}/empty/expected.css`
      );
    });
    it('compiles used custom properties', function() {
      this.timeout(5000);
      return compare(
        `${fixtures}/sanity/index.css`,
        `${fixtures}/sanity/expected.css`
      );
    });
  });
});
