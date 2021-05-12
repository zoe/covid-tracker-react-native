import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { BasicPage, Spacer, RegularText, HeaderText, DropdownField } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import { Formik, FormikProps } from 'formik';
import { Form } from 'native-base';

import * as Yup from 'yup';
import { LongCovidQuestionPageOneData } from '../types';


LongCovidQuestionPageOneScreen.initialFormValues = (): LongCovidQuestionPageOneData => {
    return {
      had_covid: null,
      duration: null,
      restriction: null,
      at_least_one_vaccine: false,
    };
  };
  
  LongCovidQuestionPageOneScreen.schema = () => {
    return Yup.object().shape({
      fatigueFollowUp: Yup.string().when('fatigue', {
        is: true,
        then: Yup.string().required(i18n.t('describe-symptoms.follow-up-required')),
      }),
    });
  };
  


export default function LongCovidQuestionPageOneScreen() {
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // if (!LongCovidState.completed) {
    //   dispatch(setCompleted(true));
    // }
  });

  const dropdownItemsQ1 = [
    { value: 'YES_TEST', label: i18n.t('long-covid.q1-a1') },
    { value: 'YES_ADVICE', label: i18n.t('long-covid.q1-a2') },
    { value: 'YES_SUSPICION', label: i18n.t('long-covid.q1-a3') },
    { value: 'NO', label: i18n.t('long-covid.q1-a4') },
    { value: 'UNSURE', label: i18n.t('long-covid.q1-a5') },
    { value: 'DECLINE_TO_SAY', label: i18n.t('long-covid.q1-a6') },
  ];
  const dropdownItemsQ2 = [
    { value: 'LESS_THAN_TWO_WEEKS', label: i18n.t('long-covid.q2-a1') },
    { value: '2_TO_3_WEEKS', label: i18n.t('long-covid.q2-a2') },
    { value: '4_TO_12_WEEKS', label: i18n.t('long-covid.q2-a3') },
    { value: 'MORE_THAN_12_WEEKS', label: i18n.t('long-covid.q2-a4') },
  ];
  const dropdownItemsQ3 = [
    { value: 'LESS_THAN_TWO_WEEKS', label: i18n.t('long-covid.q3-a1') },
    { value: '1_TO_3_DAYS', label: i18n.t('long-covid.q3-a2') },
    { value: '4_TO_6_DAYS', label: i18n.t('long-covid.q3-a3') },
    { value: '7_TO_13_DAYS', label: i18n.t('long-covid.q3-a4') },
    { value: '2_TO_3_WEEKS', label: i18n.t('long-covid.q3-a5') },
    { value: '4_TO_12_WEEKS', label: i18n.t('long-covid.q3-a6') },
    { value: 'MORE_THAN_12_WEEKS', label: i18n.t('long-covid.q3-a7') },
  ];
  const checkBoxQuestions4To17 = [];
  const dropdownItemsQ18 = [
    { value: true, label: i18n.t('long-covid.q18-a1') },
    { value: false, label: i18n.t('long-covid.q18-a2') },
  ];

  const handleSubmit = (formData: LongCovidQuestionPageOneData) => {
      console.log('handleSubmit!!!');
    setSubmitting(true);
    // assessmentService.saveAssessment(GeneralSymptomsQuestions.createAssessment(formData, hasHayfever));
    // assessmentCoordinator.gotoNextScreen(route.name);
  };

  const renderFormCheckboxes = (props: FormikProps<LongCovidQuestionPageOneData>) => {}

  const renderExtendedForm = (props: FormikProps<LongCovidQuestionPageOneData>) => 
  props.values.had_covid && props.values.had_covid.startsWith('YES') ? (
    <View>
        <View style={styles.hr} />

        <HeaderText>Q2     {i18n.t('long-covid.q2')}</HeaderText>
        <View style={styles.infoBox}>
            <RegularText>{i18n.t('long-covid.q2-info-1')}</RegularText>
            <RegularText style={styles.bullet}>{'\u2B24'} {i18n.t('long-covid.q2-info-2')}</RegularText>
            <RegularText style={styles.bullet}>{'\u2B24'} {i18n.t('long-covid.q2-info-3')}</RegularText>
            <RegularText style={styles.bullet}>{'\u2B24'} {i18n.t('long-covid.q2-info-4')}</RegularText>
            <RegularText style={styles.bullet}>{'\u2B24'} {i18n.t('long-covid.q2-info-5')}</RegularText>
        </View>

        <DropdownField
            selectedValue={props.values.duration}
            onValueChange={props.handleChange('duration')}
            error={props.touched.duration && props.errors.duration}
            items={dropdownItemsQ2}
        />
        <View style={styles.hr} />
        
        <HeaderText>Q3    {i18n.t('long-covid.q3')}</HeaderText>
        <DropdownField
            selectedValue={props.values.restriction}
            onValueChange={props.handleChange('restriction')}
            error={props.touched.restriction && props.errors.restriction}
            items={dropdownItemsQ3}
        />
        <View style={styles.hr} />

        <HeaderText>{i18n.t('long-covid.q4-header')}</HeaderText>
        <View style={styles.infoBox}>
            <RegularText>{i18n.t('long-covid.q4-info-1')}</RegularText>
            <RegularText style={styles.bullet}>{i18n.t('long-covid.q4-info-2')}</RegularText>
        </View>
        <RegularText style={styles.bullet}>{i18n.t('long-covid.q4-info-3')}</RegularText>

        { renderFormCheckboxes(props) }
        <View style={styles.hr} />

        {/* Have you had at least one COVID-19 vaccine done? */}
        <HeaderText>Q18    {i18n.t('long-covid.q18')}</HeaderText>
        <DropdownField
            selectedValue={props.values.at_least_one_vaccine}
            onValueChange={props.handleChange('at_least_one_vaccine')}
            error={props.touched.at_least_one_vaccine && props.errors.at_least_one_vaccine}
            items={dropdownItemsQ18}
        />
        <View style={styles.hr} />

        {/* Did you have ongoing COVID-19 symptoms in the week before your first COVID-19 vaccine injection?  */}


        {/* Did your symptoms change 2 weeks (or more) after your first COVID-19 vaccine injection? */}

        {/* Have your symptoms changed in the week after your vaccination (excluding the first 2 days)? */}

        {/* Do you have anything else to share regarding the evolution of your COVID-19 symptoms? */}



    </View>
  ): null;

  return (
    <BasicPage footerTitle="Next" onPress={() => NavigatorService.navigate('Dashboard', undefined)} withGutter>
        <HeaderText>{i18n.t('long-covid.q1')}</HeaderText>        
        <Formik
          initialValues={{
            ...LongCovidQuestionPageOneScreen.initialFormValues(),
          }}
          validationSchema={LongCovidQuestionPageOneScreen.schema}
          onSubmit={(values: LongCovidQuestionPageOneData) => handleSubmit(values)}>
          {(props: FormikProps<LongCovidQuestionPageOneData>) => {
            return (
              <Form style={{ flexGrow: 1 }}>
                
                <DropdownField
                    selectedValue={props.values.had_covid}
                    onValueChange={props.handleChange('had_covid')}
                    label={i18n.t('long-covid.q1')}
                    error={props.touched.had_covid && props.errors.had_covid}
                    items={dropdownItemsQ1}
                />

                { renderExtendedForm(props) }

              </Form>
            );
          }}
        </Formik>

      <Spacer space={24} />
    </BasicPage>
  );
}

const styles = StyleSheet.create({
  oneOff: {
    backgroundColor: colors.primary,
  },
  tickContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  tick: {
    alignItems: 'center',
    borderColor: '#C0D904',
    borderRadius: 24,
    borderWidth: 3,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  infoBox: {
    textAlign: 'left',
    borderRadius: 8,
    backgroundColor: colors.white,
    padding: 16,
    marginVertical: 16,
  },
  bullet: {
    padding: 16,
  },
  hr: {
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    marginTop: 16,
    marginBottom: 20,
  }
});