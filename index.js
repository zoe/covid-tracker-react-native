import { AppRegistry, Platform } from 'react-native';

import App from './App';

AppRegistry.registerComponent('Covid', () => App);

if (Platform.OS === 'web') {
  /* eslint-disable no-undef */
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('Covid', { rootTag });
}
