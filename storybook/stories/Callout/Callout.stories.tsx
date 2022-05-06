import { boolean, optionsKnob, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { colors } from '@tracer/branding/colors';
import Callout from '@tracer/components/template/Callout';
import React from 'react';
import { StyleSheet } from 'react-native';

import { CenterView } from '../CenterView';

const customCenterViewStyle = StyleSheet.create({
  centerView: {
    backgroundColor: colors.white,
  },
});

storiesOf('Templates/Callout', module)
  .addDecorator((getStory) => <CenterView style={customCenterViewStyle.centerView}>{getStory()}</CenterView>)
  .add('info', () => (
    <Callout calloutType="info" compact={boolean('compact', true)} text={text('Text', 'Update notification message')} />
  ))
  .add('error', () => (
    <Callout calloutType="error" compact={boolean('compact', true)} text={text('Text', 'Error notification message')} />
  ))
  .add('warning', () => (
    <Callout
      calloutType="warning"
      compact={boolean('compact', true)}
      text={text('Text', 'Warning notification message')}
    />
  ))
  .add('success', () => (
    <Callout
      calloutType="success"
      compact={boolean('compact', true)}
      text={text('Text', 'Success notification message')}
    />
  ))
  .add('compact', () => (
    <Callout
      compact
      calloutType={optionsKnob(
        'type',
        {
          error: 'error',
          info: 'info',
          success: 'success',
          warning: 'warning',
        },
        'info',
        { display: 'inline-radio' },
      )}
      text={text('Text', 'Notification message')}
    />
  ));
