import React from 'react';
import { ScrollView, View } from 'react-native';

import { ActionCard, BasicNavHeader, Text, SafeLayout, Spacer } from '@covid/components';
import i18n from '@covid/locale/i18n';

import { QualityScore } from '../components';

function DietStudyTraditional() {
  return (
    <SafeLayout withGutter={false}>
      <ScrollView>
        <BasicNavHeader />
        <View style={{ paddingHorizontal: 16 }}>
          <Text rhythm={24} textClass="h2">
            {i18n.t('diet-study.traditional-title')}
          </Text>
          <QualityScore beforeScore={7} duringScore={13} />
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
        <ActionCard actionTitle={i18n.t(`diet-study.email-action-cta`)} onPress={() => null}>
          <Text textClass="pMedium" rhythm={16}>
            {i18n.t(`diet-study.email-action-title`)}
          </Text>
          <Text textClass="pLight">{i18n.t(`diet-study.email-action-body`)}</Text>
        </ActionCard>
      </ScrollView>
    </SafeLayout>
  );
}

export default DietStudyTraditional;
