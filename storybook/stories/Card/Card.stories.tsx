import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Button from '@tracer/components/atoms/Button';
import Column from '@tracer/components/atoms/Column';
import SideBySideCard, { ISideBySideCardProps } from '@tracer/components/organisms/Card/sideByside';
import StackedCard, { IStackedCardProps } from '@tracer/components/organisms/Card/stacked';
import React from 'react';
import { Text, View } from 'react-native';

import Card, { ICardProps } from '../../components/molecules/Card';
import { CenterView } from '../CenterView';

const stackedCardProps: IStackedCardProps = {
  cardProps: {
    bodyProps: {
      body: 'The Role of Immune Health in Heart Disease',
    },
    customFooter: (
      <Column style={{ paddingHorizontal: grid.g16 }}>
        <Button buttonType="primary" style={{ marginVertical: grid.g4 }} text="primary" />
        <Button buttonType="secondary" style={{ marginVertical: grid.g4 }} text="primary" />
        <Button buttonType="tertiary" style={{ marginVertical: grid.g4 }} text="primary" />
      </Column>
    ),
    headerProps: {
      headerProps: {
        title: 'ZOE & King’s College London',
      },
    },
  },
  style: { height: 260, width: 344 },
};

const leftSideCardProps: ICardProps = {
  customBody: (
    <View>
      <Text style={{ fontSize: grid.g16, fontWeight: '800', lineHeight: grid.g48 }}>19,521</Text>
      <Text style={{ color: colors.text.secondary, fontSize: grid.g12, fontWeight: '300' }}>
        Daily new reported cases of COVID
      </Text>
    </View>
  ),
};

const rightSideCardProps: ICardProps = {
  customBody: (
    <View>
      <Text style={{ fontSize: grid.g16, fontWeight: '800', lineHeight: grid.g48 }}>200,887</Text>
      <Text style={{ color: colors.text.secondary, fontSize: grid.g12, fontWeight: '300' }}>
        Total number of people with COVID
      </Text>
    </View>
  ),
};

const sideBySideCardProps: ISideBySideCardProps = {
  footer: {
    footerProps: {
      footerTxt: '→ More Details',
    },
  },
  header: {
    headerProps: {
      bottomLabel: 'Estimated cases',
      title: 'COVID in the UK',
    },
  },
  leftSide: leftSideCardProps,
  rightSide: rightSideCardProps,
  style: { height: 200, width: 344 },
};

storiesOf('Organisms/Card', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('index', () => (
    <Card
      bodyProps={{
        body: text('Body Text', 'The Role of Immune Health in Heart Disease'),
      }}
      footerProps={{
        footerProps: { footerTxt: text('Footer Text', '→ More Details') },
      }}
      headerProps={{ headerProps: { title: text('Header Text', 'ZOE + King’s College London') } }}
    />
  ))
  .add('stacked', () => <StackedCard {...stackedCardProps} />)
  .add('side by side', () => <SideBySideCard {...sideBySideCardProps} />);
