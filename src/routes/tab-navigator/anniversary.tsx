import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AnniversaryNavigator from '../anniversary';

function anniversary() {
  const Stack = createStackNavigator();
  return <Stack.Navigator>{AnniversaryNavigator({ Stack })}</Stack.Navigator>;
}

export default anniversary;
