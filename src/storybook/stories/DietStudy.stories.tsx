import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'native-base';

import { AlcoholUnitInfo } from '@covid/components/Cards/AlcoholUnitInfo';

import { CenterView, DarkBackground } from '../decorator';

storiesOf('Diet study', module)
  .addDecorator(CenterView)
  .addDecorator(DarkBackground)
  .add('alcochol info', () => (
    <View style={{ margin: 16 }}>
      <AlcoholUnitInfo />
    </View>
  ));
