import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { impactTimeline, impactTimeline2 } from '@assets';

type TCardSize = 'SMALL' | 'LARGE';

interface IProps {
  onPress: () => void;
  size?: TCardSize;
}

function ImpactTimelineCard({ onPress, size = 'SMALL' }: IProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={size === 'SMALL' ? impactTimeline : impactTimeline2}
        style={{
          aspectRatio: size === 'SMALL' ? 1.55 : 0.99,
          marginVertical: size === 'SMALL' ? 0 : 32,
          resizeMode: 'contain',
          height: undefined,
          width: '100%',
        }}
      />
    </TouchableOpacity>
  );
}

export default ImpactTimelineCard;
