import { action } from '@storybook/addon-actions';
import { boolean, optionsKnob, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { colors } from '@tracer/branding/colors';
import { IButtonProps } from '@tracer/components/atoms/Button';
import Row from '@tracer/components/atoms/Row';
import FormButtonQuestion from '@tracer/components/molecules/Form/questions/button';
import FormCheckboxQuestion, {
  IFormCheckboxItemProps,
} from '@tracer/components/molecules/Form/questions/multiCheckbox';
import FormRadioQuestion, { IFormRadioItemProps } from '@tracer/components/molecules/Form/questions/radio';
import FormInputTextQuestion from '@tracer/components/molecules/Form/questions/text';
import React from 'react';

import { CenterView } from '../CenterView';

const checkboxItems: IFormCheckboxItemProps[] = [
  {
    id: 1,
    label: 'Headache',
    selected: false,
  },
  {
    id: 2,
    label: 'Fever',
    selected: false,
  },
  {
    id: 3,
    label: 'Sneezing',
    selected: false,
  },
];

const radioItems: IFormRadioItemProps[] = [
  {
    label: 'Itchy',
    selected: false,
  },
  {
    label: 'Painful',
    selected: false,
  },
  {
    label: 'Niether',
    selected: false,
  },
];

const buttons: IButtonProps[] = [
  {
    text: 'Yes',
  },
  {
    text: 'No',
  },
];

storiesOf('Molecules/Forms', module)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: colors.white }}>{getStory()}</CenterView>)
  .add('text', () => (
    <FormInputTextQuestion
      handleChange={action('onchange')}
      name="input"
      placeholder={text('Placeholder', 'placeholder text')}
      question={text('Label', 'label')}
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
  ))
  .add('checkbox', () => (
    <Row>
      <FormCheckboxQuestion
        handleChange={action('onchange')}
        items={checkboxItems}
        name="checkbox"
        question={text('Question', 'What symptoms are you experiencing today?')}
        required={boolean('required', true)}
      />
    </Row>
  ))
  .add('radio', () => (
    <FormRadioQuestion
      handleChange={action('onchange')}
      items={radioItems}
      name="checkbox"
      question={text('Question', 'What symptoms are you experiencing today?')}
      required={boolean('required', true)}
    />
  ))
  .add('button', () => (
    <FormButtonQuestion
      buttons={buttons}
      handleChange={action('selected button')}
      label="Did you feel worse this week?"
      name="button"
    />
  ));
