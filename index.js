import { registerRootComponent } from 'expo';
import Config from 'react-native-config';

import App from './App.tsx';
import StorybookUI from './storybook';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
if (Config.STORYBOOK === 'true') {
  registerRootComponent(StorybookUI);
} else {
  registerRootComponent(App);
}
