import { Done, SimpleShare, Text } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { selectMentalHealthState, setCompleted } from '@covid/core/state';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
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
    <Screen
      backgroundColor={colors.backgroundTertiary}
      footerOnPress={() => NavigatorService.navigate('Dashboard', undefined)}
      footerTitle="Back to home"
      testID="mental-health-end-screen"
    >
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
      <SimpleShare shareMessage={i18n.t('mental-health.share-message')} title={i18n.t('mental-health.share')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  tick: {
    alignItems: 'center',
    borderColor: '#C0D904',
    borderRadius: sizes.l,
    borderWidth: 3,
    height: sizes.l * 2,
    justifyContent: 'center',
    width: sizes.l * 2,
  },
  tickContainer: {
    alignItems: 'center',
    marginBottom: sizes.l,
  },
});
