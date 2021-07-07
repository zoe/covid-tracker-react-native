import { BrandedButton, Text } from '@covid/components';
import { patientService } from '@covid/core/patient/PatientService';
import { resetFeedback, selectFeedbackData } from '@covid/core/state/reconsent';
import { RootState } from '@covid/core/state/root';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { generalApiClient } from '@covid/services';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme/colors';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'ReconsentReconsider'>;
}

export default function ReconsentReconsiderScreen(props: IProps) {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const feedbackData = useSelector(selectFeedbackData);
  const patientId = useSelector<RootState, string>((state) => state.user.patients[0]);

  function onPressPositive() {
    props.navigation.push('ReconsentRequestConsent', { secondTime: true });
  }

  async function onPressNegative() {
    setLoading(true);
    try {
      await generalApiClient.postUserEvent('feedback_reconsent', feedbackData);
      await patientService.updatePatientInfo(patientId, { research_consent_asked: true });
    } catch (_) {}
    setLoading(false);
    dispatch(resetFeedback());
    NavigatorService.navigate('Dashboard');
  }

  return (
    <ReconsentScreen hideBackButton>
      <Text rhythm={24} textAlign="center" textClass="h2Light">
        {i18n.t('reconsent.reconsider.title')}
      </Text>
      <Text rhythm={24} textAlign="center" textClass="pLight">
        {i18n.t('reconsent.reconsider.description-1')}
      </Text>
      <Text textAlign="center" textClass="pLight">
        {i18n.t('reconsent.reconsider.description-2')}
      </Text>
      <BrandedButton onPress={onPressPositive} style={styles.buttonPositive}>
        {i18n.t('reconsent.reconsider.button-positive')}
      </BrandedButton>
      <BrandedButton
        enabled={!loading}
        indicatorColor={colors.brand}
        loading={loading}
        onPress={onPressNegative}
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
