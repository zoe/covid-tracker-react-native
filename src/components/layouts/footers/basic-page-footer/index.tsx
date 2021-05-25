import { useTheme } from '@covid/themes';
import React from 'react';
import { View } from 'react-native';

import { BrandedButton } from '../../../buttons';

interface IProps {
  active?: boolean;
  loading?: boolean;
  onPress: () => void;
  paddingHorizontal?: number;
  title: string;
}

function BasicPageFooter(props: IProps) {
  const theme = useTheme();
  return (
    <View
      style={{
        marginBottom: theme.grid.m,
        marginTop: theme.grid.m,
        paddingHorizontal: props.paddingHorizontal ?? theme.grid.gutter,
      }}
    >
      <BrandedButton enable={props.active} loading={props.loading} onPress={props.onPress}>
        {props.title}
      </BrandedButton>
    </View>
  );
}

export default BasicPageFooter;
