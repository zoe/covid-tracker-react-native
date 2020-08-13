import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';

import { CenterView } from '@covid/storybook/decorator';

import './rn-addons';

configure(() => {
  require('./stories/Badge.stories');
  require('./stories/Buttons.stories');
  require('./stories/PoweredByZoe.stories');
  require('./stories/Spinner.stories');
  require('./stories/VisitWebsite.stories');
  require('./stories/DropdownField.stories');
  require('./stories/DiabetesQuestions.stories');
  require('./stories/YesNoField.stories');
  require('./stories/ShareApp.stories');
  require('./stories/Buttons.stories');
  require('./stories/Selectable.stories');
  require('./stories/DietStudy.stories');
  require('./stories/NumberIndicator.stories');
  require('./stories/FoodFreqCard.stories');
  require('./stories/VaccineRegistryCallout.stories');
  require('./stories/TextInput.stories');
  require('./stories/EstimatedCasesMapCard.stories');
  require('./stories/PersonalisedDataCard.stories');
}, module);

// Global Decorator
addDecorator(CenterView);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
});

export default StorybookUIRoot;
