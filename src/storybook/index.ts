import './rn-addons';

import { CenterView } from '@covid/storybook/decorator';
import { addDecorator, configure, getStorybookUI } from '@storybook/react-native';

configure(() => {
  require('./stories/Buttons.stories');
  require('./stories/PoweredByZoe.stories');
  require('./stories/Spinner.stories');
  require('./stories/DropdownField.stories');
  require('./stories/DiabetesQuestions.stories');
  require('./stories/YesNoField.stories');
  require('./stories/ShareApp.stories');
  require('./stories/Buttons.stories');
  require('./stories/Selectable.stories');
  require('./stories/NumberIndicator.stories');
  require('./stories/VaccineRegistryCallout.stories');
  require('./stories/TextInput.stories');
  require('./stories/EstimatedCasesMapCard.stories');
  require('./stories/PersonalisedDataCard.stories');
  require('./stories/SchoolNetworks.stories');
}, module);

// Global Decorator
addDecorator(CenterView);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
});

export default StorybookUIRoot;
