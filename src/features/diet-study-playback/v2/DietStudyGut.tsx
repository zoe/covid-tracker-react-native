import React from 'react';
import { ScrollView, View } from 'react-native';

import { BasicNavHeader, Text, SafeLayout, Spacer } from '@covid/components';
import i18n from '@covid/locale/i18n';

import dietStudyPlaybackCoordinator from '../DietStudyPlaybackCoordinator';
import { GutScore } from '../components';

function DietStudyGut() {
  const coordinator = dietStudyPlaybackCoordinator;
  return (
    <SafeLayout withGutter={false}>
      <ScrollView>
        <BasicNavHeader />
        <View style={{ paddingHorizontal: 16 }}>
          <Text rhythm={24} textClass="h2">
            {i18n.t('diet-study.gut-title')}
          </Text>
          {/* <GutScore
            beforeScore={coordinator.dietScore?.pre_gut_friendly_score}
            duringScore={coordinator.dietScore?.post_gut_friendly_score}
          /> */}
          <GutScore beforeScore={5} duringScore={5} />
          <Spacer space={24} />
          <Text textClass="pLight" rhythm={24}>
            {i18n.t('diet-study.gut-body-0')}
          </Text>
          <Text textClass="pLight" rhythm={24}>
            {i18n.t('diet-study.gut-body-1')}
          </Text>
        </View>
      </ScrollView>
    </SafeLayout>
  );
}

export default DietStudyGut;
