import React from 'react';
import { View } from 'react-native';

import { TProgress } from '../types';
import ProgressBar from './ProgressBar';

interface IProps {
  progress: TProgress[];
}

function ProgressBars({ progress }: IProps) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {progress.map((progressItem, index) => {
        const key = `progress-bar-${index}`;
        return <ProgressBar current={index} key={key} progress={progressItem} total={progress.length} />;
      })}
    </View>
  );
}

export default ProgressBars;
