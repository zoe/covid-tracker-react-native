import { StyleProp, ViewStyle } from 'react-native';

export type TSvgProps = {
  width?: number | string;
  height?: number | string;
  style?: StyleProp<ViewStyle>;
  color?: string | null;
  testID?: string;
};
