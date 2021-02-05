import React from 'react';

import { BasicPage, Text } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';

function MentalHealthHistory() {
  return (
    <BasicPage footerTitle="Next" onPress={() => NavigatorService.navigate('MentalHealthSupport', undefined)}>
      <Text>History</Text>
    </BasicPage>
  );
}

export default MentalHealthHistory;
