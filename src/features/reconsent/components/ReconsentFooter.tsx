import { BrandedButton } from '@covid/components/buttons';
import { useTheme } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { View } from 'react-native';

interface IProps {
  onPress: () => void;
  title: string;
}

function ReconsentFooter(props: IProps) {
  const theme = useTheme();
  return (
    <View
      style={{
        marginBottom: theme.grid.m,
        marginTop: theme.grid.m,
        paddingHorizontal: theme.grid.gutter,
      }}
    >
      <BrandedButton
        enable
        onPress={props.onPress}
        style={{
          backgroundColor: colors.purple,
        }}
      >
        {props.title}
      </BrandedButton>
    </View>
  );
}

export default ReconsentFooter;
