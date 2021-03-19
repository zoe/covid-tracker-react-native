import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '@covid/themes';

import { RoundIconButton } from '../../../Buttons';

interface IProps {
  backgroundColor?: string;
  children?: ReactNode;
}

function BasicNavHeader({ backgroundColor, children }: IProps) {
  const { goBack } = useNavigation();
  const { colors, grid } = useTheme();
  return (
    <View
      style={{
        backgroundColor: backgroundColor ? backgroundColor : 'transparent',
        paddingTop: grid.l,
        paddingHorizontal: grid.gutter,
        paddingBottom: grid.m,
      }}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <RoundIconButton
            backgroundColor={colors.ui.dark.bgColor}
            iconColor="black"
            iconName="arrow_back_ios"
            iconStyle={{ transform: [{ translateX: 4 }] }} // center arrow
            onPress={() => goBack()}
          />
        </View>
        {children && <View>{children}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default BasicNavHeader;
