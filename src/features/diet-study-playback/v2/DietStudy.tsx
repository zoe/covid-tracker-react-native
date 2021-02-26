import React from 'react';
import { ScrollView, View } from 'react-native';

import { ActionCard, BasicProfile, BasicNavHeader, Link, Text, SpeechCard, SafeLayout } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import { drSarahBerry } from '@assets';
import i18n from '@covid/locale/i18n';
import { useTheme } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import appCoordinator from '@covid/features/AppCoordinator';

import dietStudyPlaybackCoordinator from '../DietStudyPlaybackCoordinator';
import { ScreenParamList } from '../../ScreenParamList';

function DietStudy() {
  type route = keyof ScreenParamList;
  const routes: route[] = ['DietStudyTraditional', 'DietStudyGut', 'DietStudyGlobal'];
  const { colors } = useTheme();
  const coordinator = dietStudyPlaybackCoordinator;

  return (
    <SafeLayout withGutter={false} style={{ backgroundColor: '#FFF' }}>
      <ScrollView>
        <BasicNavHeader />
        <View style={{ paddingHorizontal: 16 }}>
          <Text rhythm={24} textClass="h2">
            {i18n.t('diet-study.introduction-title')}
          </Text>
        </View>
        <BasicProfile
          imgsrc={drSarahBerry}
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
          <View style={{ paddingRight: 32 }}>
            <Link
              linkText={i18n.t('diet-study.introduction-more-link-0')}
              onPress={() => openWebLink(coordinator.getDietStudyInfoUrl())}
              style={{ marginBottom: 16 }}
            />
            <Link
              linkText={i18n.t('diet-study.introduction-more-link-1')}
              onPress={() => appCoordinator.gotoDietStudyEmailModal()}
              style={{ marginBottom: 32 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeLayout>
  );
}

export default DietStudy;
