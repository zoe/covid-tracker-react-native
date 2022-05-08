import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { colors } from '@tracer/branding/colors';
import Checkbox from '@tracer/components/atoms/Inputs/checkbox';
import Radio from '@tracer/components/atoms/Inputs/radio';
import Switch from '@tracer/components/atoms/Inputs/switch';
import InputText from '@tracer/components/atoms/Inputs/text';
import React from 'react';
import { Text } from 'react-native';

import { CenterView } from '../CenterView';

storiesOf('Atoms/Inputs', module)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: colors.white }}>{getStory()}</CenterView>)
  .add('text', () => (
    <InputText
      label={text('Label', 'Label')}
      onValueChange={action('value-changed')}
      placeholder={text('Placeholder Text', 'Placeholder Text')}
      value=""
    />
  ))
  .add('switch', () => <Switch onToggle={action('clicked-switch')} state={false} />)
  .add('checkbox', () => (
    <Checkbox value label={<Text>{text('Label', 'label')}</Text>} onSelect={action('clicked-checkbox')} />
  ))
  .add('radio', () => (
    <Radio selected onSelect={action('clicked-radio')}>
      <Text style={{ fontSize: 16, fontWeight: '300', lineHeight: 24, textTransform: 'capitalize' }}>
        {text('Label', 'label')}
      </Text>
    </Radio>
  ));
