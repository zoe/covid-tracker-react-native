import React from 'react';

import { BasicPage, Text } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';

function MentalHealthChanges() {
  return (
    <BasicPage footerTitle="Next" onPress={() => NavigatorService.navigate('MentalHealthFrequency', undefined)}>
      <Text>Changes</Text>
    </BasicPage>
  );
}

export default MentalHealthChanges;
