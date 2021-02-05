import React from 'react';

import { BasicPage, Text } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';

function MentalHealthSupport() {
  return (
    <BasicPage footerTitle="Next" onPress={() => NavigatorService.navigate('MentalHealthEnd', undefined)}>
      <Text>Support</Text>
    </BasicPage>
  );
}

export default MentalHealthSupport;
