import React from 'react';
import { View } from 'react-native';

import { BasicPage, Text } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import { useTheme } from '@covid/themes';

function MentalHealthSupport() {
  const { grid } = useTheme();
  return (
    <BasicPage footerTitle="Next" onPress={() => NavigatorService.navigate('MentalHealthEnd', undefined)}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text textClass="h3" rhythm={32}>
          About your history of mental health
        </Text>
      </View>
    </BasicPage>
  );
}

export default MentalHealthSupport;
