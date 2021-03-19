import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '@covid/themes';

import { RoundIconButton } from '../../../buttons';

function BasicNavHeader() {
  const { goBack } = useNavigation();
  const { colors, grid } = useTheme();
  return (
    <View style={{ marginTop: grid.l, marginBottom: grid.xxl, paddingHorizontal: grid.gutter }}>
      <RoundIconButton
        backgroundColor={colors.ui.dark.bgColor}
        iconColor="black"
        iconName="arrow_back_ios"
        iconStyle={{ transform: [{ translateX: 4 }] }} // center arrow
        onPress={() => goBack()}
      />
    </View>
  );
}

export default BasicNavHeader;
