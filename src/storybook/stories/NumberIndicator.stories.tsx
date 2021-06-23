import { NumberIndicator } from '@covid/components/stats/NumberIndicator';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { View } from 'react-native';

storiesOf('Number indicator', module).add('default view', () => (
  <View
    style={{
      alignSelf: 'center',
    }}
  >
    <NumberIndicator number={2} />
  </View>
));
