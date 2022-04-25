import React from 'react';
import { TouchableHighlight } from 'react-native';

interface ButtonProps {
  children: any;
  onPress: () => void;
}

export default function Button({ onPress, children }: ButtonProps) {
  return <TouchableHighlight onPress={onPress}>{children}</TouchableHighlight>;
}
