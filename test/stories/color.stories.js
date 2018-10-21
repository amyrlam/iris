import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import swatches from '../fixtures/index.html';
import frames from '../fixtures/frames.html';
storiesOf('Color', module)
  .add('Swatches', () => swatches)
  .add('Frames', () => frames);
