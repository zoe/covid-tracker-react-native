import { Text } from '@covid/components';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type TProps = {
  description?: string;
  title: string;
  IconComponent: React.ComponentType;
  style?: StyleProp<ViewStyle>;
};

export function StudyDetailRow(props: TProps) {
  return (
    <View style={props.style}>
      <View style={styles.rowWrapper}>
        <props.IconComponent />
        <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.labelMargins} textClass="labelMedium">
          {props.title.toUpperCase()}
        </Text>
      </View>
      {props.description ? (
        <Text inverted colorPalette="uiDark" colorShade="darker" style={styles.marginTop} textClass="h5Medium">
          {props.description}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  labelMargins: {
    marginLeft: sizes.xs,
    marginTop: sizes.xxs,
  },
  marginTop: {
    marginTop: sizes.xs,
  },
  rowWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
