import { BrandedButton, HeaderText, ModalZoe, Text } from '@covid/components';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { openWebLink } from '@covid/utils/links';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'VersionUpdateModal'>;
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
    <ModalZoe showModal closeModalHandler={goToStore}>
      <HeaderText style={styles.text}>{i18n.t('version-update.title')}</HeaderText>
      <Text style={styles.text}>{i18n.t('version-update.body')}</Text>
      <BrandedButton onPress={goToStore} style={styles.button}>
        {i18n.t('version-update.cta')}
      </BrandedButton>
    </ModalZoe>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
  },
  text: {
    marginBottom: 24,
    textAlign: 'center',
  },
});
