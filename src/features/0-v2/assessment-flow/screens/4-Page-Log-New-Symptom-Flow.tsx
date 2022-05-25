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
import ScreenFooter from '@tracer/components/molecules/Screen/footer';
import ScreenFlow from '@tracer/components/organisms/Screen/flow';
import ScreenStandardHeader from '@tracer/components/templates/ScreenHeaders/standard';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { makeSymptomService } from '../../api';
import { TSubSymptom, TSymptom, TSymptomCategory } from '../../usual-self/types';
import UsualSelfActionCardButtonGroup from '../components/0-usual-self-action-card-button-group';
import LogOtherSymptomsFromAssessmentFlow from '../components/4-log-other-symptom-from-assessment-flow';
import LogSymptomScreenBody from '../components/4-log-symptoms';

interface ILogNewSymptomFlowProps {
  navigation: StackNavigationProp<TScreenParamList, 'AssessmentPage4LogNewSymptomFlow'>;
  route: RouteProp<TScreenParamList, 'AssessmentPage4LogNewSymptomFlow'>;
}

export default function AssessmentPage4LogNewSymptomFlow({ route }: ILogNewSymptomFlowProps) {
  const symptomService = makeSymptomService();
  const [currentSymptomCategoryIndex, setCurrentSymptomCategoryIndex] = useState<number>(0);
  const [symptomCategoryDetails, setSymptomCategoryDetails] = useState<TSymptomCategory>();

  const onDisabled = (values: any): boolean => {
    let result = false;
    const otherSymptomPage = route.params.categories[currentSymptomCategoryIndex].name === 'other';
    const otherSymptomInput = values?.other_symptoms;
    if (otherSymptomPage && otherSymptomInput && values.other_symptoms.length > 20) {
      result = true;
    }
    return result;
  };

  const onNext = (callback: Function): void => {
    if (currentSymptomCategoryIndex + 1 < route.params.categories.length) {
      setCurrentSymptomCategoryIndex(currentSymptomCategoryIndex + 1);
      return;
    }

    callback();
  };

  const onSubmit = (submitted: any) => {
    const symptoms: { [name: string]: any } = Object.keys(submitted).reduce((prev, categoryName) => {
      if (categoryName === 'other_symptoms') {
        return { ...prev, other_symptoms: { display_name: submitted[categoryName], state: true } };
      }
      return { ...prev, ...submitted[categoryName] };
    }, {});

    const newSymptoms = Object.keys(symptoms)
      .filter((symptomName: string) => symptomName !== 'other_symptoms' && symptoms[symptomName].state)
      .flatMap((symptomName: string) => {
        const symptom = symptoms[symptomName];
        if (symptom.subSymptoms)
          return Object.keys(symptom.subSymptoms)
            .filter((subSymptomName: string) => symptom.subSymptoms[subSymptomName].state)
            .map((subSymptomName: string) => {
              const subSymptom = symptom.subSymptoms[subSymptomName];
              return {
                display_name: subSymptom.display,
                frequency: '',
                severity: null,
                symptom: subSymptomName,
              };
            });
        if (symptom.options !== undefined && symptom.options.value)
          return [
            {
              display_name: symptom.options.display,
              frequency: '',
              severity: null,
              symptom: symptom.options.value,
            },
          ];
        return [
          {
            display_name: symptom.display,
            frequency: '',
            severity: null,
            symptom: symptomName,
          },
        ];
      });

    const otherSymptom = symptoms.other_symptoms;
    const newOtherSymptoms = otherSymptom
      ? [
          {
            description: otherSymptom.display_name,
            display_name: otherSymptom.display_name,
            frequency: '',
            severity: null,
          },
        ]
      : undefined;

    NavigatorService.navigate('AssessmentPage2UpdateUsualSelf', {
      newOtherSymptoms,
      newSymptoms,
    });
  };

  const onBack = (): void => {
    if (currentSymptomCategoryIndex > 0) {
      setCurrentSymptomCategoryIndex(currentSymptomCategoryIndex - 1);
    }
    if (currentSymptomCategoryIndex === 0) {
      NavigatorService.goBack();
    }
  };

  useEffect(() => {
    if (route.params.categories.length > 0 && route.params.categories[currentSymptomCategoryIndex].name !== 'other') {
      const category = route.params.categories[currentSymptomCategoryIndex];
      const usualSelfSymptoms = route.params.usualSelfSymptoms;
      const usualSelfSymptomNames = usualSelfSymptoms.map((symptom) => symptom.symptom);

      symptomService
        .getSymptomByCategory(category.name)
        .then((categorySymptoms) => {
          const symptoms: Array<TSymptom> = categorySymptoms.symptoms.reduce(
            (symptomArray: Array<TSymptom>, symptom: TSymptom) => {
              if (!usualSelfSymptomNames.includes(symptom.name)) {
                if (symptom.symptoms !== undefined && symptom.symptoms.length > 0) {
                  const subSymptoms: TSubSymptom[] = symptom.symptoms.filter(
                    (subSymptom: TSubSymptom) => !usualSelfSymptomNames.includes(subSymptom.name),
                  );
                  symptom.symptoms = subSymptoms;
                }

                if (!usualSelfSymptomNames.includes(symptom.name)) {
                  return symptomArray.concat(symptom);
                }
              }
              return symptomArray;
            },
            [],
          );

          categorySymptoms.symptoms = symptoms;
          setSymptomCategoryDetails(categorySymptoms);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }, [currentSymptomCategoryIndex]);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const currentSymptomCategory = route.params.categories[currentSymptomCategoryIndex];
  const formInitValues = symptomCategoryDetails?.symptoms
    ? {
        [currentSymptomCategory.name]: symptomCategoryDetails.symptoms.reduce(
          (prev, symptom) => ({
            ...prev,
            ...{
              [symptom.name]: {
                state: false,
              },
            },
          }),
          {},
        ),
      }
    : {};

  return (
    <ScreenFlow>
      <Screen isInsideTabBar style={[baseStyle.view]}>
        <ScreenStandardHeader onGoBack={() => onBack()} />
        <Formik initialValues={formInitValues} onSubmit={onSubmit}>
          {({ handleSubmit, setFieldValue, values }) => (
            <>
              <ScrollView>
                {currentSymptomCategory &&
                currentSymptomCategory !== undefined &&
                currentSymptomCategory.name === 'other' ? (
                  <LogOtherSymptomsFromAssessmentFlow
                    handleChange={setFieldValue}
                    name="other_symptoms"
                    question="Optional"
                  />
                ) : (
                  <LogSymptomScreenBody
                    setFieldValue={setFieldValue}
                    symptomCategory={symptomCategoryDetails}
                    values={values}
                  />
                )}
              </ScrollView>
              <ScreenFooter>
                <Row style={[baseStyle.footerRow]}>
                  <Column style={{ flexGrow: 1, justifyContent: 'flex-start' }}>
                    <UsualSelfActionCardButtonGroup
                      btnGroupStyle={[baseStyle.cardButtonGroup]}
                      topButton={{
                        disabled: onDisabled(values),
                        onPress: () => onNext(handleSubmit),
                        text: i18n.t('usual-self.assessment-flow.4-log-new-symptom-flow-cta-1'),
                      }}
                    />
                  </Column>
                </Row>
              </ScreenFooter>
            </>
          )}
        </Formik>
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
  footerRow: {
    backgroundColor: colors.white,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  view: {
    backgroundColor: colors.surface.interactive,
  },
});
