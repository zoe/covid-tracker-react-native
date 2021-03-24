import React from 'react';
import { Image } from 'react-native';

import { impactTimeline2 } from '@assets';

function ShareTimelineCard() {
  return (
    <>
      <Image
        source={impactTimeline2}
        style={{
          aspectRatio: 0.99,
          resizeMode: 'contain',
          height: undefined,
          width: '100%',
        }}
      />
    </>
  );
}

export default ShareTimelineCard;
