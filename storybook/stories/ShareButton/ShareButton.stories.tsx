import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import TracerBranding from '@tracer/branding';
import ShareButton from '@tracer/components/molecules/ShareButton';
import React from 'react';

import { CenterView } from '../CenterView';

storiesOf('Molecules/Share Button', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('index', () => (
    <ShareButton
      buttonType="primary"
      label={text('Share button text', 'Share')}
      onPress={action('clicked-primary-button')}
      style={{ width: 300 }}
    />
  ))
  .add('custom text style', () => (
    <ShareButton
      buttonType="primary"
      label={text('Share button text', 'Share')}
      onPress={action('clicked-primary-button')}
      shareIconStrokeColor={text('Stroke color', TracerBranding.colors.primary)}
      style={{ width: 300 }}
      textStyle={{ color: text('Text color', TracerBranding.colors.primary) }}
    />
  ));
