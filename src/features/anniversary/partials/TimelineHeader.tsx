import { covidByZoeIconDark } from '@assets';
import { BasicNavHeader } from '@covid/components';
import { colors } from '@theme/colors';
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
      <BasicNavHeader backgroundColor={colors.backgroundTertiary}>{getLogo()}</BasicNavHeader>
    </>
  );
}

export default TimelineHeader;
