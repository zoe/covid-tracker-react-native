import { TRootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import Screen from '@tracer/components/atoms/Screen';
import Divider from '@tracer/components/molecules/Divider';
import ScreenBody from '@tracer/components/molecules/Screen/body';
import ScreenFooter from '@tracer/components/molecules/Screen/footer';
import ScreenProfileHeader from '@tracer/components/templates/ScreenHeaders/profile';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { makeAssessmentService, makeSymptomService } from '../../api';
import UsualSelfActionCardButtonGroup from '../components/0-usual-self-action-card-button-group';
import { makeNoUsualSelfFrequentSymptoms } from '../components/1-usual-self-symptoms';
import AssessmentBubbleSymptoms from '../components/2-assessment-bubble-symptoms';
import AssessmentFlowPageCardInfoLabel from '../components/2-usual-self-label';
import AssessmentFlowEditUsualSymptom from '../components/2-usual-self-symptoms-edit';
import ModalFeelDifferent from '../modals/FeelDifferent';
import ModalSeverityNotSelected from '../modals/SeverityNotSelected';
import {
  TBubbleSymptoms,
  TFrequentBubbleSymptom,
  TUsualSelfFrequentOtherSymptom,
  TUsualSelfFrequentSymptom,
  TUsualSelfSymptomSeverity,
} from '../types';

const cleanSymptoms = (data: TUsualSelfFrequentSymptom[]) => {
  return data.map((s) => {
    console.log(s);
    return {
      frequency: '',
      severity: s.severity,
      symptom: s.symptom !== undefined ? s.symptom : s.name,
    };
  });
};

const cleanUsualSymptoms = (data: TUsualSelfFrequentSymptom[]) => {
  return data.map((s) => ({
    frequency: s.frequency,
    severity: s.severity,
    symptom: s.symptom,
  }));
};

const cleanOtherSymptoms = (data: TUsualSelfFrequentOtherSymptom[]) => {
  return data.map((s) => ({
    description: s.description,
    frequency: '',
    severity: s.severity,
  }));
};

const makeReport = (
  patientID: string,
  usualSymptoms: TUsualSelfFrequentSymptom[],
  uncheckedUsualSymptoms: TUsualSelfFrequentSymptom[],
  usualOtherSymptoms: TUsualSelfFrequentOtherSymptom[],
  uncheckedUsualOtherSymptoms: TUsualSelfFrequentOtherSymptom[],
  additionalSymptoms?: TUsualSelfFrequentSymptom[],
  additionalOtherSymptoms?: TUsualSelfFrequentOtherSymptom[],
) => {
  const uncheckedNames = uncheckedUsualSymptoms.map((unchecked) => unchecked.symptom);
  const uncheckedOtherNames = uncheckedUsualOtherSymptoms.map((unchecked) => unchecked.description);
  const reportUsualSymptoms = usualSymptoms.filter((usual) => !uncheckedNames.includes(usual.symptom));
  const reportUsualOtherSymptoms = usualOtherSymptoms.filter(
    (usualOther) => !uncheckedOtherNames.includes(usualOther.description),
  );

  let cleanedOtherAdditionalSymptoms: any[] = [];
  if (additionalOtherSymptoms !== undefined && additionalOtherSymptoms.length > 0) {
    cleanedOtherAdditionalSymptoms = cleanOtherSymptoms(additionalOtherSymptoms);
  }

  let cleanedAdditionalSymptoms: any[] = [];
  if (additionalSymptoms !== undefined && additionalSymptoms.length > 0) {
    cleanedAdditionalSymptoms = cleanSymptoms(additionalSymptoms);
  }

  return {
    other_symptoms: [...(reportUsualOtherSymptoms || []), ...(cleanedOtherAdditionalSymptoms || [])],
    patient: patientID,
    symptoms: [...cleanUsualSymptoms(reportUsualSymptoms), ...(cleanedAdditionalSymptoms || [])],
  };
};

interface AssessmentFlowPage2ScreenProps {
  navigation: StackNavigationProp<TScreenParamList, 'AssessmentPage2UpdateUsualSelf'>;
  route: RouteProp<TScreenParamList, 'AssessmentPage2UpdateUsualSelf'>;
}

export default function AssessmentPage2UpdateUsualSelf({ route }: AssessmentFlowPage2ScreenProps) {
  const [usualSymptoms, setUsualSymptoms] = useState<TUsualSelfFrequentSymptom[]>([]);
  const [uncheckedUsualSymptoms, setUncheckedUsualSymptoms] = useState<TUsualSelfFrequentSymptom[]>([]);

  const [usualOtherSymptoms, setUsualOtherSymptoms] = useState<TUsualSelfFrequentOtherSymptom[]>([]);
  const [uncheckedUsualOtherSymptoms, setUncheckedUsualOtherSymptoms] = useState<TUsualSelfFrequentOtherSymptom[]>([]);

  const [newFrequentBubbleSymptoms, setFrequentBubbleSymptoms] = useState<TFrequentBubbleSymptom[]>();
  const [newAdditionalSymptoms, setAdditionalSymptoms] = useState<TUsualSelfFrequentSymptom[]>();

  const [newOtherBubbleSymptoms, setOtherBubbleSymptoms] = useState<TUsualSelfFrequentOtherSymptom[]>();
  const [newAdditionalOtherSymptoms, setAdditionalOtherSymptoms] = useState<TUsualSelfFrequentOtherSymptom[]>();

  const [, setNewLoggedSymptoms] = useState<TUsualSelfFrequentSymptom[]>();
  const [, setNewLoggedOtherSymptoms] = useState<TUsualSelfFrequentOtherSymptom[]>();

  const [showFormMissingSeverityModal, setFormMissingSeverityModal] = useState<boolean>(false);

  const [showFeelDifferentInfoModal, setFeelDifferentInfoModal] = useState<boolean>(false);
  const onToggleFeelDifferentInfoModal = () => setFeelDifferentInfoModal(!showFeelDifferentInfoModal);

  const patientID = useSelector<TRootState, string>((state) => state.user.patients[0]);

  const symptomService = makeSymptomService();
  const assessmentService = makeAssessmentService();

  const onToggleSymptom = (symptomName: string) => {
    const exists = uncheckedUsualSymptoms.filter((symptom) => symptom.display_name === symptomName);

    if (exists.length === 0) {
      const symptomToBeIgnored = usualSymptoms.filter((symptom) => symptom.display_name === symptomName);
      setUncheckedUsualSymptoms([...uncheckedUsualSymptoms, ...symptomToBeIgnored]);
    } else {
      const keep = uncheckedUsualSymptoms.filter((symptom) => symptom.display_name !== symptomName);
      setUncheckedUsualSymptoms([...keep]);
    }
  };

  const onUpdateSymptomSeverity = (symptomName: string, severity: TUsualSelfSymptomSeverity) => {
    if (usualSymptoms) {
      const updateUsualSelfSymptoms = usualSymptoms;
      const usualSelfSymptomsUpdated: TUsualSelfFrequentSymptom[] = updateUsualSelfSymptoms.map(
        (newUsualSelfSymptom: TUsualSelfFrequentSymptom) =>
          newUsualSelfSymptom.symptom === symptomName
            ? { ...newUsualSelfSymptom, ...{ severity } }
            : newUsualSelfSymptom,
      );
      setUsualSymptoms(usualSelfSymptomsUpdated);
    }
  };

  const onToggleOtherSymptom = (symptomDescription: string) => {
    const exists = uncheckedUsualOtherSymptoms.filter((symptom) => symptom.description === symptomDescription);
    if (exists.length === 0) {
      const symptomToBeIgnored = usualOtherSymptoms.filter((symptom) => symptom.description === symptomDescription);
      setUncheckedUsualOtherSymptoms([...uncheckedUsualOtherSymptoms, ...symptomToBeIgnored]);
    } else {
      const keep = uncheckedUsualOtherSymptoms.filter((symptom) => symptom.description !== symptomDescription);
      setUncheckedUsualOtherSymptoms([...keep]);
    }
  };

  const onUpdateOtherSymptomSeverity = (symptomDescription: string, severity: TUsualSelfSymptomSeverity) => {
    if (usualSymptoms) {
      const updateUsualSelfOtherSymptoms = usualOtherSymptoms;
      const usualSelfOtherSymptomsUpdated: TUsualSelfFrequentOtherSymptom[] = updateUsualSelfOtherSymptoms.map(
        (newUsualSelfSymptom: TUsualSelfFrequentOtherSymptom) =>
          newUsualSelfSymptom.description === symptomDescription
            ? { ...newUsualSelfSymptom, ...{ severity } }
            : newUsualSelfSymptom,
      );
      setUsualOtherSymptoms(usualSelfOtherSymptomsUpdated);
    }
  };

  const onAddBubbleSymptom = (symptomIndex: number) => {
    if (newFrequentBubbleSymptoms) {
      const newSymptoms = newFrequentBubbleSymptoms.filter(
        (symptom) => symptom.symptom !== newFrequentBubbleSymptoms[symptomIndex].symptom,
      );
      setAdditionalSymptoms([...(newAdditionalSymptoms || []), newFrequentBubbleSymptoms[symptomIndex]]);
      setFrequentBubbleSymptoms(newSymptoms);
    }
  };

  const onToggleAdditionalSymptoms = (symptomName: string) => {
    if (newAdditionalSymptoms) {
      const symptomIndex = newAdditionalSymptoms.findIndex(
        (newAdditionalSymptom) => newAdditionalSymptom.symptom === symptomName,
      );
      const updatedSymptoms = [...newAdditionalSymptoms];
      const selectedSymptoms = updatedSymptoms.splice(symptomIndex, 1);
      setAdditionalSymptoms(updatedSymptoms);
      setFrequentBubbleSymptoms([...(newFrequentBubbleSymptoms || []), ...selectedSymptoms]);
    }
  };

  const onToggleAdditionalOtherSymptoms = (symptomName: string) => {
    if (newAdditionalOtherSymptoms) {
      const updateOtherSymptoms = [...newAdditionalOtherSymptoms];
      const symptomIndex = updateOtherSymptoms.findIndex(
        (newAdditionalOtherSymptom: TUsualSelfFrequentOtherSymptom) =>
          newAdditionalOtherSymptom.description === symptomName,
      );
      const selectedSymptoms: TUsualSelfFrequentOtherSymptom[] = updateOtherSymptoms.splice(symptomIndex, 1);
      setAdditionalOtherSymptoms(updateOtherSymptoms);
      setOtherBubbleSymptoms([...(newOtherBubbleSymptoms || []), ...selectedSymptoms]);
    }
  };

  const onAddOtherBubbleSymptom = (index: number) => {
    if (newOtherBubbleSymptoms) {
      const updateOtherBubbleSymptoms = [...newOtherBubbleSymptoms];
      setAdditionalOtherSymptoms([...(newAdditionalOtherSymptoms || []), updateOtherBubbleSymptoms[index]]);
      updateOtherBubbleSymptoms.splice(index, 1);
      setOtherBubbleSymptoms(updateOtherBubbleSymptoms);
    }
  };

  const onUpdateAdditionalSymptomSeverity = (symptomName: string, severity: TUsualSelfSymptomSeverity) => {
    if (newAdditionalSymptoms) {
      const updateAdditionalSymptoms = [...newAdditionalSymptoms];
      const additionalSymptomsUpdated: TUsualSelfFrequentSymptom[] = updateAdditionalSymptoms.map(
        (usualSelfSymptom: TUsualSelfFrequentSymptom) =>
          usualSelfSymptom.symptom === symptomName ? { ...usualSelfSymptom, ...{ severity } } : usualSelfSymptom,
      );
      setAdditionalSymptoms(additionalSymptomsUpdated);
    }
  };

  const onUpdateAdditionalOtherSymptomSeverity = (symptomName: string, severity: TUsualSelfSymptomSeverity) => {
    if (newAdditionalOtherSymptoms) {
      const updateAdditionalOtherSymptoms = newAdditionalOtherSymptoms;
      const additionalOtherSymptomsUpdated: TUsualSelfFrequentOtherSymptom[] = updateAdditionalOtherSymptoms.map(
        (symptom: TUsualSelfFrequentOtherSymptom) =>
          symptom.description === symptomName ? { ...symptom, ...{ severity } } : symptom,
      );
      setAdditionalOtherSymptoms(additionalOtherSymptomsUpdated);
    }
  };

  const onLogNewSymptom = () => {
    NavigatorService.navigate('AssessmentPage3LogNewSymptom', { usualSelfSymptoms: usualSymptoms });
  };

  const onSubmit = () => {
    const report = makeReport(
      patientID,
      usualSymptoms,
      uncheckedUsualSymptoms,
      usualOtherSymptoms,
      uncheckedUsualOtherSymptoms,
      newAdditionalSymptoms,
      newAdditionalOtherSymptoms,
    );

    const hasNewAdditionalSymptoms = newAdditionalSymptoms && newAdditionalSymptoms?.length > 0;
    const hasNewAdditionalOtherSymptoms = newAdditionalOtherSymptoms && newAdditionalOtherSymptoms?.length > 0;

    if (hasNewAdditionalSymptoms || hasNewAdditionalOtherSymptoms) {
      NavigatorService.navigate('AssessmentPage5LogNewSymptomReason', { report });
      return;
    }

    assessmentService
      .createNewDailyAssessment({ ...report, ...{ reasons: [] } })
      .then((resp) => {
        // eslint-disable-next-line no-console
        console.log(resp);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    NavigatorService.navigate('ThankYouUK');
  };

  useEffect(() => {
    if (route.params.usualSelfSymptoms) {
      symptomService
        .getRecommendedSymptoms()
        .then(({ symptoms, other_symptoms }: TBubbleSymptoms) => {
          setFrequentBubbleSymptoms(
            symptoms.map((symptom) => ({
              display_name: symptom.display_name,
              id: symptom.id,
              symptom: symptom.symptom || symptom.name,
            })),
          );
          setOtherBubbleSymptoms(other_symptoms);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });

      const usualSelf = route.params.usualSelfSymptoms.map((data: TUsualSelfFrequentSymptom) => ({
        display_name: data.display_name,
        frequency: data.frequency,
        severity: data.severity,
        symptom: data.symptom,
      }));
      setUsualSymptoms(usualSelf);

      const usualSelfOtherSymptoms = route.params.usualSelfOtherSymptoms.map(
        (data: TUsualSelfFrequentOtherSymptom) => ({
          description: data.description,
          frequency: data.frequency,
          severity: data.severity,
        }),
      );
      setUsualOtherSymptoms(usualSelfOtherSymptoms);
    }
  }, []);

  useEffect(() => {
    const newSymptoms = route.params.newSymptoms;
    setNewLoggedSymptoms(newSymptoms);

    const newOtherSymptoms = route.params.newOtherSymptoms;
    setNewLoggedOtherSymptoms(newOtherSymptoms);

    if (newAdditionalSymptoms && newSymptoms) {
      setAdditionalSymptoms([...newAdditionalSymptoms, ...newSymptoms]);
    } else {
      setAdditionalSymptoms(newSymptoms);
    }

    if (newAdditionalOtherSymptoms && newOtherSymptoms) {
      setAdditionalOtherSymptoms([...newAdditionalOtherSymptoms, ...newOtherSymptoms]);
    } else {
      setAdditionalOtherSymptoms(newOtherSymptoms);
    }
  }, [route.params.newSymptoms, route.params.newOtherSymptoms]);

  const symptomsHaveSeverity = (symptoms: TUsualSelfFrequentSymptom[] | TUsualSelfFrequentOtherSymptom[]): boolean => {
    const symptomsWithoutSeverity = symptoms.filter(
      ({ severity }: TUsualSelfFrequentSymptom | TUsualSelfFrequentOtherSymptom) =>
        severity === null || severity === undefined,
    );
    return symptomsWithoutSeverity.length === 0;
  };

  const isFormValid = () => {
    const isValidAdditionalSymptoms = newAdditionalSymptoms ? symptomsHaveSeverity(newAdditionalSymptoms) : true;
    const isValidAdditionalOtherSymptoms = newAdditionalOtherSymptoms
      ? symptomsHaveSeverity(newAdditionalOtherSymptoms)
      : true;
    const isValidusualSymptoms = usualSymptoms ? symptomsHaveSeverity(usualSymptoms) : true;
    return isValidAdditionalSymptoms && isValidAdditionalOtherSymptoms && isValidusualSymptoms;
  };

  const isReadyToSubmit = isFormValid();
  return (
    <Screen isInsideTabBar differentEdgeColor={colors.surface.interactive}>
      {showFeelDifferentInfoModal ? (
        <ModalFeelDifferent onClose={() => onToggleFeelDifferentInfoModal()} visible={showFeelDifferentInfoModal} />
      ) : null}
      {showFormMissingSeverityModal ? (
        <ModalSeverityNotSelected
          onClose={() => setFormMissingSeverityModal(false)}
          visible={showFormMissingSeverityModal}
        />
      ) : null}
      <ScreenProfileHeader onGoBack={NavigatorService.goBack} />
      <ScrollView>
        <ScreenBody style={[baseStyle.body]}>
          <Column>
            <Row style={[baseStyle.titleRow]}>
              <Text style={[baseStyle.title]}>{i18n.t('usual-self.assessment-flow.2-title')}</Text>
            </Row>
            <Row style={{ marginBottom: grid.g12, paddingHorizontal: grid.g16 }}>
              <AssessmentFlowPageCardInfoLabel
                iconProps={{
                  fill: colors.surface.interactive,
                  height: grid.g24,
                  width: grid.g24,
                }}
                onPressInfo={() => onToggleFeelDifferentInfoModal()}
                text={i18n.t('usual-self.assessment-flow.2-subtitle')}
              />
            </Row>
            {usualSymptoms && usualSymptoms !== undefined
              ? usualSymptoms.map((props: TUsualSelfFrequentSymptom, index: number) => (
                  <AssessmentFlowEditUsualSymptom
                    display_name={props.display_name}
                    key={`edit-symptom-${index + 1}`}
                    onToggleSymptom={onToggleSymptom}
                    onUpdateSymptomSeverity={onUpdateSymptomSeverity}
                    severity={props.severity}
                    symptom={props.symptom}
                  />
                ))
              : null}
            {usualOtherSymptoms && usualOtherSymptoms !== undefined
              ? usualOtherSymptoms.map((props: TUsualSelfFrequentOtherSymptom, index: number) => (
                  <AssessmentFlowEditUsualSymptom
                    display_name={props.description}
                    key={`edit-symptom-${index + 1}`}
                    onToggleSymptom={onToggleOtherSymptom}
                    onUpdateSymptomSeverity={onUpdateOtherSymptomSeverity}
                    severity={props.severity}
                    symptom={props.description}
                  />
                ))
              : null}
            {!usualSymptoms || usualSymptoms === undefined || usualSymptoms.length === 0
              ? makeNoUsualSelfFrequentSymptoms()
              : null}
            {(newAdditionalSymptoms !== undefined && newAdditionalSymptoms.length > 0) ||
            (newAdditionalOtherSymptoms !== undefined && newAdditionalOtherSymptoms.length > 0) ? (
              <Row style={[baseStyle.additionalSymptomHeaderRow]}>
                <Text style={[baseStyle.additionalSymptomHeader]}>
                  {i18n.t('usual-self.assessment-flow.2-addition-symptoms')}
                </Text>
              </Row>
            ) : null}
            {newAdditionalSymptoms
              ? newAdditionalSymptoms.map(
                  ({ severity, symptom, display_name }: TUsualSelfFrequentSymptom, index: number) => (
                    <AssessmentFlowEditUsualSymptom
                      display_name={display_name}
                      key={`edit-additional-frequent-symptom-${symptom}-${severity}-${index + 1}`}
                      onToggleSymptom={onToggleAdditionalSymptoms}
                      onUpdateSymptomSeverity={onUpdateAdditionalSymptomSeverity}
                      severity={severity}
                      symptom={symptom}
                    />
                  ),
                )
              : null}
            {newAdditionalOtherSymptoms
              ? newAdditionalOtherSymptoms.map(
                  ({ severity, description }: TUsualSelfFrequentOtherSymptom, index: number) => (
                    <AssessmentFlowEditUsualSymptom
                      display_name={description}
                      key={`edit-additional-frequent-symptom-${severity}-${index + 1}`}
                      onToggleSymptom={onToggleAdditionalOtherSymptoms}
                      onUpdateSymptomSeverity={onUpdateAdditionalOtherSymptomSeverity}
                      severity={severity}
                      symptom={description}
                    />
                  ),
                )
              : null}
            {(newFrequentBubbleSymptoms && newFrequentBubbleSymptoms.length > 0) ||
            (newOtherBubbleSymptoms && newOtherBubbleSymptoms.length > 0) ? (
              <Row style={[baseStyle.dividerRow]}>
                <Divider color={colors.quaternary} width={1} />
              </Row>
            ) : null}
            {newFrequentBubbleSymptoms &&
            newFrequentBubbleSymptoms !== undefined &&
            newFrequentBubbleSymptoms.length > 0 ? (
              <AssessmentBubbleSymptoms
                bubbleSymptoms={newFrequentBubbleSymptoms}
                onSelectBubble={onAddBubbleSymptom}
                otherBubbleSymptoms={[]}
              />
            ) : null}
            {newOtherBubbleSymptoms && newOtherBubbleSymptoms !== undefined && newOtherBubbleSymptoms.length > 0 ? (
              <AssessmentBubbleSymptoms
                otherSymptoms
                bubbleSymptoms={[]}
                onSelectBubble={onAddOtherBubbleSymptom}
                otherBubbleSymptoms={newOtherBubbleSymptoms}
              />
            ) : null}
          </Column>
        </ScreenBody>
      </ScrollView>
      <ScreenFooter>
        <Row style={[baseStyle.footerRow]}>
          <Column style={{ flexGrow: 1, justifyContent: 'flex-start' }}>
            <UsualSelfActionCardButtonGroup
              bottomButton={{
                onPress: isReadyToSubmit ? onSubmit : () => setFormMissingSeverityModal(true),
                text: i18n.t('usual-self.assessment-flow.2-action-card-cta-2'),
              }}
              btnGroupStyle={[baseStyle.cardButtonGroup]}
              topButton={{
                buttonType: 'secondary',
                onPress: onLogNewSymptom,
                text: i18n.t('usual-self.assessment-flow.2-action-card-cta-1'),
              }}
            />
          </Column>
        </Row>
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
  additionalSymptomHeaderRow: {
    paddingHorizontal: grid.g16,
    paddingVertical: grid.g24,
  },
  body: {
    backgroundColor: colors.surface.interactive,
    paddingHorizontal: grid.g16,
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
  footerRow: {
    backgroundColor: colors.white,
    flexGrow: 1,
    paddingBottom: grid.g24,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 20,
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
    paddingHorizontal: grid.g24,
    textAlign: 'center',
  },
  titleRow: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
