import { BasicPage, Done, SimpleShare, Spacer, Text } from '@covid/components';
import { events } from '@covid/core/Analytics';
import { selectMentalHealthState, setCompleted } from '@covid/core/state';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function MentalHealthEndScreen() {
  const MentalHealthState = useSelector(selectMentalHealthState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!MentalHealthState.completed) {
      dispatch(setCompleted(true));
    }
  });

  return (
    <BasicPage withGutter footerTitle="Back to home" onPress={() => NavigatorService.navigate('Dashboard', undefined)}>
      <View style={styles.tickContainer}>
        <Done />
      </View>
      <Text rhythm={32} textAlign="center" textClass="h3">
        {i18n.t('mental-health.end-title')}
      </Text>
      <Text rhythm={24} textAlign="center" textClass="pLight">
        {i18n.t('mental-health.end-0')}
      </Text>
      <Text rhythm={24} textAlign="center" textClass="pLight">
        {i18n.t('mental-health.end-1')}
      </Text>
      <SimpleShare
        shareMessage={i18n.t('mental-health.share-message')}
        title={i18n.t('mental-health.share')}
        trackEvent={events.MENTAL_HEALTH_SHARED}
      />
      <Spacer space={24} />
    </BasicPage>
  );
}

const styles = StyleSheet.create({
  tick: {
    alignItems: 'center',
    borderColor: '#C0D904',
    borderRadius: 24,
    borderWidth: 3,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  tickContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
});
