import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { impactTimeline } from '@assets';

interface IProps {
  onPress: () => void;
}

function ImpactTimlineCard({ onPress }: IProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={impactTimeline}
        style={{
          aspectRatio: 1.55,
          resizeMode: 'contain',
          height: undefined,
          width: '100%',
        }}
      />
    </TouchableOpacity>
  );
}

export default ImpactTimlineCard;
