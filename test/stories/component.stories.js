import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import centered from '@storybook/addon-centered/html';
import buttons from '../fixtures/components/buttons.html';
import notice from '../fixtures/components/notice.html';
import pill from '../fixtures/components/pill.html';
import tooltip from '../fixtures/components/tooltip.html';
import actionGroup from '../fixtures/components/action-group.html';
import toggleButton from '../fixtures/components/toggle-button.html';
// potentially shouldn't be in components?
import table from '../fixtures/components/table.html';

storiesOf('Components', module)
  .addDecorator(centered)
  .add('ActionGroup', () => actionGroup)
  .add('Buttons', () => buttons)
  .add('ToggleButton', () => toggleButton)
  .add('Table', () => table)
  .add('Notice', () => notice)
  .add('Pill', () => pill)
  .add('Tooltip', () => tooltip);
