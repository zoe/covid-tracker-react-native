import React from 'react';

import { BasicPage, Text } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';

function MentalHealthSupport() {
  return (
    <BasicPage footerTitle="Back to home" onPress={() => NavigatorService.navigate('Dashboard', undefined)}>
      <Text>The End</Text>
    </BasicPage>
  );
}

export default MentalHealthSupport;
