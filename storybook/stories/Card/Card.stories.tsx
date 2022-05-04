import { storiesOf } from '@storybook/react-native';
import React from 'react';

import Card, { ICardProps } from '../../components/molecules/Card';
import { CenterView } from '../CenterView';

const standardCardProps: ICardProps = {
  bodyProps: {
    body: 'The Role of Immune Health in Heart Disease',
  },
  footerProps: {
    footerProps: {
      footerTxt: '→ More Details',
    },
  },
  headerProps: {
    headerProps: {
      title: 'ZOE & King’s College London',
    },
  },
};

storiesOf('Molecules/Card', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('index', () => <Card {...standardCardProps} />);
