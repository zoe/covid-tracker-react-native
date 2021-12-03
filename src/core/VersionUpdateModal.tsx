import { BrandedButton, HeaderText, Modal, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';

interface IProps {
  navigation: StackNavigationProp<TScreenParamList, 'VersionUpdateModal'>;
}

function goToStore() {
  openWebLink(
    Platform.OS === 'android'
      ? 'market://details?id=com.joinzoe.covid_zoe'
      : 'itms-apps://apps.apple.com/id/app/covid-symptom-study/id1503529611',
  );
}

export default function VersionUpdateModal({ navigation }: IProps) {
  React.useEffect(() => {
    return navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      return false;
    });
  }, [navigation]);

  return (
    <Modal visible modalName="VersionUpdate" onRequestClose={goToStore} testID="version-update-modal">
      <HeaderText style={styles.text}>{i18n.t('version-update.title')}</HeaderText>
      <Text style={styles.text}>{i18n.t('version-update.body')}</Text>
      <BrandedButton onPress={goToStore} style={styles.button}>
        {i18n.t('version-update.cta')}
      </BrandedButton>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: sizes.m,
  },
  text: {
    marginBottom: sizes.l,
    textAlign: 'center',
  },
});
