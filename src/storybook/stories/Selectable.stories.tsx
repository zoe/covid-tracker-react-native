import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import Collapsible from 'react-native-collapsible';
import { action, HandlerFunction } from '@storybook/addon-actions';
import { View, Button } from 'react-native';

import { Selectable, FOOD_INTAKE_FREQUENCY } from '@covid/components/Inputs/Selectable';

import { PaddingView } from '../decorator';

const ValueChangeHandler = (): HandlerFunction => action('selectable-item-selected');

const Toggleable: React.FC = () => {
  const [show, setShow] = useState<boolean>(true);
  const items = show ? FOOD_INTAKE_FREQUENCY() : [];
  console.log(items);
  return (
    <View>
      <Button
        title="Toggle"
        onPress={() => {
          setShow(!show);
        }}
      />
      <Collapsible collapsed={show}>
        <Selectable items={items} />
      </Collapsible>
    </View>
  );
};

storiesOf('Selectable', module)
  .addDecorator(PaddingView)
  .add('default view', () => <Toggleable />);
// .add('default view', () => <Selectable items={FOOD_INTAKE_FREQUENCY()} onSelected={ValueChangeHandler()} />);
