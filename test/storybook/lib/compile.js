const sass = require('node-sass');
module.exports = function(source, htmlFilePath = '') {
  return Promise.resolve(source).then(
    function(result) {
      const sass = require('node-sass');
      return sass.renderSync(
        {
          data: result.toString()
        }
      );
    }
  ).then(
    function(css) {
      return `<link href="data:text/css;base64,${css.css.toString('base64')}" rel="stylesheet" type="text/css" />`;
    }
  ).catch(
    function(e) {
      console.error(e);
    }
  );
}

