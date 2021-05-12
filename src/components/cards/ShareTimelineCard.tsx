import React from 'react';
import { Image } from 'react-native';

import { timelineShare } from '@assets';

function ShareTimelineCard() {
  return (
    <>
      <Image
        source={timelineShare}
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
