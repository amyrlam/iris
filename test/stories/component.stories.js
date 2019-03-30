import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import buttons from '../fixtures/components/buttons.html';
import notice from '../fixtures/components/notice.html';
import pill from '../fixtures/components/pill.html';
import tooltip from '../fixtures/components/tooltip.html';
storiesOf('Components', module)
  .add('Buttons', () => buttons)
  .add('Notice', () => notice)
  .add('Pill', () => pill)
  .add('Tooltip', () => tooltip);
