import React from 'react';
import { ScrollView, View } from 'react-native';

import { BasicNavHeader, Text, SafeLayout } from '@covid/components';
import i18n from '@covid/locale/i18n';

function DietStudyTraditional() {
  return (
    <SafeLayout withGutter={false}>
      <ScrollView>
        <BasicNavHeader />
        <View style={{ paddingHorizontal: 16 }}>
          <Text rhythm={24} textClass="h2">
            {i18n.t('diet-study.traditional-title')}
          </Text>
        </View>
      </ScrollView>
    </SafeLayout>
  );
}

export default DietStudyTraditional;
