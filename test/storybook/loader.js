const parse5 = require('parse5');
const domWalk = require('dom-walk');
const postcss = require('postcss');
const loadCss = require('postcss-import/lib/load-content');
const template = require('backtick-template');

const flatten = function(source, from, add) {
  return postcss(
    [
      require('postcss-import')(
        {
          load: function(file) {
            add(file);
            return loadCss.apply(null, arguments);
          }
        }
      ),
      require('postcss-hexrgba')
    ]
  ).process(
    source,
    {
      from: from,
    }
  );
}
const getElementsByTagName = function(tree, tagName) {
  tagName = tagName.toLowerCase();
  const els = [];
  domWalk(
    tree.childNodes,
    function (node) {
      if (node.tagName && (tagName === '*' || node.tagName.toLowerCase() === tagName)) {
        els.push(node);
      }
    }
  );
  return els;
}

module.exports = function (source) {
  const cb = this.async();
  const htmlFilePath = this.resourcePath;
  const parsed = parse5.parse(template(source));
  const o = this;
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
  flatten(style, htmlFilePath, o.addDependency.bind(this)).then(
    function(result) {
      // console.log(result);
      return result.css;
    }
  ).then(
    function(source) {
      return postcss(
        [
          require('postcss-extend')()
        ]
      ).process(
        source,
        {
          from: htmlFilePath,
        }
      );
    }
  ).then(
    function(result) {
      return result.css.toString()
    }
  ).then(
    function(css) {
      cb(null, '<link href="data:text/css;base64,' +Buffer(css).toString('base64') +  '" rel="stylesheet" type="text/css" />' + parse5.serialize(parsed));
    }
  );
};
