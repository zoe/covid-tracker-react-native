import { BrandedButton, Text } from '@covid/components';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme/colors';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'ReconsentReconsider'>;
}

export default function ReconsentReconsiderScreen(props: IProps) {
  return (
    <ReconsentScreen>
      <Text rhythm={24} textAlign="center" textClass="h2Light">
        {i18n.t('reconsent.reconsider.title')}
      </Text>
      <Text rhythm={24} textAlign="center" textClass="pLight">
        {i18n.t('reconsent.reconsider.description-1')}
      </Text>
      <Text textAlign="center" textClass="pLight">
        {i18n.t('reconsent.reconsider.description-2')}
      </Text>
      <BrandedButton
        onPress={() => props.navigation.push('ReconsentRequestConsent', { secondTime: true })}
        style={styles.buttonPositive}
      >
        {i18n.t('reconsent.reconsider.button-positive')}
      </BrandedButton>
      <BrandedButton
        onPress={() => NavigatorService.navigate('Dashboard')}
        style={styles.buttonNegative}
        textStyle={styles.buttonNegativeText}
      >
        {i18n.t('reconsent.reconsider.button-negative')}
      </BrandedButton>
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  buttonNegative: {
    backgroundColor: colors.white,
    borderColor: colors.brand,
    borderWidth: 1,
  },
  buttonNegativeText: {
    color: colors.brand,
  },
  buttonPositive: {
    backgroundColor: colors.brand,
    marginBottom: 12,
    marginTop: 'auto',
  },
});
