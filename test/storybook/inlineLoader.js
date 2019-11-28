const parse5 = require('parse5');
const flatten = require('./lib/flatten');
const getElementsByTagName = require('./lib/getElementsByTagName');
const compile = require('./lib/compile');
const JSXify = require('./lib/JSXify');

const compileStyles = function($styles, htmlFilePath, add = function(){}) {
  let style = $styles.reduce(
    function(prev, item) {
      const style = item.childNodes[0].value;
      return `${prev}
${style}`
    },
    ''
  );
  if(style.trim() !== '') {
    style = `
      @import '../../../index.css';
      body {
        @extend %typo-body;
      }

      ${style}
    `;
    return flatten(style, htmlFilePath, add).then(
      function(result) {
        return result.css;
      }
    ).then(
      function(source) {
        return compile(source, htmlFilePath);
      }
    );
  } else {
    return Promise.resolve('');
  }

}

const compileStories = function($stories) {
  return function(css) {
    $stories.forEach(
      function($story) {
        const html = parse5.serialize($story);
        if(!html.trim().startsWith('{')) {
          $story.childNodes = [
            {
              nodeName: '#text',
              value: '{`' + html + css + '`}',
              parentNode: $story
            }
          ]
        }
      }
    );
  }
}
const serialize = function($html) {
  return function() {
    JSXify($html)
    const html = parse5.serialize($html)
      .split('&lt;').join('<').split('&gt;').join('>')
      .replace('<html><head></head><body>', '')
      .replace('</body></html>', ``);
    return html;
  }
}
module.exports = function(source) {
  const cb = this.async();
  const $html = parse5.parse(source);
  compileStyles(
    getElementsByTagName($html, 'style'), this.resourcePath, this.addDependency.bind(this)
  ).then(
    compileStories(getElementsByTagName($html, 'Story'))
  ).then(
    serialize($html)
  ).then(
    function(source) {
      cb(null, source)
    }
  ).catch(
    function(err) {
      cb(err, '');
    }
  );
}
