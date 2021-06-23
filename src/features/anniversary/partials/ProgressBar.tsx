import { SolidColorBar } from '@covid/components';
import { TProgress } from '@covid/features/anniversary/types';
import { colors } from '@theme/colors';
import * as React from 'react';
import { View } from 'react-native';

interface IProps {
  current: number;
  progress: TProgress;
  total: number;
}

function ProgressBar({ current, progress, total }: IProps) {
  const getProgress = () => {
    switch (progress) {
      case 'NOT_STARTED':
        return '0%';
      case 'COMPLETED':
        return '100%';
      default:
        return '62%';
    }
  };

  const paddingRight = current < total - 1 ? 4 : 0;
  const width = current === 0 || current === total - 1 ? '20%' : '30%';

  return (
    <View style={{ paddingRight, width }}>
      <View>
        <SolidColorBar backgroundColor={colors.backgroundFour} height={8} />
      </View>
      <View style={{ position: 'absolute', width: getProgress() }}>
        <SolidColorBar backgroundColor={colors.brand} height={8} />
      </View>
    </View>
  );
}

export default ProgressBar;
