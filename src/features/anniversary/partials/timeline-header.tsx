import React from 'react';
import { Image } from 'react-native';

import { BasicNavHeader } from '@covid/components';
import { covidByZoeIconDark } from '@assets';

function TimelineHeader() {
  const getLogo = () => (
    <Image
      source={covidByZoeIconDark}
      style={{
        aspectRatio: 2.25,
        resizeMode: 'contain',
        height: undefined,
        width: 100,
      }}
    />
  );

  return (
    <>
      <BasicNavHeader backgroundColor="white">{getLogo()}</BasicNavHeader>
    </>
  );
}

export default TimelineHeader;
