import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { HeaderText, Text, BrandedButton, Modal } from '@covid/components';
import { getPlatformStoreLinkDeep } from '@covid/utils/platform';
import { openWebLink } from '@covid/utils/links';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'VersionUpdateModal'>;
}

export default function VersionUpdateModal({ navigation }: IProps) {
  const goToAppStore = () => {
    openWebLink(getPlatformStoreLinkDeep);
  };

  useEffect(() => {
    return navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      return false;
    });
  }, [navigation]);

  return (
    <Modal>
      <HeaderText style={styles.text}>{i18n.t('version-update.title')}</HeaderText>
      <Text style={styles.text}>{i18n.t('version-update.body')}</Text>
      <BrandedButton style={styles.button} onPress={goToAppStore}>
        {i18n.t('version-update.cta')}
      </BrandedButton>
    </Modal>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 16,
  },
});
