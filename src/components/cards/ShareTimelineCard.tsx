import { timelineShare } from '@assets';
import * as React from 'react';
import { Image } from 'react-native';

export default function ShareTimelineCard() {
  return (
    <Image
      source={timelineShare}
      style={{
        aspectRatio: 0.99,
        height: undefined,
        resizeMode: 'contain',
        width: '100%',
      }}
    />
  );
}
