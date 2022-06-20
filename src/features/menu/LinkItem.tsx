import { Text } from '@covid/components';
import { sizes } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import Analytics, { events } from '@health-study/analytics';
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface IProps {
  analyticsName: string;
  label: string;
  link?: string;
  onPress?: () => void;
}

export function LinkItem(props: IProps) {
  function onPress() {
    Analytics.track(events.CLICK_DRAWER_MENU_ITEM, { name: props.analyticsName });
    if (props.onPress) {
      props.onPress();
    }
    if (props.link) {
      openWebLink(props.link);
    }
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.marginVertical}>
      <Text inverted colorPalette="uiDark" colorShade="darker" textClass="p">
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  marginVertical: {
    marginVertical: sizes.m,
  },
});
