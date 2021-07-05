import { BrandedButton } from '@covid/components/buttons';
import { useTheme } from '@covid/themes';
import * as React from 'react';
import { View } from 'react-native';

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
      <BrandedButton enabled={props.active} loading={props.loading} onPress={props.onPress} testID="button-footer">
        {props.title}
      </BrandedButton>
    </View>
  );
}

export default BasicPageFooter;
