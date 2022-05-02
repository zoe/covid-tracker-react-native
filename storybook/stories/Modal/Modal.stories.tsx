import { covidIcon } from '@assets';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { number, optionsKnob, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Button from '@tracer/components/atoms/Button';
import React from 'react';
import { Text } from 'react-native';

import Modal from '../../components/molecules/Modal';
import { CenterView } from '../CenterView';

const indexModalStore = new Store({ show: true });
const standardModalStore = new Store({ show: true });
const imageModalStore = new Store({ show: true });

storiesOf('Molecules/Modal', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('index', () => {
    return (
      <State store={indexModalStore}>
        <Modal
          {...{
            name: 'index-modal',
            onDismiss: () => action('clicked-dismiss-modal'),
            onRequestClose: () => action('clicked-close-modal'),
            style: { width: number('width', 300) },
            swipeDirection: optionsKnob(
              'Swipe Direction',
              {
                down: 'down',
                up: 'up',
              },
              'up',
              {
                display: 'inline-radio',
              },
            ),
          }}
          visible={indexModalStore.get('show')}
        >
          <Text>{text('Modal text', 'Modal')}</Text>
        </Modal>
      </State>
    );
  })
  .add('standard w/o image', () => {
    return (
      <State store={standardModalStore}>
        <Modal
          footer={
            <Button
              buttonType="primary"
              onPress={() => standardModalStore.set({ show: false })}
              style={{ width: 300 }}
              testID="re-brand-modal-button"
              text={text('CTA Text', 'Close')}
            />
          }
          header={
            <Text
              style={{
                color: colors.text.primary,
                // fontFamily: 'Lota Grotesque Alt 1',
                fontSize: grid.g24,
                fontStyle: 'normal',
                fontWeight: '400',
                textAlign: 'center',
              }}
            >
              {text('Header Text', 'Header')}
            </Text>
          }
          name="standard-modal-no-image"
          onRequestClose={action('clicked-modal-close')}
          visible={standardModalStore.get('show')}
        >
          <Text
            style={{
              color: colors.text.primary,
              // fontFamily: 'Lota Grotesque Alt 1',
              fontSize: grid.g16,
              fontStyle: 'normal',
              fontWeight: '300',
              textAlign: 'center',
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Text>
        </Modal>
      </State>
    );
  })
  .add('standard w/ image', () => {
    return (
      <State store={imageModalStore}>
        <Modal
          footer={
            <Button
              buttonType="primary"
              onPress={() => imageModalStore.set({ show: false })}
              style={{ width: 300 }}
              testID="re-brand-modal-button"
              text={text('CTA Text', 'Close')}
            />
          }
          header={
            <Text
              style={{
                color: colors.text.primary,
                // fontFamily: 'Lota Grotesque Alt 1',
                fontSize: grid.g24,
                fontStyle: 'normal',
                fontWeight: '400',
                textAlign: 'center',
              }}
            >
              {text('Header Text', 'Header')}
            </Text>
          }
          headerIcon={covidIcon}
          name="standard-modal-no-image"
          onRequestClose={action('clicked-modal-close')}
          visible={imageModalStore.get('show')}
        >
          <Text
            style={{
              color: colors.text.primary,
              // fontFamily: 'Lota Grotesque Alt 1',
              fontSize: grid.g16,
              fontStyle: 'normal',
              fontWeight: '300',
              textAlign: 'center',
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Text>
        </Modal>
      </State>
    );
  });
