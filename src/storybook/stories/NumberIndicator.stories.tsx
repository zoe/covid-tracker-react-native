import { NumberIndicator } from '@covid/components/Stats/NumberIndicator';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
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
