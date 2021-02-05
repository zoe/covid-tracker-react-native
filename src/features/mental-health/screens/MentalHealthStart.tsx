import React from 'react';

import { BasicPage, Text } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';

import { Profile } from '../partials';

function MentalHealthStart() {
  return (
    <BasicPage footerTitle="Start" onPress={() => NavigatorService.navigate('MentalHealthChanges', undefined)}>
      <>
        <Profile />
        <Text>Hello world!</Text>
      </>
    </BasicPage>
  );
}

export default MentalHealthStart;
