import React from 'react';
import { Image, ScrollView, View, StyleSheet } from 'react-native';

import { ActionCard, BasicNavHeader, Text, SafeLayout, Spacer } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { dietStudyPlaybackGlobal1, dietStudyPlaybackGlobal2, dietStudyPlaybackGlobal3 } from '@assets';

function DietStudyGlobal() {
  return (
    <SafeLayout withGutter={false}>
      <ScrollView>
        <BasicNavHeader />
        <View style={{ paddingHorizontal: 16 }}>
          <Text rhythm={24} textClass="h2">
            {i18n.t('diet-study.global-title')}
          </Text>
          <Text rhythm={16} textClass="pMedium">
            {i18n.t('diet-study.global-section-0-title')}
          </Text>
        </View>
        <Image source={dietStudyPlaybackGlobal1} style={styles.img} />
        <Spacer space={24} />
        <View style={{ paddingHorizontal: 16 }}>
          <Text rhythm={16} textClass="pMedium">
            {i18n.t('diet-study.global-section-1-title')}
          </Text>
        </View>
        <Image source={dietStudyPlaybackGlobal2} style={styles.img} />
        <Spacer space={24} />
        <View style={{ paddingHorizontal: 16 }}>
          <Text rhythm={16} textClass="pMedium">
            {i18n.t('diet-study.global-section-2-title')}
          </Text>
        </View>
        <Image source={dietStudyPlaybackGlobal3} style={styles.img} />
        <Spacer space={24} />
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

const styles = StyleSheet.create({
  img: {
    aspectRatio: 1,
    height: undefined,
    resizeMode: 'contain',
    width: '100%',
  },
});

export default DietStudyGlobal;
