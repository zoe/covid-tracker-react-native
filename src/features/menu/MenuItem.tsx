import { Text } from '@covid/components';
import { WithNotificationDot } from '@covid/components/WithNotificationDot';
import Analytics, { events } from '@covid/core/Analytics';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type TIconProps = {
  maxDimension?: number;
};

interface IProps {
  IconComponent: React.ComponentType<TIconProps>;
  analyticsName: string;
  label: string;
  onPress: () => void;
  showDot?: boolean;
  sidenote?: string;
  sidenoteColor?: 'gray' | 'blue';
  testID?: string;
}

export function MenuItem(props: IProps) {
  const onPress = React.useCallback(() => {
    Analytics.track(events.CLICK_DRAWER_MENU_ITEM, { name: props.analyticsName });
    props.onPress();
  }, [props.analyticsName, props.onPress]);
  return (
    <TouchableOpacity onPress={onPress} style={styles.touchable} testID={props.testID}>
      <WithNotificationDot showDot={!!props.showDot}>
        <props.IconComponent maxDimension={30} />
      </WithNotificationDot>
      <Text style={styles.label} textClass="h4Medium">
        {props.label}
      </Text>
      {props.sidenote ? (
        <Text
          inverted
          colorPalette={props.sidenoteColor === 'blue' ? 'accentBlue' : 'gray'}
          colorShade="main"
          textClass="pSmallMedium"
        >
          {props.sidenote}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    flex: 1,
    marginLeft: sizes.l,
  },
  touchable: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: sizes.m,
  },
});
