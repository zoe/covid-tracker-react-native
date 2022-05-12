import IconArrowLeft from '@assets/v2/svg/icon-arrow-left';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Row from '@tracer/components/atoms/Row';
import Screen from '@tracer/components/atoms/Screen';
import ScreenBody from '@tracer/components/molecules/Screen/body';
import ScreenFooter from '@tracer/components/molecules/Screen/footer';
import ScreenFlow from '@tracer/components/organisms/Screen/flow';
import { ScreenNavigatorCompact } from '@tracer/components/organisms/Screen/nav';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { makeAssessmentFlowService } from '../api';
import UsualSelfActionCardButtonGroup from '../components/0-usual-self-action-card-button-group';

interface ILogNewSymptomFlowProps {
  navigation: StackNavigationProp<TScreenParamList, 'AssessmentPage4LogNewSymptomFlow'>;
  route: RouteProp<TScreenParamList, 'AssessmentPage4LogNewSymptomFlow'>;
}

export default function AssessmentPage4LogNewSymptomFlow({ route }: ILogNewSymptomFlowProps) {
  const assessmentService = makeAssessmentFlowService();
  const [currentSymptomCategory, setCurrentSymptomCategory] = useState<number>(0);
  const [symptoms, setSymptoms] = useState<any[]>([]);

  const onNext = (): void => {
    if (currentSymptomCategory < route.params.categories.length) {
      setCurrentSymptomCategory(currentSymptomCategory + 1);
    }
  };

  useEffect(() => {
    const pick = route.params.categories[0];
    if (route.params?.categories) {
      assessmentService
        .getSymptomByCategory(pick)
        .then((categorySymptoms) => setSymptoms(categorySymptoms))
        .catch((error) => console.log(error));
    }
  }, [currentSymptomCategory]);

  return (
    <ScreenFlow>
      <Screen>
        <ScreenNavigatorCompact left={<IconArrowLeft />} />
        <ScreenBody>
          <Row style={[baseStyle.titleRow]}>
            <Text style={baseStyle.title}>
              {i18n.t('usual-self.assessment-flow.4-log-new-symptom-flow-title')}
              <Text style={baseStyle.titleHighlight}>{currentSymptomCategory}</Text>
            </Text>
          </Row>
          <Row>{symptoms ? symptoms.map((symptom) => <Text>{symptom.display_name}</Text>) : null}</Row>
        </ScreenBody>
        <ScreenFooter style={baseStyle.footer}>
          <UsualSelfActionCardButtonGroup
            style={[baseStyle.cardButtonGroup]}
            topButton={{
              onPress: onNext,
              text: i18n.t('usual-self.assessment-flow.2-action-card-cta-1'),
            }}
          />
        </ScreenFooter>
      </Screen>
    </ScreenFlow>
  );
}

const baseStyle = StyleSheet.create({
  cardButtonGroup: {
    backgroundColor: colors.white,
    paddingVertical: grid.g24,
  },
  featureTag: {
    marginBottom: grid.g16,
    width: 160,
  },
  footer: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 26,
    marginBottom: grid.g24,
    paddingHorizontal: grid.g24,
    textAlign: 'left',
  },
  titleHighlight: {
    color: colors.accent,
  },
  titleRow: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
});
