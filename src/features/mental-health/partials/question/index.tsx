import React from 'react';
import { View } from 'react-native';

import { QuestionBlock, Spacer, Text } from '@covid/components';
import { useTheme } from '@covid/themes';

function Question() {
  const { grid } = useTheme();

  const handleOnPress = (value: any) => {
    console.log(value);
  };

  return (
    <View style={{ marginBottom: grid.xxl }}>
      <Text textClass="pSmall">Title</Text>
      <View style={{ flexDirection: 'row' }}>
        <QuestionBlock iconName="remove1" keyValue={{ key: 'Less', value: 'LESS' }} onPress={handleOnPress} />
        <Spacer />
        <QuestionBlock iconName="equal-2" keyValue={{ key: 'No Change', value: 'NO_CHANGE' }} onPress={handleOnPress} />
        <Spacer />
        <QuestionBlock iconName="plus" keyValue={{ key: 'More', value: 'MORE' }} onPress={handleOnPress} />
        <Spacer />
        <QuestionBlock keyValue={{ key: 'Not Applicable', value: 'NOT_APPLICABLE' }} onPress={handleOnPress} />
      </View>
    </View>
  );
}

export default Question;
