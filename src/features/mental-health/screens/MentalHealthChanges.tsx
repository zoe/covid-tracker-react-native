import React from 'react';
import { View } from 'react-native';

import { BasicPage, Text } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import { useTheme } from '@covid/themes';

import { Question } from '../partials';

function MentalHealthChanges() {
  const { grid } = useTheme();
  return (
    <BasicPage footerTitle="Next" onPress={() => NavigatorService.navigate('MentalHealthFrequency', undefined)}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text textClass="h3" rhythm={32}>
          During this pandemic, have you changed the way you have spent time doing the following:
        </Text>
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
      </View>
    </BasicPage>
  );
}

export default MentalHealthChanges;
