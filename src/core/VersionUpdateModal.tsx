import { BrandedButton, HeaderText, Modal, Text } from '@covid/components';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { openWebLink } from '@covid/utils/links';
import { getPlatformStoreLinkDeep } from '@covid/utils/platform';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'VersionUpdateModal'>;
}

export default function VersionUpdateModal({ navigation }: IProps) {
  const goToAppStore = () => {
    openWebLink(getPlatformStoreLinkDeep);
  };

  React.useEffect(() => {
    return navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      return false;
    });
  }, [navigation]);

  return (
    <Modal>
      <HeaderText style={styles.text}>{i18n.t('version-update.title')}</HeaderText>
      <Text style={styles.text}>{i18n.t('version-update.body')}</Text>
      <BrandedButton onPress={goToAppStore} style={styles.button}>
        {i18n.t('version-update.cta')}
      </BrandedButton>
    </Modal>
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
