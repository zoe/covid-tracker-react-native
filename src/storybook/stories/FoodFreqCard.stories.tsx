import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action, HandlerFunction } from '@storybook/addon-actions';
import { ScrollView } from 'react-native-gesture-handler';

import { FoodFreqCard, GROUPS } from '@covid/components/Cards/FoodFreq/FoodFreqCard';

import { DarkBackground, CenterView } from '../decorator';

const ValueChangeHandler = (): HandlerFunction => action('selectabe-button-selected');
// const [selected, setSelected] = useState<Record<string, SelectableItem>>({});

storiesOf('Food Freq Card', module)
  .addDecorator(CenterView)
  .addDecorator(DarkBackground)
  .add('default view', () => (
    <ScrollView
      style={{
        margin: 16,
      }}>
      <FoodFreqCard items={GROUPS()} onSelected={ValueChangeHandler()} />
    </ScrollView>
  ));
