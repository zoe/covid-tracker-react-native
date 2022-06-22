/* eslint-env jest */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

type TProps = {
  Component: React.ComponentType;
  initialParams?: Object;
};

const Stack = createNativeStackNavigator();

export default function MockedNavigator({ Component, initialParams }: TProps) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Component} initialParams={initialParams} name="MockedScreen" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
