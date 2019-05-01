import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import misc from '../fixtures/typography.html';
storiesOf('Typography', module)
  .add('Misc', () => misc);
