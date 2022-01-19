import { sizes, styling } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native';
import * as Progress from 'react-native-progress';

type TProps = {
  borderRadius?: number;
  currentStep: number;
  maxSteps: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  height?: number;
};

const ProgressStatus: React.FC<TProps> = (props) => {
  const [width, setWidth] = React.useState(0);
  const progress = (props.currentStep * 100) / props.maxSteps;
  const color = props.color ?? colors.predict;
  function onLayout(event: LayoutChangeEvent) {
    setWidth(event.nativeEvent.layout.width);
  }
  return (
    <View style={props.style}>
      <View onLayout={onLayout} style={styling.measureWidth} />
      <Progress.Bar
        borderRadius={props.borderRadius || 4}
        borderWidth={0}
        color={color}
        height={props.height || 2}
        progress={progress / 100}
        unfilledColor={colors.backgroundFour}
        width={Math.min(width, sizes.maxScreenWidth)}
      />
    </View>
  );
};
export default ProgressStatus;
