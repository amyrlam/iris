const parse5 = require('parse5');
const template = require('backtick-template');
const flatten = require('./lib/flatten');
const getElementsByTagName = require('./lib/getElementsByTagName');
const compile = require('./lib/compile');

const postCSS = require('postcss');
const read = require('util.promisify')(require('fs').readFile);

module.exports = function (source) {
  const cb = this.async();
  const htmlFilePath = this.resourcePath;
  let parsed = '';
  // TODO: This should be done as part of the overall pass somehow
  // at least cache it

  Promise.all(
    [
      read(`${process.cwd()}/color/base-variables.css`)
    ]
  ).then(
    function([source]) {
      const colors = {};
      return postCSS([
        postCSS.plugin(
          'something',
          (options) => (css) => {
            css.walkRules(
              function(rule) {
                rule.walkDecls(
                  function(decl, i) {
                    colors[decl.prop] = decl.value;
                  }
                )
              }
            )
          }
        )
      ]).process(source.toString()).then(
        function(res) {
          return colors;
        }
      );
    }
  ).then(
    function(colors) {
      parsed = parse5.parse(template(source, {colors: colors}));
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
      return style;
    }
  ).then(
    (style) => {
      return flatten(style, htmlFilePath, this.addDependency.bind(this))
    }
  ).then(
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
