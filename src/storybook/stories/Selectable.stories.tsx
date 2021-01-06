import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import { action, HandlerFunction } from '@storybook/addon-actions';
import { View, Button } from 'react-native';

import { Selectable, FOOD_INTAKE_FREQUENCY } from '@covid/components/Inputs/Selectable';

import { PaddingView } from '../decorator';

const ValueChangeHandler = (): HandlerFunction => action('selectable-item-selected');

const Toggleable: React.FC = () => {
  const [show, setShow] = useState<boolean>(true);
  const items = show ? FOOD_INTAKE_FREQUENCY() : [];
  return (
    <View>
      <Button
        title="Toggle"
        onPress={() => {
          setShow(!show);
        }}
      />
      <Selectable items={items} onSelected={ValueChangeHandler} />
    </View>
  );
};

storiesOf('Selectable', module)
  .addDecorator(PaddingView)
  .add('default view', () => <Toggleable />);
