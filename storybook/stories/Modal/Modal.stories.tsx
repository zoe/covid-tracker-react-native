import { State, Store } from '@sambego/storybook-state';
import { optionsKnob } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Button, Text } from 'react-native';

import Column from '../../components/atoms/Column/Column';
import { Modal } from '../../components/molecules/Modal/Modal';
import { CenterView } from '../CenterView';

const store = new Store({
  visible: false,
});

storiesOf('Modal', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('down', () => (
    <State store={store}>
      {store.get('visible') ? (
        <Modal
          swipeDirection={optionsKnob(
            'Swipe Direction',
            {
              down: 'down',
              up: 'up',
            },
            'up',
            {
              display: 'inline-radio',
            },
            'options-modal',
          )}
        >
          <Column>
            <Text>Text</Text>
            <Button key={1} onPress={() => store.set({ visible: false })} title="Close modal" />
          </Column>
        </Modal>
      ) : (
        <Button key={0} onPress={() => store.set({ visible: true })} title="Press to open modal" />
      )}
    </State>
  ));
