import { covidByZoeIconDark } from '@assets';
import { BasicNavHeader } from '@covid/components';
import React from 'react';
import { Image } from 'react-native';

function TimelineHeader() {
  const getLogo = () => (
    <Image
      source={covidByZoeIconDark}
      style={{
        aspectRatio: 2.25,
        height: undefined,
        resizeMode: 'contain',
        width: 100,
      }}
    />
  );

  return (
    <>
      <BasicNavHeader backgroundColor="#EEEEEF">{getLogo()}</BasicNavHeader>
    </>
  );
}

export default TimelineHeader;
