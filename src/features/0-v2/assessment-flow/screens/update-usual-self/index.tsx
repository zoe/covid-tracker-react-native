import { TRootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
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
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { makeAssessmentService, makeSymptomService } from '../../../api';
import UsualSelfActionCardButtonGroup from '../../components/0-usual-self-action-card-button-group';
import { makeNoUsualSelfFrequentSymptoms } from '../../components/1-usual-self-symptoms';
import AssessmentBubbleSymptoms from '../../components/2-assessment-bubble-symptoms';
import AssessmentFlowPageCardInfoLabel from '../../components/2-usual-self-label';
import AssessmentFlowEditUsualSymptom from '../../components/2-usual-self-symptoms-edit';
import ModalFeelDifferent from '../../modals/FeelDifferent';
import ModalSeverityNotSelected from '../../modals/SeverityNotSelected';
import {
  TBubbleSymptoms,
  TFrequentBubbleSymptom,
  TUsualSelfFrequentOtherSymptom,
  TUsualSelfFrequentSymptom,
  TUsualSelfSymptomSeverity,
} from '../../types';
import { baseStyle } from './styles';
import { AssessmentFlowPage2ScreenProps } from './types';
import { isFormValid, makeReport } from './utils';

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

  const isReadyToSubmit = isFormValid(usualSymptoms, newAdditionalSymptoms, newAdditionalOtherSymptoms);

  const renderUsualSymptoms = () => {
    if (usualSymptoms && usualSymptoms !== undefined)
      return usualSymptoms.map((props: TUsualSelfFrequentSymptom, index: number) => (
        <AssessmentFlowEditUsualSymptom
          display_name={props.display_name}
          key={`edit-symptom-${index + 1}`}
          onToggleSymptom={onToggleSymptom}
          onUpdateSymptomSeverity={onUpdateSymptomSeverity}
          severity={props.severity}
          symptom={props.symptom}
        />
      ));
    return null;
  };

  const renderUsualOtherSymptoms = () => {
    if (usualOtherSymptoms && usualOtherSymptoms !== undefined)
      return usualOtherSymptoms.map((props: TUsualSelfFrequentOtherSymptom, index: number) => (
        <AssessmentFlowEditUsualSymptom
          display_name={props.description}
          key={`edit-symptom-${index + 1}`}
          onToggleSymptom={onToggleOtherSymptom}
          onUpdateSymptomSeverity={onUpdateOtherSymptomSeverity}
          severity={props.severity}
          symptom={props.description}
        />
      ));
    return null;
  };

  const renderNoReportedSymptoms = () => {
    if (!usualSymptoms || usualSymptoms === undefined || usualSymptoms.length === 0)
      return makeNoUsualSelfFrequentSymptoms();
    return null;
  };

  const renderAdditionalSymptomsTitle = () => {
    if (
      (newAdditionalSymptoms && newAdditionalSymptoms.length > 0) ||
      (newAdditionalOtherSymptoms && newAdditionalOtherSymptoms.length > 0)
    )
      return (
        <Row style={[baseStyle.additionalSymptomHeaderRow]}>
          <Text style={[baseStyle.additionalSymptomHeader]}>
            {i18n.t('usual-self.assessment-flow.2-addition-symptoms')}
          </Text>
        </Row>
      );
    return null;
  };

  const renderNewAdditionalSymptoms = () => {
    if (newAdditionalSymptoms)
      return newAdditionalSymptoms.map(
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
      );
    return null;
  };

  const renderNewAdditionalOtherSymptoms = () => {
    if (newAdditionalOtherSymptoms)
      return newAdditionalOtherSymptoms.map(
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
      );
    return null;
  };

  const renderBubbleSymptoms = () => {
    return (
      <>
        {(newFrequentBubbleSymptoms && newFrequentBubbleSymptoms.length > 0) ||
        (newOtherBubbleSymptoms && newOtherBubbleSymptoms.length > 0) ? (
          <Row style={[baseStyle.dividerRow]}>
            <Divider color={colors.quaternary} width={1} />
          </Row>
        ) : null}
        {newFrequentBubbleSymptoms && newFrequentBubbleSymptoms.length > 0 ? (
          <AssessmentBubbleSymptoms
            bubbleSymptoms={newFrequentBubbleSymptoms}
            onSelectBubble={onAddBubbleSymptom}
            otherBubbleSymptoms={[]}
          />
        ) : null}
        {newOtherBubbleSymptoms && newOtherBubbleSymptoms.length > 0 ? (
          <AssessmentBubbleSymptoms
            otherSymptoms
            bubbleSymptoms={[]}
            onSelectBubble={onAddOtherBubbleSymptom}
            otherBubbleSymptoms={newOtherBubbleSymptoms}
          />
        ) : null}
      </>
    );
  };

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
            {renderUsualSymptoms()}
            {renderUsualOtherSymptoms()}
            {renderNoReportedSymptoms()}
            {renderAdditionalSymptomsTitle()}
            {renderNewAdditionalSymptoms()}
            {renderNewAdditionalOtherSymptoms()}
            {renderBubbleSymptoms()}
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
