import { action } from '@storybook/addon-actions';
import { boolean, optionsKnob, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { colors } from '@tracer/branding/colors';
import { IButtonProps } from '@tracer/components/atoms/Button';
import { ICheckboxProps } from '@tracer/components/atoms/Inputs/checkbox';
import { IRadioProps } from '@tracer/components/atoms/Inputs/radio';
import Row from '@tracer/components/atoms/Row';
import Form from '@tracer/components/molecules/Form/form';
import FormButtonQuestion from '@tracer/components/molecules/Form/questions/button';
import FormCheckboxQuestion from '@tracer/components/molecules/Form/questions/checkbox';
import FormRadioQuestion from '@tracer/components/molecules/Form/questions/radio';
import FormSliderQuestion from '@tracer/components/molecules/Form/questions/slider';
import FormInputTextQuestion from '@tracer/components/molecules/Form/questions/text';
import React from 'react';

import { CenterView } from '../CenterView';

const checkboxItems: ICheckboxProps[] = [
  {
    label: 'Headache',
    onSelect: (value: boolean) => {
      console.log('Headache', value);
    },
    selected: false,
  },
  {
    label: 'Fever',
    onSelect: (value: boolean) => {
      console.log('Fever', value);
    },
    selected: false,
  },
  {
    label: 'Sneezing',
    onSelect: (value: boolean) => {
      console.log('Sneezing', value);
    },
    selected: false,
  },
];

const radioItems: IRadioProps[] = [
  {
    label: 'Itchy',
    onSelect: (selected) => {
      console.log('Itchy', selected);
    },
    selected: false,
  },
  {
    label: 'Painful',
    onSelect: (selected) => {
      console.log('Painful', selected);
    },
    selected: false,
  },
  {
    label: 'Niether',
    onSelect: (selected) => {
      console.log('Niether', selected);
    },
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
  ))
  .add('form', () => (
    <Form
      initValues={{
        button: '',
        checkbox: '',
        radio: '',
        text: '',
      }}
      onSubmit={action('submitted form')}
    >
      <FormInputTextQuestion
        key="input-form-text"
        name="text"
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
      <FormRadioQuestion
        items={radioItems}
        key="input-form-radio"
        name="radio"
        question={text('Question', 'What symptoms are you experiencing today?')}
        required={boolean('required', true)}
      />
      <FormCheckboxQuestion
        items={checkboxItems}
        key="input-form-checkbox"
        name="checkbox"
        question={text('Question', 'What symptoms are you experiencing today?')}
        required={boolean('required', true)}
      />
      <FormButtonQuestion
        buttons={buttons}
        handleChange={action('selected button')}
        key="input-form-button"
        label="Did you feel worse this week?"
        name="button"
      />
      <FormSliderQuestion
        name="slider"
        options={[
          { label: 'rarely', value: 'rarely' },
          { label: 'monthly', value: 'monthly' },
          { label: 'weekly', value: 'weekly' },
          { label: 'daily', value: 'daily' },
        ]}
        question="Select frequency"
      />
    </Form>
  ));
