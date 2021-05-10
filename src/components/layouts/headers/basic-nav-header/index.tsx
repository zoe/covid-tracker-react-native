import { useTheme } from '@covid/themes';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { RoundIconButton } from '../../../buttons';

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
        backgroundColor: backgroundColor || 'transparent',
        paddingBottom: grid.m,
        paddingHorizontal: grid.gutter,
        paddingTop: grid.l,
      }}
    >
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
