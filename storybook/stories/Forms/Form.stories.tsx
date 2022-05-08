import { action } from '@storybook/addon-actions';
import { optionsKnob, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { colors } from '@tracer/branding/colors';
import FormInputText from '@tracer/components/molecules/FormInputs/text';
import React from 'react';

import { CenterView } from '../CenterView';

storiesOf('Molecules/Forms', module)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: colors.white }}>{getStory()}</CenterView>)
  .add('text', () => (
    <FormInputText
      label={text('Label', 'label')}
      onChange={action('onchange')}
      placeholder={text('Placeholder', 'placeholder text')}
      state={optionsKnob(
        'state',
        {
          default: 'default',
          error: 'error',
          success: 'success',
        },
        'default',
        { display: 'inline-radio' },
      )}
      validation={text('validation', 'lorem ipsum')}
    />
  ));
