import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Radio from '@tracer/components/atoms/Inputs/radio';
import Row from '@tracer/components/atoms/Row';
import Screen from '@tracer/components/atoms/Screen';
import FormCheckboxQuestion, {
  CheckboxInfoLabel,
  IFormCheckboxItemProps,
} from '@tracer/components/molecules/Form/questions/multiCheckbox';
import ScreenBody from '@tracer/components/molecules/Screen/body';
import ScreenFooter from '@tracer/components/molecules/Screen/footer';
import ScreenStandardHeader from '@tracer/components/templates/ScreenHeaders/standard';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { makeAssessmentService, makeSymptomService } from '../../api';
import { TSymptomReason } from '../../usual-self/types';
import UsualSelfActionCardButtonGroup from '../components/0-usual-self-action-card-button-group';

const makeCheckBoxItems = (reasons: TSymptomReason[]): IFormCheckboxItemProps[] => {
  return reasons.map((reason) => ({
    id: reason.name,
    label: reason.display_name,
    selected: false,
  }));
};

interface IAssessmentPage5LogNewSymptomReasonProps {
  navigation: StackNavigationProp<TScreenParamList, 'AssessmentPage5LogNewSymptomReason'>;
  route: RouteProp<TScreenParamList, 'AssessmentPage5LogNewSymptomReason'>;
}

export default function AssessmentPage5LogNewSymptomReason({ route }: IAssessmentPage5LogNewSymptomReasonProps) {
  const [reasons, setReasons] = useState<TSymptomReason[]>();
  const [showReasonOptions, setShowReasonOptions] = useState<boolean>(false);
  const symptomService = makeSymptomService();
  const assessmentService = makeAssessmentService();

  useEffect(() => {
    symptomService
      .getSymptomReasons()
      .then((symptomReasons: TSymptomReason[]) => setReasons(symptomReasons))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  });

  const onSubmit = (submitted: any) => {
    let selectedReasons = [];
    if (submitted.symptom_reasons !== null && submitted.symptom_reasons !== undefined) {
      const symptomReasons = submitted.symptom_reasons;
      selectedReasons = Object.keys(symptomReasons).map((reason) =>
        symptomReasons[reason].state === true ? symptomReasons[reason].display : null,
      );
    }

    const report = { ...route.params.report, ...{ reasons: selectedReasons } };
    assessmentService
      .createNewDailyAssessment(report)
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));

    NavigatorService.navigate('ThankYouUK');
  };

  const initValues = reasons
    ? reasons.reduce(
        (prev, reason) => ({
          ...prev,
          ...{ [reason.name]: false },
        }),
        {},
      )
    : {};

  return (
    <Screen isInsideTabBar differentEdgeColor={colors.surface.interactive}>
      <ScreenStandardHeader onGoBack={() => NavigatorService.goBack()} />
      <Formik initialValues={initValues} onSubmit={(v) => onSubmit(v)}>
        {({ handleSubmit, setFieldValue }) => {
          return (
            <>
              <ScrollView>
                <ScreenBody style={[baseStyle.body]}>
                  <Column style={{ paddingHorizontal: grid.g24 }}>
                    <Row style={[baseStyle.titleRow]}>
                      <Text style={[baseStyle.title]}>
                        {i18n.t('usual-self.assessment-flow.5-new-symptom-reason-title')}
                      </Text>
                    </Row>
                    <Row style={{ flexGrow: 1, marginVertical: grid.g16 }}>
                      <Radio
                        label={i18n.t('usual-self.assessment-flow.5-new-symptom-reason-not-aware')}
                        onSelect={() => setShowReasonOptions(false)}
                        selected={!showReasonOptions}
                      />
                    </Row>
                    <Row>
                      <Radio
                        label={i18n.t('usual-self.assessment-flow.5-new-symptom-reason-aware')}
                        onSelect={() => setShowReasonOptions(true)}
                        selected={showReasonOptions}
                      />
                    </Row>
                    {showReasonOptions ? (
                      <>
                        <Row style={{ flexGrow: 1, marginVertical: grid.g16 }}>
                          <CheckboxInfoLabel />
                        </Row>
                        <FormCheckboxQuestion
                          hideInfo
                          handleChange={setFieldValue}
                          items={makeCheckBoxItems(reasons || [])}
                          key="input-form-checkbox"
                          name="symptom_reasons"
                        />
                      </>
                    ) : null}
                  </Column>
                </ScreenBody>
              </ScrollView>
              <ScreenFooter>
                <Row style={[baseStyle.footer]}>
                  <Column style={{ flexGrow: 1, justifyContent: 'flex-start' }}>
                    <UsualSelfActionCardButtonGroup
                      style={[baseStyle.cardButtonGroup]}
                      topButton={{
                        onPress: handleSubmit,
                        text: i18n.t('usual-self.assessment-flow.5-action-card-cta-1'),
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
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 26,
    textAlign: 'left',
  },
  titleRow: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: grid.g16,
  },
});
