import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { colors } from '@tracer/branding/colors';
import Tag from '@tracer/components/atoms/Tag';
import React from 'react';

import { CenterView } from '../CenterView';

storiesOf('Atoms/Tag', module)
  .addParameters({
    notes: `
# Molecule: Tag\n
A component used to usually label cards with uppercase text.
`,
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('index', () => (
    <Tag
      color={text('Background Color', colors.primary)}
      text={text('Text', 'tag')}
      textStyle={{ color: text('Text color', colors.white) }}
    />
  ));
