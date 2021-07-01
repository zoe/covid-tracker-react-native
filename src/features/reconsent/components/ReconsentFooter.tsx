import { BrandedButton } from '@covid/components/buttons';
import { useTheme } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';

interface IProps {
  onPress: () => void;
  title: string;
}

function ReconsentFooter(props: IProps) {
  const theme = useTheme();
  return (
    <BrandedButton
      enable
      onPress={props.onPress}
      style={{
        backgroundColor: colors.purple,
        marginBottom: theme.grid.m,
        marginHorizontal: theme.grid.gutter,
        marginTop: theme.grid.m,
      }}
    >
      {props.title}
    </BrandedButton>
  );
}

export default ReconsentFooter;
