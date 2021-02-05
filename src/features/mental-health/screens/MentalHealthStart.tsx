import React from 'react';

import { BasicPage, Text } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';

function MentalHealthStart() {
  return (
    <BasicPage footerTitle="Start" onPress={() => NavigatorService.navigate('MentalHealthChanges', undefined)}>
      <Text>Hello world!</Text>
    </BasicPage>
  );
}

export default MentalHealthStart;
