import * as React from 'react';
import { View } from 'react-native';

interface IProps {
  backgroundColor: string;
  height?: number;
}

function SolidColorBar({ backgroundColor, height = 4 }: IProps) {
  return <View style={{ backgroundColor, borderRadius: height * 0.5, height }} />;
}

export default SolidColorBar;
