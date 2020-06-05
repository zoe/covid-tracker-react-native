import { colors } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { screenWidth } from './Screen';

type ProgressProps = {
  step: number;
  maxSteps: number;
};

const ProgressStatus: React.FC<ProgressProps> = (props) => {
  const progress = (props.step * 100) / props.maxSteps;
  return (
    <View style={styles.progressBar}>
      <Progress.Bar
        progress={progress / 100}
        width={screenWidth - 36}
        color={colors.purple}
        unfilledColor={colors.backgroundFour}
        borderWidth={0}
        height={2}
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
