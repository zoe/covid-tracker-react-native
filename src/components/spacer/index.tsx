import { TGridSizes } from '@covid/themes';
import React from 'react';
import { View } from 'react-native';

interface IProps {
  space?: TGridSizes;
}

export default function Spacer({ space = 8 }: IProps) {
  return <View style={{ height: space, width: space }} />;
}
