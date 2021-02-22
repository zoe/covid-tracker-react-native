import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { BasicPage, Done, Text, SimpleShare, Spacer } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import i18n from '@covid/locale/i18n';
import { selectMentalHealthState, setCompleted } from '@covid/core/state';

function MentalHealthSupport() {
  const MentalHealthState = useSelector(selectMentalHealthState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!MentalHealthState.completed) {
      dispatch(setCompleted(true));
    }
  });

  return (
    <BasicPage footerTitle="Back to home" onPress={() => NavigatorService.navigate('Dashboard', undefined)} withGutter>
      <View style={styles.tickContainer}>
        <Done />
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
