import { TPatientData } from '@covid/core/patient/PatientData';
import { TRootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import Screen from '@tracer/components/atoms/Screen';
import ScreenFooter from '@tracer/components/molecules/Screen/footer';
import ScreenStandardHeader from '@tracer/components/templates/ScreenHeaders/standard';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { makeSymptomService, makeUsualSelfService } from '../../api';
import UsualSelfActionCardButtonGroup from '../../assessment-flow/components/0-usual-self-action-card-button-group';
import LogOtherSymptoms from '../../assessment-flow/components/4-log-other-symptom';
import LogSymptomScreenBody from '../../assessment-flow/components/4-log-symptoms';
import ModalEmojiExplained from '../../assessment-flow/modals/EmojiExplained';
import ModalFrequencyOfSymptoms from '../../assessment-flow/modals/FrequencyOfSymptoms';
import { TUsualSelfFrequentSymptom } from '../../assessment-flow/types';
import ModalUsualSelfSetup from '../modals/UsualSelfSetup';
import ModalUsualSelfSetupError from '../modals/UsualSelfSetupCheck';
import { SYMPTOM_FREQUENCY_LABELS, SYMPTOM_SEVERITY_LABELS, TSymptomCategory } from '../types';

const USUAL_SELF_SYMPTOM_CATEGORY = 'misc';
const GO_BACK = -1;
const GO_FORWARD = 1;

type TCurrentCategory = {
  currentIndex: number;
  currentName: string;
};

export default function UsualSelfFormFlowScreen() {
  const [symptomCategory, setSymptomCategory] = useState<TSymptomCategory>();
  const [symptomCategories, setSymptomCategories] = useState<TSymptomCategory[]>([]);
  const [currentCategory, setCurrentCategory] = useState<TCurrentCategory>();
  const [otherSymptomLogScreen, setOtherSymptomLogScreen] = useState<boolean>(false);
  const [showFrequencyModal, setShowFrequencyModal] = useState<boolean>(false);
  const [showImpactOnLifeModal, setShowImpactOnLifeModal] = useState<boolean>(false);
  const currentPatient = useSelector<TRootState, TPatientData>((state) => state.user.currentPatient);
  const symptomService = makeSymptomService();
  const usualSelfService = makeUsualSelfService();
  const [initValues, setInitValues] = useState<{ [name: string]: any }>();
  const [showUsualSetupModal, setShowUsualSetupModal] = useState<boolean>(false);
  const [showUsualSetupErrorModal, setShowUsualSetupErrorModal] = useState<boolean | undefined>(undefined);

  const onSubmit = async (submitted: any) => {
    const symptoms: { [name: string]: any } = Object.keys(submitted).reduce(
      (prev, categoryName) => ({ ...prev, ...submitted[categoryName] }),
      {},
    );
    const usualSelf: TUsualSelfFrequentSymptom[] = Object.keys(symptoms)
      .filter((symptomName: string) => symptoms[symptomName].state)
      .flatMap((symptomName: string) => {
        const symptom = symptoms[symptomName];
        if (symptom.subSymptoms)
          return Object.keys(symptom.subSymptoms)
            .filter((subSymptomName: string) => symptom.subSymptoms[subSymptomName].state)
            .map((subSymptomName: string) => {
              return {
                frequency: SYMPTOM_FREQUENCY_LABELS[symptom.frequency].label.toLowerCase(),
                severity: SYMPTOM_SEVERITY_LABELS[symptom.severity].label.toLowerCase(),
                symptom: subSymptomName,
              };
            });
        if (symptom.options !== undefined && symptom.options.value)
          return [
            {
              frequency: SYMPTOM_FREQUENCY_LABELS[symptom.frequency].label.toLowerCase(),
              severity: SYMPTOM_SEVERITY_LABELS[symptom.severity].label.toLowerCase(),
              symptom: symptom.options.value,
            },
          ];
        return [
          {
            frequency: SYMPTOM_FREQUENCY_LABELS[symptom.frequency].label.toLowerCase(),
            severity: SYMPTOM_SEVERITY_LABELS[symptom.severity].label.toLowerCase(),
            symptom: symptomName,
          },
        ];
      });

    const newUsualSelf = {
      other_symptoms: [
        {
          description: submitted.other_symptoms.description,
          frequency: SYMPTOM_FREQUENCY_LABELS[submitted.other_symptoms.frequency].label.toLowerCase(),
          severity: SYMPTOM_FREQUENCY_LABELS[submitted.other_symptoms.frequency].label.toLowerCase(),
        },
      ],
      patient: currentPatient.patientId,
      reasons: [],
      symptoms: usualSelf,
      usual_self: true,
    };

    usualSelfService
      .createUsualSelf(newUsualSelf)
      .then((resp) => {
        // eslint-disable-next-line no-console
        console.log('successful', resp);
        setShowUsualSetupModal(true);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('could not log usual self', error);
        setShowUsualSetupErrorModal(true);
      });
  };

  const onToggleFrequencyModal = () => setShowFrequencyModal(true);
  const onToggleImpactOnLifeModal = () => setShowImpactOnLifeModal(true);

  /* direction: -1 is back and 1 is forwards */
  const onNavigate = (direction: number, callback?: Function) => {
    const index = currentCategory?.currentIndex;

    if (direction === -1 && (index === undefined || index === 0)) {
      NavigatorService.goBack();
      return;
    }

    if (direction === GO_FORWARD && index !== undefined && index === symptomCategories.length - 1) {
      if (!otherSymptomLogScreen) {
        setOtherSymptomLogScreen(true);
      } else if (callback) callback();
      return;
    }

    if (direction === GO_BACK && otherSymptomLogScreen) {
      setOtherSymptomLogScreen(false);
      return;
    }

    if (direction === GO_BACK && index !== undefined && index > 0) {
      const nextIndex = index - 1;
      symptomService
        .getSymptomByCategory(symptomCategories[nextIndex].name)
        .then((data: TSymptomCategory) => {
          setSymptomCategory(data);
          setCurrentCategory({ currentIndex: nextIndex, currentName: data.name });
        })
        .catch((error) => {
          console.log(`could not get symptom for ${symptomCategories[nextIndex].name}: ${error}`);
        });
    }

    if (direction === GO_FORWARD && index !== undefined && index < symptomCategories.length) {
      const nextIndex = index + 1;
      symptomService
        .getSymptomByCategory(symptomCategories[nextIndex].name)
        .then((data: TSymptomCategory) => {
          setSymptomCategory(data);
          setCurrentCategory({ currentIndex: nextIndex, currentName: data.name });
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(`could not get symptom for ${symptomCategories[nextIndex].name}: ${error}`);
        });
    }
  };

  useEffect(() => {
    symptomService
      .getSymptomAreas(false)
      .then((areas: TSymptomCategory[]) => {
        setSymptomCategories(areas);
        setCurrentCategory({ currentIndex: 0, currentName: USUAL_SELF_SYMPTOM_CATEGORY });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`could not get symptom areas: ${error}`);
      });
    symptomService
      .getSymptomByCategory(USUAL_SELF_SYMPTOM_CATEGORY)
      .then((data: TSymptomCategory) => {
        setSymptomCategory(data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`could not get symptom for ${USUAL_SELF_SYMPTOM_CATEGORY}: ${error}`);
      });

    const newInitValues: { [name: string]: any } = symptomCategories.reduce(
      (prev, category) => ({
        ...prev,
        ...{
          [category.name]: {
            state: false,
          },
        },
      }),
      {},
    );
    const initSymptoms: { [name: string]: any } = symptomCategory
      ? symptomCategory.symptoms.reduce(
          (prev, symptom) => ({
            ...prev,
            ...{ [symptom.name]: {} },
          }),
          {},
        )
      : {};

    if (currentCategory) newInitValues[currentCategory.currentName].symptoms = initSymptoms;

    setInitValues(newInitValues);
  }, []);

  const onStartNewAssessment = () => {
    setShowUsualSetupModal(false);
    NavigatorService.navigate('AssessmentPage1ShowUsualSelf');
  };

  const onFinishUsualSelfSetup = () => {
    setShowUsualSetupModal(false);
    NavigatorService.navigate('Dashboard');
  };

  return (
    <Screen isInsideTabBar>
      {showUsualSetupErrorModal ? (
        <ModalUsualSelfSetupError onClose={() => setShowFrequencyModal(false)} visible={showUsualSetupModal} />
      ) : null}
      {showUsualSetupModal ? (
        <ModalUsualSelfSetup
          onClose={() => onFinishUsualSelfSetup()}
          onNewAssessment={() => onStartNewAssessment()}
          visible={showUsualSetupModal}
        />
      ) : null}
      {showFrequencyModal ? (
        <ModalFrequencyOfSymptoms onClose={() => setShowFrequencyModal(false)} visible={showFrequencyModal} />
      ) : null}
      {showImpactOnLifeModal ? (
        <ModalEmojiExplained
          onClose={() => setShowImpactOnLifeModal(false)}
          title={i18n.t('usual-self.modals.2-emoji-explained-title')}
          visible={showImpactOnLifeModal}
        />
      ) : null}
      {currentCategory ? (
        <ScreenStandardHeader
          onGoBack={() => onNavigate(-1)}
          style={{ backgroundColor: colors.white }}
          text={i18n.t('usual-self.setup.header')}
        />
      ) : null}
      {initValues ? (
        <Formik initialValues={initValues} onSubmit={(values: any) => onSubmit(values)}>
          {({ handleSubmit, setFieldValue, values }) => (
            <>
              <ScrollView>
                {otherSymptomLogScreen ? (
                  <Column style={{ flexGrow: 1 }}>
                    <LogOtherSymptoms formID="other_symptoms" handleChange={setFieldValue} question="Optional" />
                  </Column>
                ) : (
                  <LogSymptomScreenBody
                    isUsualSelf
                    onToggleFrequencyModal={onToggleFrequencyModal}
                    onToggleImpactOnLifeModal={onToggleImpactOnLifeModal}
                    setFieldValue={setFieldValue}
                    symptomCategory={symptomCategory}
                    values={values}
                  />
                )}
              </ScrollView>
              <ScreenFooter style={baseStyle.footer}>
                <Row style={{ paddingVertical: grid.g24 }}>
                  <Column style={{ flexGrow: 1, justifyContent: 'flex-start' }}>
                    {/* eslint-disable-next-line no-restricted-syntax */}
                    {currentCategory?.currentIndex !== undefined && (
                      <UsualSelfActionCardButtonGroup
                        style={[baseStyle.cardButtonGroup]}
                        topButton={{
                          onPress: () => onNavigate(1, handleSubmit),
                          text: i18n.t('usual-self.assessment-flow.4-log-new-symptom-flow-cta-1'),
                        }}
                      />
                    )}
                  </Column>
                </Row>
              </ScreenFooter>
            </>
          )}
        </Formik>
      ) : null}
    </Screen>
  );
}

const baseStyle = StyleSheet.create({
  cardButtonGroup: {
    backgroundColor: colors.white,
    paddingTop: grid.g16,
  },
  footer: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 30,
  },
  screenBody: {
    paddingHorizontal: grid.g24,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 26,
    marginBottom: grid.g24,
    textAlign: 'left',
  },
  titleHighlight: {
    color: colors.accent,
  },
  titleRow: {
    justifyContent: 'flex-start',
  },
});
