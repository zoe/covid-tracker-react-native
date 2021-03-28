import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { impactTimeline, impactTimeline2 } from '@assets';

type TCardSize = 'SMALL' | 'LARGE';

interface IProps {
  onPress: () => void;
  size?: TCardSize;
}

function ImpactTimlineCard({ onPress, size = 'SMALL' }: IProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={size === 'SMALL' ? impactTimeline : impactTimeline2}
        style={{
          aspectRatio: size === 'SMALL' ? 1.55 : 0.99,
          resizeMode: 'contain',
          height: undefined,
          width: '100%',
        }}
      />
    </TouchableOpacity>
  );
}

export default ImpactTimlineCard;
