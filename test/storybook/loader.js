const parse5 = require('parse5');
const postcss = require('postcss');
const loadCss = require('postcss-import/lib/load-content');
const TemplateFactory = require('@gardenhq/tick-control');

const Template = TemplateFactory();
const template = function(str) {
  return new Template(str).render();
}

module.exports = function (source) {
  const cb = this.async();
  const htmlFilePath = this.resourcePath;
  const parsed = parse5.parse(template(source));
  const o = this;
  const style = parsed.childNodes.find(
    function(child) {
      return child.nodeName === 'html';
    }
  ).childNodes.find(
    function(child) {
      return child.nodeName === 'head';
    }
  ).childNodes.filter(
    function(child) {
      return child.nodeName === 'style';
    }
  ).map(
    function(style) {
      const source = style.childNodes[0].value;
      return postcss(
        [
          require('postcss-import')(
            {
              load: function(file) {
                o.addDependency(file);
                return loadCss.apply(null, arguments);
              }
            }
          ),
          require('postcss-extend')()
        ]
      ).process(
        source,
        {
          from: htmlFilePath,
        }
      ).then(
        function(result) {
          style.childNodes[0].value = result.css;
          return style;
        }
      );
    }
  );
  Promise.all(style).then(
    function() {
      cb(null, parse5.serialize(parsed))
    }
  );
};
