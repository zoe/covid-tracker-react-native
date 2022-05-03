import { action } from '@storybook/addon-actions';
import { boolean, number, optionsKnob, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';

import Button, { IButtonProps } from '../../components/atoms/Button';
import { CenterView } from '../CenterView';

const baseBtnProps: IButtonProps = {
  buttonType: 'primary',
  onPress: action('clicked-primary-button'),
  style: { width: 300 },
};

const secondaryBtnProps: IButtonProps = {
  buttonType: 'secondary',
  onPress: action('clicked-secondary-button'),
};

const tertiaryBtnProps: IButtonProps = {
  buttonType: 'tertiary',
  onPress: action('clicked-tertiary-button'),
};

storiesOf('Atoms/Button', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('primary', () => <Button {...baseBtnProps} text={text('Button text', 'Button')} />)
  .add('secondary', () => <Button {...baseBtnProps} {...secondaryBtnProps} text={text('Button text', 'Button')} />)
  .add('tertiary', () => <Button {...baseBtnProps} {...tertiaryBtnProps} text={text('Button text', 'Button')} />)
  .add('w/ state', () => (
    <Button
      buttonType={optionsKnob(
        'type',
        {
          primary: 'primary',
          secondary: 'secondary',
          tertiary: 'tertiary',
        },
        'primary',
        { display: 'inline-radio' },
      )}
      disabled={boolean('disabled', false)}
      onPress={action('clicked-primary-button')}
      style={{ width: number('width', 300) }}
      text={text('Button text', 'Button')}
    />
  ));
