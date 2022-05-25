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
import FormCheckboxQuestion, {
  IFormCheckboxItemProps,
} from '@tracer/components/molecules/Form/questions/multiCheckbox';
import ScreenBody from '@tracer/components/molecules/Screen/body';
import ScreenFooter from '@tracer/components/molecules/Screen/footer';
import ScreenStandardHeader from '@tracer/components/templates/ScreenHeaders/standard';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { makeSymptomService } from '../../api';
import UsualSelfActionCardButtonGroup from '../components/0-usual-self-action-card-button-group';
import {
  svgSymptomCategoryIconMap,
  TFormSymptomCategory,
  TNewSymptomLocationFormInitValues,
  TSymptomCategory,
} from '../types';

const makeCheckBoxItems = (areas: TSymptomCategory[]): IFormCheckboxItemProps[] => {
  return areas
    .map((area, index) => ({
      icon: svgSymptomCategoryIconMap[index],
      id: area.name,
      label: area.display_name,
      selected: false,
    }))
    .concat({
      icon: null,
      id: 'other',
      label: 'Other',
      selected: false,
    });
};

interface AssessmentPage3LogNewSymptomProps {
  navigation: StackNavigationProp<TScreenParamList, 'AssessmentPage3LogNewSymptom'>;
  route: RouteProp<TScreenParamList, 'AssessmentPage3LogNewSymptom'>;
}

export default function AssessmentPage3LogNewSymptom({ route }: AssessmentPage3LogNewSymptomProps) {
  const [symptomCategories, setSymptomCategories] = useState<TSymptomCategory[]>([]);
  const symptomService = makeSymptomService();

  const onNewLogSymptomFlowNext = (values: TNewSymptomLocationFormInitValues) => {
    const submitted: TFormSymptomCategory = values.symptom_locations;
    const selectedLocations: string[] = Object.keys(submitted).filter((id: string) => submitted[id].state);
    let categories: TSymptomCategory[] = symptomCategories.filter((category) =>
      selectedLocations.includes(category.name),
    );
    // TODO: Make this logic cleaner to better account for "other"
    if (selectedLocations.includes('other')) {
      categories = categories.concat({
        display_name: 'Other',
        id: -1,
        name: 'other',
      });
    }
    NavigatorService.navigate('AssessmentPage4LogNewSymptomFlow', {
      categories,
      usualSelfSymptoms: route.params.usualSelfSymptoms,
    });
  };

  useEffect(() => {
    symptomService
      .getSymptomAreas(false)
      .then((areas: TSymptomCategory[]) => {
        setSymptomCategories(areas);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  const formItems = makeCheckBoxItems(symptomCategories);
  const formInitValues: TNewSymptomLocationFormInitValues = {
    symptom_locations: symptomCategories.reduce((prev, area) => {
      return {
        ...prev,
        ...{
          [area.name]: {
            state: false,
          },
        },
      };
    }, {}),
  };

  return (
    <Screen isInsideTabBar differentEdgeColor={colors.surface.interactive}>
      <ScreenStandardHeader onGoBack={() => NavigatorService.goBack()} />
      <Formik initialValues={formInitValues} onSubmit={onNewLogSymptomFlowNext}>
        {({ handleSubmit, setFieldValue, values }) => {
          return (
            <>
              <ScrollView>
                <ScreenBody style={[baseStyle.body]}>
                  <Column style={{ paddingHorizontal: grid.g32 }}>
                    <Row style={[baseStyle.titleRow]}>
                      <Text style={[baseStyle.title]}>{i18n.t('usual-self.assessment-flow.3-title')}</Text>
                    </Row>
                    <Row style={[baseStyle.subTitleRow]}>
                      <Text style={[baseStyle.subTitle]}>{i18n.t('usual-self.assessment-flow.3-info-label')}</Text>
                    </Row>
                    <FormCheckboxQuestion
                      hideInfo
                      handleChange={setFieldValue}
                      items={formItems}
                      key="input-form-checkbox"
                      name="symptom_locations"
                    />
                  </Column>
                </ScreenBody>
              </ScrollView>
              <ScreenFooter>
                <Row style={[baseStyle.footer]}>
                  <Column style={{ flexGrow: 1, justifyContent: 'flex-start' }}>
                    <UsualSelfActionCardButtonGroup
                      btnGroupStyle={[baseStyle.cardButtonGroup]}
                      topButton={{
                        disabled:
                          Object.keys(values.symptom_locations).filter(
                            (id: string) => values.symptom_locations[id].state,
                          ).length === 0,
                        onPress: handleSubmit,
                        text: i18n.t('usual-self.assessment-flow.3-action-card-cta-1'),
                      }}
                    />
                  </Column>
                </Row>
              </ScreenFooter>
            </>
          );
        }}
      </Formik>
    </Screen>
  );
}

const baseStyle = StyleSheet.create({
  body: {
    backgroundColor: colors.surface.interactive,
  },
  cardButtonGroup: {
    backgroundColor: colors.white,
    paddingVertical: grid.g16,
  },
  footer: {
    backgroundColor: colors.white,
    paddingBottom: grid.g24,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 24,
    textAlign: 'left',
  },
  subTitleRow: {
    marginBottom: grid.g24,
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
