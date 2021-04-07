import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from '@covid/components';
import { DashboardScreen } from '@covid/features';

import Anniversary from './anniversary';
import Screen from './temp-screen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator initialRouteName="home">
    <Tab.Screen
      name="features"
      component={Screen}
      options={{
        title: 'Features',
        tabBarIcon: () => <Icon iconName="combine" />,
      }}
    />
    <Tab.Screen
      name="home"
      component={DashboardScreen}
      options={{
        title: 'Home',
        tabBarIcon: () => <Icon iconName="uni-2" />,
      }}
    />
    <Tab.Screen
      name="Anniversary"
      component={Anniversary}
      options={{
        title: 'Timeline',
        tabBarIcon: () => <Icon iconName="sort-list" />,
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
