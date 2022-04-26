import { sizes } from '@covid/themes';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';

import Column from '../../components/atoms/Column/Column';
import { Card } from '../../components/molecules/Card/Card';
import { CenterView } from '../CenterView';

storiesOf('Card', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('card w/ text', () => (
    <Card style={{ paddingBottom: sizes.xxl, paddingTop: sizes.xl }}>
      <Column>
        <Text>{text('Card Text', 'card text')}</Text>
      </Column>
    </Card>
  ));
