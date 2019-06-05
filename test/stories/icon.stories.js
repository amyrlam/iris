import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import icons from '../fixtures/icons/backgrounds.html';
storiesOf('Icons', module)
  .add('CSS Backgrounds', () => icons)
  .add('Inline HTML', () => icons);
