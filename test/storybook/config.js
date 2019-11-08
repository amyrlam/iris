import { configure, addDecorator, addParameters } from '@storybook/html';
import { withInfo } from '@storybook/addon-info';

const postcss = require('postcss');
const postcssExtend = require('postcss-extend');
const compile = function(source, htmlFilePath = '') {
  return postcss(
    [
      postcssExtend()
    ]
  ).process(
    source,
  ).then(
    function(result) {
      return result.css.toString()
    }
  ).then(
    function(css) {
      return `<link href="data:text/css;base64, ${Buffer(css).toString('base64')}" rel="stylesheet" type="text/css" />`;
    }
  );
}
addParameters({
  options: {
    storySort: function(a, b) {
      return a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(
        b[1].id,
        { numeric: true }
      )
    }
  },
});
addDecorator(
  function(story) {
    const src = story();
    // const $div = document.createElement('div');
    // $div.innerHTML = src;
    // console.log($div.querySelector('style'));
    return `${src}`;
  }
);
// automatically import all files ending in *.stories.js
// configure(require.context('../stories', true, /\.stories\.js$/), module);
configure(require.context('../stories', true, /\.stories\.(js|mdx)$/), module);
// addDecorator(withInfo);
