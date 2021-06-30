import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { screenWidth } from './Screen';

type ProgressProps = {
  step: number;
  maxSteps: number;
  color?: string;
};

const ProgressStatus: React.FC<ProgressProps> = (props) => {
  const progress = (props.step * 100) / props.maxSteps;
  const color = props.color ?? colors.predict;
  return (
    <View style={styles.progressBar}>
      <Progress.Bar
        borderWidth={0}
        color={color}
        height={2}
        progress={progress / 100}
        unfilledColor={colors.backgroundFour}
        width={screenWidth - 36}
      />
    </View>
  );
};
export default ProgressStatus;

const styles = StyleSheet.create({
  progressBar: {
    width: screenWidth - 36,
  },
});
