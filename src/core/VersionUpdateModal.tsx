import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { HeaderText, Text } from '@covid/components';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VersionUpdateModal'>;
  route: RouteProp<ScreenParamList, 'VersionUpdateModal'>;
};

export const VersionUpdateModal: React.FC<Props> = ({ route }) => {
  return (
    <View style={styles.modal}>
      <HeaderText style={styles.text}>{i18n.t('version-update.title')}</HeaderText>
      <Text style={styles.text}>{i18n.t('version-update.body')}</Text>
    </View>
  );
};

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
});
