import React from 'react';
import { ScrollView, View } from 'react-native';

import { ActionCard, BasicNavHeader, BasicProfile, Link, SafeLayout, SpeechCard, Text } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import i18n from '@covid/locale/i18n';
import { useTheme } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import { getDietStudyInfoUrl } from '@covid/features/diet-study-playback/v2/utils';
import { ScreenParamList } from '@covid/features';

import { DietStudyActionCard } from '../components';

function DietStudy() {
  type route = keyof ScreenParamList;
  const routes: route[] = ['DietStudyTraditional', 'DietStudyGut', 'DietStudyGlobal'];
  const { colors } = useTheme();

  return (
    <SafeLayout style={{ backgroundColor: '#FFF' }}>
      <ScrollView>
        <BasicNavHeader />
        <View style={{ paddingHorizontal: 16 }}>
          <Text rhythm={24} textClass="h2">
            {i18n.t('diet-study.introduction-title')}
          </Text>
        </View>
        <BasicProfile
          location={i18n.t('diet-study.doctor-location')}
          name={i18n.t('diet-study.doctor-name')}
          title={i18n.t('diet-study.doctor-title')}
        />
        <SpeechCard>
          <Text rhythm={16} textClass="h4">
            {i18n.t('diet-study.introduction-0')}
          </Text>
          <Text rhythm={16} textClass="pLight">
            {i18n.t('diet-study.introduction-1')}
          </Text>
        </SpeechCard>
        {routes.map((route, index) => {
          const key = `action-card-${index}`;
          return (
            <ActionCard
              actionTitle={i18n.t(`diet-study.card-${index}-action`)}
              buttonColor={colors.burgundy.main.bgColor}
              onPress={() => NavigatorService.navigate(route)}
              outline
              key={key}>
              <Text textClass="pMedium" rhythm={16}>
                {i18n.t(`diet-study.card-${index}-title`)}
              </Text>
              <Text textClass="pLight">{i18n.t(`diet-study.card-${index}-body`)}</Text>
            </ActionCard>
          );
        })}
        <View style={{ paddingHorizontal: 16, marginTop: 32 }}>
          <Text rhythm={8} textClass="h3">
            {i18n.t('diet-study.introduction-ongoing-title')}
          </Text>
          <Text rhythm={48} textClass="pLight">
            {i18n.t('diet-study.introduction-ongoing-body')}
          </Text>
          <Text rhythm={8} textClass="h4">
            {i18n.t('diet-study.introduction-more-title')}
          </Text>
          <Text rhythm={16} textClass="pLight">
            {i18n.t('diet-study.introduction-more-body')}
          </Text>
        </View>

        <View style={{ marginHorizontal: 16, paddingRight: 32 }}>
          <Link
            linkText={i18n.t('diet-study.introduction-more-link-0')}
            onPress={() => openWebLink(getDietStudyInfoUrl())}
            style={{ marginBottom: 8 }}
          />
        </View>
        <DietStudyActionCard />
      </ScrollView>
    </SafeLayout>
  );
}

export default DietStudy;
