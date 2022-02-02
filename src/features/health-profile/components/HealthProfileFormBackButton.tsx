import NavigatorService from '@covid/NavigatorService';
import { Icon } from 'native-base';
import * as React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { THPScreenName } from '../data/healthProfileQuestions';

type TProps = {
  iconColor?: string;
  previousScreen: THPScreenName | 'HPAboutYou' | 'DashboardUK';
  style?: StyleProp<ViewStyle>;
};

const HIT_SLOP = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

export function HealthProfileFormBackButton(props: TProps) {
  const onBackPress = () => {
    if (props.previousScreen === 'HPAboutYou' || props.previousScreen === 'DashboardUK') {
      NavigatorService.navigate(props.previousScreen);
    } else {
      NavigatorService.push('HPFormScreen', { screenName: props.previousScreen });
    }
  };

  return (
    <TouchableOpacity hitSlop={HIT_SLOP} onPress={onBackPress} style={props.style} testID="button-back-navigation">
      <Icon
        name="chevron-thin-left"
        style={[styles.icon, props.iconColor && { color: props.iconColor }]}
        type="Entypo"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 16,
  },
});
