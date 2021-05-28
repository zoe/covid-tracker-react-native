import { timelineShare } from '@assets';
import React from 'react';
import { Image } from 'react-native';

function ShareTimelineCard() {
  return (
    <>
      <Image
        source={timelineShare}
        style={{
          aspectRatio: 0.99,
          height: undefined,
          resizeMode: 'contain',
          width: '100%',
        }}
      />
    </>
  );
}

export default ShareTimelineCard;
