import { Text } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { selectCanOptOutOfWiderHealthStudies } from '@covid/core/state/selectors';
import { ArrowLink } from '@covid/features/wider-health-studies/components/ArrowLink';
import { Divider } from '@covid/features/wider-health-studies/components/Divider';
import { OutlineButton } from '@covid/features/wider-health-studies/components/OutlineButton';
import { ViewCard } from '@covid/features/wider-health-studies/components/ViewCard';
import { OptOutModal } from '@covid/features/wider-health-studies/modals/OptOutModal';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

function onPressPreferences() {
  NavigatorService.navigate('DiseasePreferences');
}

function onPressPrivacyPolicy() {
  NavigatorService.navigate('PrivacyPolicyUK');
}

function onPressData() {
  NavigatorService.navigate('DataConsent');
}

function onPressInformationSheet() {
  openWebLink('https://covid.joinzoe.com/wider-health-studies-infosheet');
}

export function WiderHealthStudiesScreen() {
  const canOptOutOfWiderHealthStudies = useSelector(selectCanOptOutOfWiderHealthStudies);
  const [modalVisible, setModalVisible] = React.useState(false);
  const closeModal = React.useCallback(() => setModalVisible(false), [setModalVisible]);
  const openModal = React.useCallback(() => setModalVisible(true), [setModalVisible]);

  return (
    <Screen testID="wider-health-studies-screen">
      <OptOutModal onRequestClose={closeModal} visible={modalVisible} />
      <Text inverted colorPalette="uiDark" colorShade="darker" textClass="h2">
        {i18n.t('wider-health-studies.wider-health-studies.title')}
      </Text>
      <View style={styles.marginTopM} />
      <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pLight">
        {i18n.t('wider-health-studies.wider-health-studies.description')}
      </Text>
      <View style={styles.marginTopL} />
      <ViewCard
        buttonText={i18n.t('wider-health-studies.wider-health-studies.card-preferences.button')}
        description={i18n.t('wider-health-studies.wider-health-studies.card-preferences.description')}
        onPress={onPressPreferences}
        title={i18n.t('wider-health-studies.wider-health-studies.card-preferences.title')}
      />
      <View style={styles.marginTopM} />
      <ViewCard
        buttonText={i18n.t('wider-health-studies.wider-health-studies.card-data.button')}
        description={i18n.t('wider-health-studies.wider-health-studies.card-data.description')}
        onPress={onPressData}
        title={i18n.t('wider-health-studies.wider-health-studies.card-data.title')}
      />
      <View style={styles.marginTopXL} />
      <ArrowLink onPress={onPressPrivacyPolicy} text={i18n.t('reconsent.request-consent.privacy-notice')} />
      <View style={styles.marginTopL} />
      <ArrowLink onPress={onPressInformationSheet} text={i18n.t('reconsent.request-consent.information-sheet')} />
      <View style={styles.marginTopL} />
      <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pLight">
        {i18n.t('wider-health-studies.wider-health-studies.note')}
      </Text>
      {canOptOutOfWiderHealthStudies ? (
        <>
          <View style={styles.marginTopL} />
          <Divider />
          <View style={styles.marginTopXL} />
          <OutlineButton onPress={openModal} text={i18n.t('wider-health-studies.wider-health-studies.opt-out')} />
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  marginTopL: {
    marginTop: sizes.l,
  },
  marginTopM: {
    marginTop: sizes.m,
  },
  marginTopXL: {
    marginTop: sizes.xl,
  },
});
