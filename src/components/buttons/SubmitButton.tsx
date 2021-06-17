import BrandedButton, { IProps as IBrandedButtonProps } from '@covid/components/buttons/branded-button';
import { ErrorText } from '@covid/components/Text';
import React from 'react';
import { View } from 'react-native';

interface IProps extends IBrandedButtonProps {
  errorMessage?: string;
}

export function SubmitButton({ errorMessage, style, ...props }: IProps) {
  return (
    <View style={style}>
      {errorMessage ? <ErrorText style={{ marginBottom: 8 }}>{errorMessage}</ErrorText> : null}
      <BrandedButton {...props} onPress={props.loading ? undefined : props.onPress} />
    </View>
  );
}
