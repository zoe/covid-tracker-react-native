import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { colors } from '../../branding/colors';
import { CenterView } from '../CenterView';

const colorBlock = { borderRadius: 5, height: 50, marginTop: 5, width: '100%' };
const colorViews = Object.entries(colors).map(([name, color]) => (
  <View style={{ ...colorBlock, backgroundColor: color }}>
    <Text style={{ marginLeft: 15, marginTop: 15, textAlign: 'left' }}>{`${name}: ${color}`}</Text>
  </View>
));

storiesOf('Theme/Colors', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('list', () => <ScrollView style={{ width: '90%', marginTop: 20 }}>{colorViews}</ScrollView>);
