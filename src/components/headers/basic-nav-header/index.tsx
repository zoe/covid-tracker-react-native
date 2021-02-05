import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '@covid/themes';

import { RoundIconButton } from '../../Buttons';

function BasicNavHeader() {
  const { goBack } = useNavigation();
  const theme = useTheme();
  return (
    <View style={{ marginTop: theme.grid.l }}>
      <RoundIconButton
        backgroundColor={theme.colors.ui.dark.bgColor}
        iconColor="black"
        iconName="arrow_back_ios"
        iconStyle={{ transform: [{ translateX: 4 }] }} // center arrow
        onPress={() => goBack()}
      />
    </View>
  );
}

export default BasicNavHeader;
