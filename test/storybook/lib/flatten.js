const postCSS = require('postcss');
const postCSSImport = require('postcss-import');
const loadCss = require('postcss-import/lib/load-content');
const hex2RGB = require('postcss-hexrgba');

module.exports = function(source, from, add) {
  return postCSS(
    [
      postCSSImport(
        {
          load: function(file) {
            add(file);
            return loadCss.apply(null, arguments);
          }
        }
      ),
      hex2RGB
    ]
  ).process(
    source,
    {
      from: from,
    }
  );
}

