import { TUsualSelfSetupScreenName } from '@covid/features/usual-self/data/types';
import NavigatorService from '@covid/NavigatorService';
import { Icon } from 'native-base';
import * as React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

type TProps = {
  iconColor?: string;
  previousScreen: TUsualSelfSetupScreenName | 'UsualSelfReportsSymptoms';
  style?: StyleProp<ViewStyle>;
};

const HIT_SLOP = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

// Similar button to HealthProfileFormBackButton -> maybe worth refactoring to component if we do this again
export function UsualSelfFormBackButton(props: TProps) {
  const onBackPress = () => {
    if (props.previousScreen === 'UsualSelfReportsSymptoms') {
      NavigatorService.navigate(props.previousScreen, { navDirection: 'backwards' });
    } else {
      NavigatorService.navigate('UsualSelfSetupForm', { navDirection: 'backwards', screenName: props.previousScreen });
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
