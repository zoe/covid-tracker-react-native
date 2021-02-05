import React from 'react';
import { View } from 'react-native';

import { useTheme } from '@covid/themes';

import { BrandedButton } from '../../../BrandedButton';

interface IProps {
  active?: boolean;
  onPress: () => void;
  title: string;
}

function BasicPageFooter({ active = true, onPress, title }: IProps) {
  const theme = useTheme();
  return (
    <View style={{ marginBottom: theme.grid.m, marginTop: theme.grid.m }}>
      <BrandedButton enable={active} onPress={onPress}>
        {title}
      </BrandedButton>
    </View>
  );
}

export default BasicPageFooter;
