/* eslint-disable react/no-children-prop */
import { MediaContentList } from '@covid/features/media-centre/components/MediaContentList';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '@theme';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';

interface IProps {
  tabViewHeight: number;
  minTabViewHeight: number;
  showTab: string;
}

const Tab = createMaterialTopTabNavigator();

const GUTTER = 50;
const MIN_TAB_WIDTH = 85;

export default function MediaCentreTabbedListsScreen(props: IProps) {
  const windowDimensions = useWindowDimensions();

  const barwidth = windowDimensions.width - GUTTER;
  const tabWidth = Math.max(MIN_TAB_WIDTH, barwidth / 2);

  return (
    <Tab.Navigator
      backBehavior="none"
      initialRouteName={props.showTab}
      sceneContainerStyle={{
        backgroundColor: colors.backgroundPrimary,
        height: props.tabViewHeight,
      }}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.quaternary,
        indicatorStyle: { backgroundColor: colors.accent },
        labelStyle: {
          fontFamily: 'SofiaPro-Medium',
          fontSize: 14,
          lineHeight: 20,
          textTransform: 'none',
        },
        scrollEnabled: true,
        style: { marginBottom: sizes.s },
        tabStyle: { paddingHorizontal: sizes.xs, paddingVertical: sizes.s, width: tabWidth },
      }}
    >
      <Tab.Screen
        children={() => <MediaContentList enableSearch />}
        name="MediaCenterTabAll"
        options={{
          tabBarAccessibilityLabel: i18n.t('media-centre.tab-all'),
          tabBarLabel: i18n.t('media-centre.tab-all'),
        }}
      />
      <Tab.Screen
        children={() => <MediaContentList />}
        name="MediaCenterTabBookmarked"
        options={{
          tabBarAccessibilityLabel: i18n.t('media-centre.tab-bookmarked'),
          tabBarLabel: i18n.t('media-centre.tab-bookmarked'),
        }}
      />
    </Tab.Navigator>
  );
}
