import { BackButton, BasicNavHeader, SafeLayout, Spacer, Text } from '@covid/components';
import { QualityScore } from '@covid/features/diet-study-playback/components';
import { dietStudyPlaybackCoordinator } from '@covid/features/diet-study-playback/DietStudyPlaybackCoordinator';
import i18n from '@covid/locale/i18n';
import { styling } from '@covid/themes';
import * as React from 'react';
import { ScrollView, View } from 'react-native';

export default function DietStudyTraditionalScreen() {
  const { dietScore } = dietStudyPlaybackCoordinator;
  const beforeScore = dietScore ? dietScore?.pre_diet_score : 5;
  const duringScore = dietScore ? dietScore.post_diet_score : 5;

  return (
    <SafeLayout style={styling.backgroundWhite}>
      <ScrollView>
        <BasicNavHeader />
        <View style={{ paddingHorizontal: 16 }}>
          <Text rhythm={16} textClass="h2">
            {i18n.t('diet-study.traditional-title')}
          </Text>
          <QualityScore beforeScore={beforeScore} duringScore={duringScore} />
          <Spacer space={24} />
          <Text rhythm={24} textClass="h4Medium">
            {i18n.t('diet-study.traditional-body-title')}
          </Text>
          <Text rhythm={24} textClass="pLight">
            {i18n.t('diet-study.traditional-body-0')}
          </Text>
          <Text rhythm={24} textClass="pLight">
            {i18n.t('diet-study.traditional-body-1')}
          </Text>
          <Text rhythm={24} textClass="pLight">
            {i18n.t('diet-study.traditional-body-2')}
          </Text>
        </View>
        <BackButton style={{ marginVertical: 16 }} />
      </ScrollView>
    </SafeLayout>
  );
}
