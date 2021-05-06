import React from 'react';

import NavigatorService from '@covid/NavigatorService';
import { BasicPage } from '@covid/components';

export default () => (
  <BasicPage active footerTitle="Thank you" onPress={() => NavigatorService.goBack()} withHeader={false} />
);
