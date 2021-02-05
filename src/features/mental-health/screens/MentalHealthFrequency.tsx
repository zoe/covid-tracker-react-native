import React from 'react';

import { BasicPage, Text } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';

function MentalHealthFrequency() {
  return (
    <BasicPage footerTitle="Next" onPress={() => NavigatorService.navigate('MentalHealthHistory', undefined)}>
      <Text>Frequency</Text>
    </BasicPage>
  );
}

export default MentalHealthFrequency;
