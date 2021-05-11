import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';

import { NumberIndicator } from '@covid/components/stats/NumberIndicator';

storiesOf('Number indicator', module).add('default view', () => (
  <View
    style={{
      alignSelf: 'center',
    }}>
    <NumberIndicator number={2} />
  </View>
));
