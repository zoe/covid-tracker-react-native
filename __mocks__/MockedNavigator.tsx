/* eslint-env jest */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

type TProps = {
  Component: React.ComponentType;
};

const Stack = createStackNavigator();

export default function MockedNavigator(props: TProps) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={props.Component} name="MockedScreen" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
