import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';

import { CenterView } from '@covid/storybook/decorator';

import './rn-addons';

configure(() => {
  require('./stories/AppVersion.stories');
  require('./stories/Badge.stories');
  require('./stories/PoweredByZoe.stories');
  require('./stories/Spinner.stories');
  require('./stories/VisitWebsite.stories');
}, module);

// Global Decorator
addDecorator(CenterView);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

export default StorybookUIRoot;
