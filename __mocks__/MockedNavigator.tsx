/* eslint-env jest */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

type TProps = {
  Component: React.ComponentType;
  initialParams?: Object;
};

const Stack = createStackNavigator();

export default function MockedNavigator(props: TProps) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={props.Component} initialParams={props.initialParams} name="MockedScreen" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
