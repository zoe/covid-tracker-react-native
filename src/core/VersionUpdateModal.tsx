import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@covid/theme';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { HeaderText, Text, BrandedButton } from '@covid/components';
import { getPlatformStoreLink } from '@covid/utils/platform';
import { openWebLink } from '@covid/utils/links';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'VersionUpdateModal'>;
  route: RouteProp<ScreenParamList, 'VersionUpdateModal'>;
}

export function VersionUpdateModal({ navigation, route }: IProps) {
  const goToAppStore = () => {
    openWebLink(getPlatformStoreLink);
  };

  useEffect(() => {
    return navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      return false;
    });
  }, [navigation]);

  return (
    <View style={styles.modal}>
      <HeaderText style={styles.text}>{i18n.t('version-update.title')}</HeaderText>
      <Text style={styles.text}>{i18n.t('version-update.body')}</Text>
      <BrandedButton style={styles.button} onPress={goToAppStore}>
        {i18n.t('version-update.cta')}
      </BrandedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.white,
    shadowRadius: 0,
    borderRadius: 16,
    minHeight: 224,
    alignItems: 'center',
    textAlign: 'center',
    padding: 32,
    marginTop: 160,
    marginHorizontal: 16,
  },
  text: {
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 16,
  },
});
