import { configure, addDecorator, addParameters } from '@storybook/html';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  options: {
    storySort: function(a, b) {
      return a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(
        b[1].id,
        { numeric: true }
      )
    }
  },
});
configure(require.context('../stories', true, /\.stories\.mdx$/), module);
