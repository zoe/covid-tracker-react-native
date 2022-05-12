import { TPatientData } from '@covid/core/patient/PatientData';
import { TRootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import { IButtonProps } from '@tracer/components/atoms/Button';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import Screen from '@tracer/components/atoms/Screen';
import ButtonGroup from '@tracer/components/molecules/Button/group';
import Divider from '@tracer/components/molecules/Divider';
import ScreenBody from '@tracer/components/molecules/Screen/body';
import ScreenFooter from '@tracer/components/molecules/Screen/footer';
import ScreenProfileHeader from '@tracer/components/templates/ScreenHeaders/profile';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { makeAssessmentFlowService } from '../api';
import UsualSelfActionCardButtonGroup from '../components/0-usual-self-action-card-button-group';
import AssessmentFlowPageCardInfoLabel from '../components/2-usual-self-card-header';
import AssessmentFlowEditUsualSymptom from '../components/2-usual-self-editable-symptom-row';
import { TUsualSelfFrequentOtherSymptom, TUsualSelfFrequentSymptom, TUsualSelfSymptomSeverity } from '../types';

interface AssessmentFlowPage2ScreenProps {
  navigation: StackNavigationProp<TScreenParamList, 'AssessmentPage2UpdateUsualSelf'>;
  route: RouteProp<TScreenParamList, 'AssessmentPage2UpdateUsualSelf'>;
}

export default function AssessmentPage2UpdateUsualSelf({ route }: AssessmentFlowPage2ScreenProps) {
  const [usualSelfSymptoms, setUsualSelfSymptoms] = useState<TUsualSelfFrequentSymptom[]>();
  const [showFeelDifferentInfoModal, setFeelDifferentInfoModal] = useState<boolean>(false);
  const [additionalSymptomsToday, ,] = useState<TUsualSelfFrequentSymptom[] | undefined>();
  const [yourOtherSymptoms, setYourOtherSymptoms] = useState<TUsualSelfFrequentSymptom[]>();
  const [selectedAdditionalSymptoms, setSelectedAdditionalSymptoms] = useState<number[]>([]);
  const [, setYourOtherCommonSymptoms] = useState<TUsualSelfFrequentOtherSymptom[]>();
  const currentPatient = useSelector<TRootState, TPatientData>((state) => state.user.currentPatient);
  const assessmentFlowService = makeAssessmentFlowService();

  const onToggleFeelDifferentInfoModal = () => setFeelDifferentInfoModal(!showFeelDifferentInfoModal);

  const onUpdateDailyAssessmentSymptom = (symptomName: string) => {
    if (usualSelfSymptoms) {
      const updateUsualSelfSymptoms = usualSelfSymptoms;
      const usualSelfSymptomsToKeep: TUsualSelfFrequentSymptom[] = updateUsualSelfSymptoms.filter(
        (usualSelfSymptom) => usualSelfSymptom.symptom !== symptomName,
      );
      setUsualSelfSymptoms(usualSelfSymptomsToKeep);
    }
  };

  const onUpdateSeverityAssessmentSymptom = (symptomName: string, severity: TUsualSelfSymptomSeverity) => {
    if (usualSelfSymptoms) {
      const updateUsualSelfSymptoms = usualSelfSymptoms;
      const usualSelfSymptomsUpdated: TUsualSelfFrequentSymptom[] = updateUsualSelfSymptoms.map((usualSelfSymptom) =>
        usualSelfSymptom.symptom === symptomName ? { ...usualSelfSymptom, ...{ severity } } : usualSelfSymptom,
      );
      setUsualSelfSymptoms(usualSelfSymptomsUpdated);
    }
  };

  const onLogNewSymptom = () => {
    NavigatorService.navigate('AssessmentPage3LogNewSymptom');
  };

  const onSubmit = () => {};

  // TODO: Add code to show other additional symptoms
  // const onSelectRecommendedSymptom = (symptomNumbers: number[]) => {
  //   if (yourOtherSymptoms) {
  //     const symptom: TUsualSelfFrequentSymptom = yourOtherSymptoms[symptomNumber];
  //     if (additionalSymptomsToday) setAdditionalSymptomsToday(additionalSymptomsToday.concat(symptom));
  //     setAdditionalSymptomsToday([symptom]);
  //   }
  // };

  // TODO: Add code to show other additional symptoms
  // const onSelectRecommendedOtherSymptoms = (otherSymptom: TUsualSelfFrequentOtherSymptom) => {};

  const makeOtherSymptomButtonGroupProps = (otherSymptoms: TUsualSelfFrequentSymptom[]): IButtonProps[] =>
    otherSymptoms.map(({ symptom }) => ({
      buttonType: 'secondary',
      text: `+ ${symptom}`,
    }));

  useEffect(() => {
    assessmentFlowService
      .getRecommendedSymptoms(currentPatient.patientId)
      .then((recommendedSymptoms) => {
        setYourOtherSymptoms(recommendedSymptoms.symptoms);
        setYourOtherCommonSymptoms(recommendedSymptoms.other_symptoms);
      })
      .catch((error) => {
        console.log(error);
      });

    setUsualSelfSymptoms(route.params.usualSelfSymptoms);
    setSelectedAdditionalSymptoms([]);
  }, []);

  return (
    <Screen>
      {showFeelDifferentInfoModal ? <></> : null}
      <ScreenProfileHeader />
      <ScreenBody style={[baseStyle.body]}>
        {/* TODO: make into it's own assessment flow body component */}
        <Column>
          <Row style={[baseStyle.titleRow]}>
            <Text style={[baseStyle.title]}>{i18n.t('usual-self.assessment-flow.2-title')}</Text>
          </Row>
          <AssessmentFlowPageCardInfoLabel
            iconProps={{
              fill: colors.surface.interactive,
              height: grid.g24,
              width: grid.g24,
            }}
            onPressInfo={() => onToggleFeelDifferentInfoModal()}
            text={i18n.t('usual-self.assessment-flow.2-subtitle')}
          />
          {usualSelfSymptoms
            ? usualSelfSymptoms.map((props) => (
                <AssessmentFlowEditUsualSymptom
                  {...props}
                  onUpdateDailyAssessmentSymptom={onUpdateDailyAssessmentSymptom}
                  onUpdateSeverityAssessmentSymptom={onUpdateSeverityAssessmentSymptom}
                />
              ))
            : null}
          {additionalSymptomsToday && additionalSymptomsToday.length > 0 ? (
            <>
              {/* <Row style={{ paddingHorizontal: grid.g16, paddingVertical: grid.g24 }}>
                <Text style={[baseStyle.additionalSymptomHeader]}>
                  {i18n.t('usual-self.assessment-flow.2-addition-symptoms')}
                </Text>
              </Row>
              {additionalSymptomsToday.map((props) => (
                <AssessmentFlowEditUsualSymptom
                  {...props}
                  onUpdateDailyAssessmentSymptom={onUpdateDailyAssessmentSymptom}
                  onUpdateSeverityAssessmentSymptom={onUpdateSeverityAssessmentSymptom}
                />
              ))} */}
            </>
          ) : null}
          <Row style={[baseStyle.dividerRow]}>
            <Divider color={colors.quaternary} width={1} />
          </Row>
          {yourOtherSymptoms && yourOtherSymptoms.length > 0 ? (
            <ButtonGroup
              multiSelect
              active={selectedAdditionalSymptoms}
              buttonProps={makeOtherSymptomButtonGroupProps(yourOtherSymptoms)}
              onChange={(updatedUsualSelfSymptoms: number[]) => {
                console.log(updatedUsualSelfSymptoms);
              }}
              style={{
                backgroundColor: colors.transparent,
                flexGrow: 1,
                flexWrap: 'wrap',
                paddingHorizontal: grid.g16,
              }}
            />
          ) : null}
          {/* {yourOtherSymptoms && yourOtherSymptoms.length > 0 ? (
            <Row style={{ flexGrow: 1, flexWrap: 'wrap' }}>
              <ButtonGroup
                buttonProps={makeOtherSymptomButtonGroupProps(yourOtherSymptoms)}
                onChange={(btn: number) => onSelectRecommendedOtherSymptoms(symptomNumber)}
              />
            </Row>
          ) : null} */}
        </Column>
      </ScreenBody>
      <ScreenFooter style={baseStyle.footer}>
        <UsualSelfActionCardButtonGroup
          bottomButton={{
            onPress: onSubmit,
            text: i18n.t('usual-self.assessment-flow.2-action-card-cta-2'),
          }}
          style={[baseStyle.cardButtonGroup]}
          topButton={{
            buttonType: 'secondary',
            onPress: onLogNewSymptom,
            text: i18n.t('usual-self.assessment-flow.2-action-card-cta-1'),
          }}
        />
      </ScreenFooter>
    </Screen>
  );
}

const baseStyle = StyleSheet.create({
  additionalSymptomHeader: {
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: grid.g24,
    textAlign: 'left',
  },
  body: {
    backgroundColor: colors.surface.interactive,
  },
  cardButtonGroup: {
    paddingTop: grid.g24,
  },
  dividerRow: {
    flexGrow: 1,
    paddingBottom: grid.g24,
    paddingHorizontal: grid.g24,
    paddingTop: grid.g24,
  },
  footer: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: grid.g32,
    borderTopRightRadius: grid.g32,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 30,
  },
  subTitleRow: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 40,
    marginBottom: grid.g24,
    paddingHorizontal: grid.g32,
    textAlign: 'center',
  },
  titleRow: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
