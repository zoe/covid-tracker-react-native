import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import { BasicNavHeader, SafeLayout, Spacer, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { dietStudyPlaybackGlobal1, dietStudyPlaybackGlobal2, dietStudyPlaybackGlobal3 } from '@assets';

import { DietStudyActionCard } from '../components';

function DietStudyGlobal() {
  return (
    <SafeLayout withGutter={false} style={{ backgroundColor: '#FFF' }}>
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
        <DietStudyActionCard />
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
