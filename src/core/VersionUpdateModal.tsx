import { BrandedButton, HeaderText, Text } from '@covid/components';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { openWebLink } from '@covid/utils/links';
import { getPlatformStoreLinkDeep } from '@covid/utils/platform';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'VersionUpdateModal'>;
  route: RouteProp<ScreenParamList, 'VersionUpdateModal'>;
}

export function VersionUpdateModal({ navigation, route }: IProps) {
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
    <View style={styles.modal}>
      <HeaderText style={styles.text}>{i18n.t('version-update.title')}</HeaderText>
      <Text style={styles.text}>{i18n.t('version-update.body')}</Text>
      <BrandedButton onPress={goToAppStore} style={styles.button}>
        {i18n.t('version-update.cta')}
      </BrandedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
  },
  modal: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 160,
    minHeight: 224,
    padding: 32,
    shadowRadius: 0,
    textAlign: 'center',
  },
  text: {
    marginBottom: 24,
    textAlign: 'center',
  },
});
