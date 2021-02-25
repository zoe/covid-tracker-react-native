import React from 'react';
import { ScrollView, View } from 'react-native';

import { BasicNavHeader, SafeLayout, Spacer, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';

import dietStudyPlaybackCoordinator from '../DietStudyPlaybackCoordinator';
import { DietStudyActionCard, QualityScore } from '../components';

function DietStudyTraditional() {
  const { dietScore } = dietStudyPlaybackCoordinator;
  const beforeScore = dietScore ? dietScore?.pre_diet_score : 5;
  const duringScore = dietScore ? dietScore.post_diet_score : 5;

  return (
    <SafeLayout withGutter={false} style={{ backgroundColor: '#FFF' }}>
      <ScrollView>
        <BasicNavHeader />
        <View style={{ paddingHorizontal: 16 }}>
          <Text rhythm={16} textClass="h2">
            {i18n.t('diet-study.traditional-title')}
          </Text>
          <QualityScore beforeScore={beforeScore} duringScore={duringScore} />
          <Spacer space={24} />
          <Text textClass="h4Medium" rhythm={24}>
            {i18n.t('diet-study.traditional-body-title')}
          </Text>
          <Text textClass="pLight" rhythm={24}>
            {i18n.t('diet-study.traditional-body-0')}
          </Text>
          <Text textClass="pLight" rhythm={24}>
            {i18n.t('diet-study.traditional-body-1')}
          </Text>
          <Text textClass="pLight" rhythm={24}>
            {i18n.t('diet-study.traditional-body-2')}
          </Text>
        </View>
        <DietStudyActionCard />
      </ScrollView>
    </SafeLayout>
  );
}

export default DietStudyTraditional;
