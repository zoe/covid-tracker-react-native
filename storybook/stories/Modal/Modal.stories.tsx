import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { optionsKnob } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import Card, { ICardProps } from '@tracer/components/molecules/Card';
import Modal from '@tracer/components/molecules/Modal';
import React from 'react';

import { CenterView } from '../CenterView';

const standardCardProps: ICardProps = {
  bodyProps: {
    body: 'The Role of Immune Health in Heart Disease',
  },
  footerProps: {
    footerProps: {
      footerTxt: '→ More Details',
    },
  },
  headerProps: {
    headerProps: {
      title: 'ZOE & King’s College London',
    },
  },
};

const indexModalStore = new Store({ show: true });

storiesOf('Organisms/Modal', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('index', () => {
    return (
      <State store={indexModalStore}>
        <Modal
          onRequestClose={action('closing-modal-triggered')}
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
          )}
          visible={indexModalStore.get('show')}
        >
          <Card {...standardCardProps} />
        </Modal>
      </State>
    );
  });
