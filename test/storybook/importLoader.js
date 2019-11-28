const parse5 = require('parse5');
const template = require('backtick-template');
const flatten = require('./lib/flatten');
const getElementsByTagName = require('./lib/getElementsByTagName');
const compile = require('./lib/compile');

module.exports = function (source) {
  const cb = this.async();
  const htmlFilePath = this.resourcePath;
  const parsed = parse5.parse(template(source));
  let $styles = getElementsByTagName(parsed, 'style');
  const style = $styles.reduce(
    function(prev, item) {
      const style = item.childNodes[0].value;
      item.childNodes[0].value = '';
      return `${prev}
${style}`
    },
    ''
  );
  flatten(style, htmlFilePath, this.addDependency.bind(this)).then(
    function(result) {
      return result.css;
    }
  ).then(
    function(source) {
      return compile(source, htmlFilePath);
    }
  ).then(
    function(css) {
      cb(null, `${css}${parse5.serialize(parsed)}`);
    }
  );
};
