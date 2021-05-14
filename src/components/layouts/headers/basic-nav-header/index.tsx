import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '@covid/themes';

import { RoundIconButton } from '../../../buttons';

interface IProps {
  backgroundColor?: string;
  children?: React.ReactNode;
  paddingHorizontal?: number;
}

export default function BasicNavHeader(props: IProps) {
  const { goBack } = useNavigation();
  const { colors, grid } = useTheme();
  return (
    <View
      style={{
        backgroundColor: props.backgroundColor ?? 'transparent',
        paddingTop: grid.l,
        paddingHorizontal: props.paddingHorizontal ?? grid.gutter,
        paddingBottom: grid.m,
      }}>
      <View style={styles.row}>
        <View style={styles.flex}>
          <RoundIconButton
            backgroundColor={colors.ui.dark.bgColor}
            iconColor="black"
            iconName="arrow_back_ios"
            iconStyle={styles.icon}
            onPress={() => goBack()}
          />
        </View>
        {props.children && <View>{props.children}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  icon: {
    transform: [{ translateX: 4 }],
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
