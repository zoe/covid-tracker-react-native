import React from 'react';
import { View, StyleSheet } from 'react-native';

import { BasicPage, Icon, Text, SimpleShare, Spacer } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import i18n from '@covid/locale/i18n';

function MentalHealthSupport() {
  return (
    <BasicPage footerTitle="Back to home" onPress={() => NavigatorService.navigate('Dashboard', undefined)} withGutter>
      <View style={styles.tickContainer}>
        <View style={styles.tick}>
          <Icon iconName="tick" iconStyle={{ color: '#C0D904' }} iconSize={32} />
        </View>
      </View>
      <Text textClass="h3" rhythm={32} textAlign="center">
        {i18n.t('mental-health.end-title')}
      </Text>
      <Text textAlign="center" textClass="pLight" rhythm={24}>
        {i18n.t('mental-health.end-0')}
      </Text>
      <Text textAlign="center" textClass="pLight" rhythm={24}>
        {i18n.t('mental-health.end-1')}
      </Text>
      <SimpleShare title={i18n.t('mental-health.share')} shareMessage={i18n.t('mental-health.share-message')} />
      <Spacer space={24} />
    </BasicPage>
  );
}

const styles = StyleSheet.create({
  tickContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  tick: {
    alignItems: 'center',
    borderColor: '#C0D904',
    borderRadius: 24,
    borderWidth: 3,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
});

export default MentalHealthSupport;
