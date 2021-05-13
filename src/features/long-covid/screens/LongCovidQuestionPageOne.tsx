import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { BasicPage, Spacer, RegularText, HeaderText, DropdownField, CheckboxList, CheckboxItem } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import { Formik, FormikProps } from 'formik';
import { Form, Textarea } from 'native-base';
import * as Yup from 'yup';
import { LongCovidQuestionPageOneData } from '../types';
import { defaultState, dropdownItemsQ1, dropdownItemsQ2, dropdownItemsQ3, checkBoxQuestions4To17, dropdownItemsQ18, dropdownItemsQ19, dropdownItemsSymptomsChange, symtpomChangesKeyList } from './consts.questions';
import { GenericTextField } from '@covid/components/GenericTextField';

LongCovidQuestionPageOneScreen.initialFormValues = (): LongCovidQuestionPageOneData => defaultState;
  
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

  const handleSubmit = (formData: LongCovidQuestionPageOneData) => {
      console.log('handleSubmit!!!');
    setSubmitting(true);
    // assessmentService.saveAssessment(GeneralSymptomsQuestions.createAssessment(formData, hasHayfever));
    // assessmentCoordinator.gotoNextScreen(route.name);
  };

  const renderFormCheckboxes = (props: FormikProps<LongCovidQuestionPageOneData>) => <View style={{ marginVertical: 16 }}>
        <CheckboxList>

        { checkBoxQuestions4To17.map((key: string, index: number) =>  <CheckboxItem onChange={(value: boolean) => 
                props.setFieldValue(key, !props.values[key])
            }
            value={props.values[key]}>
            {i18n.t(`long-covid.q${index + 4}`)}
        </CheckboxItem>) }

        {/* <CheckboxItem onChange={(value: boolean) => 
            props.setFieldValue('problems_thinking_and_communicating', !props.values.problems_thinking_and_communicating)}
            value={props.values.problems_thinking_and_communicating}>
            {i18n.t('long-covid.q4')}
        </CheckboxItem>
        <CheckboxItem onChange={(value: boolean) => 
            props.setFieldValue('mood_changes', !props.values.mood_changes)}
            value={props.values.mood_changes}>
            {i18n.t('long-covid.q5')}
        </CheckboxItem>
        <CheckboxItem onChange={(value: boolean) => 
            props.setFieldValue('poor_sleep', !props.values.poor_sleep)}
            value={props.values.poor_sleep}>
            {i18n.t('long-covid.q6')}
        </CheckboxItem>
        <CheckboxItem onChange={(value: boolean) => 
            props.setFieldValue('body_aches', !props.values.body_aches)}
            value={props.values.body_aches}>
            {i18n.t('long-covid.q7')}
        </CheckboxItem>
        <CheckboxItem onChange={(value: boolean) => 
            props.setFieldValue('muscle_aches', !props.values.muscle_aches)}
            value={props.values.muscle_aches}>
            {i18n.t('long-covid.q8')}
        </CheckboxItem>
        <CheckboxItem onChange={(value: boolean) => 
            props.setFieldValue('skin_rashes', !props.values.skin_rashes)}
            value={props.values.skin_rashes}>
            {i18n.t('long-covid.q9')}
        </CheckboxItem>
        <CheckboxItem onChange={(value: boolean) => 
            props.setFieldValue('bone_or_joint_pain', !props.values.bone_or_joint_pain)}
            value={props.values.bone_or_joint_pain}>
            {i18n.t('long-covid.q10')}
        </CheckboxItem>
        <CheckboxItem onChange={(value: boolean) => 
            props.setFieldValue('headaches', !props.values.headaches)}
            value={props.values.headaches}>
            {i18n.t('long-covid.q11')}
        </CheckboxItem>
        <CheckboxItem onChange={(value: boolean) => 
            props.setFieldValue('light_headed', !props.values.light_headed)}
            value={props.values.light_headed}>
            {i18n.t('long-covid.q12')}
        </CheckboxItem>
        <CheckboxItem onChange={(value: boolean) => 
            props.setFieldValue('altered_taste_or_smell', !props.values.altered_taste_or_smell)}
            value={props.values.altered_taste_or_smell}>
            {i18n.t('long-covid.q13')}
        </CheckboxItem>
        <CheckboxItem onChange={(value: boolean) => 
            props.setFieldValue('breathing_problems', !props.values.breathing_problems)}
            value={props.values.breathing_problems}>
            {i18n.t('long-covid.q14')}
        </CheckboxItem>
        <CheckboxItem onChange={(value: boolean) => 
            props.setFieldValue('heart_problems', !props.values.heart_problems)}
            value={props.values.heart_problems}>
            {i18n.t('long-covid.q15')}
        </CheckboxItem>
        <CheckboxItem onChange={(value: boolean) => 
            props.setFieldValue('abdominal_pain_diarrhoea', !props.values.abdominal_pain_diarrhoea)}
            value={props.values.abdominal_pain_diarrhoea}>
            {i18n.t('long-covid.q16')}
        </CheckboxItem>
        <CheckboxItem onChange={(value: boolean) => 
            props.setFieldValue('other', !props.values.other)}
            value={props.values.other ? true : false}>
            {i18n.t('long-covid.q17')}
        </CheckboxItem> */}

        {props.values.other ? (
          <GenericTextField
            formikProps={props}
            //label={i18n.t('race-other-question')}
            name="other"
          />
        ) : null}

        </CheckboxList>
    </View>;

  const renderBulletLine = (text: string) => <View style={{ flexDirection: 'row', paddingTop: 16, paddingRight: 16, }}>
        <RegularText style={styles.bullet}>{'\u2B24'}</RegularText>
        <RegularText style={{flex: 1, paddingLeft: 16}}>{text}</RegularText>
  </View>;

  const renderExtendedForm = (props: FormikProps<LongCovidQuestionPageOneData>) => 
  props.values.had_covid && props.values.had_covid.startsWith('YES') ? (
    <View style={{ margin: 16 }}>
        <View style={styles.hr} />

        <HeaderText>{i18n.t('long-covid.q2')}</HeaderText>
        <View style={styles.infoBox}>
            <RegularText>{i18n.t('long-covid.q2-info-1')}</RegularText>
            {renderBulletLine(i18n.t('long-covid.q2-info-2'))}
            {renderBulletLine(i18n.t('long-covid.q2-info-3'))}
            {renderBulletLine(i18n.t('long-covid.q2-info-4'))}
            {renderBulletLine(i18n.t('long-covid.q2-info-4'))}
        </View>
        <DropdownField
            selectedValue={props.values.duration}
            onValueChange={props.handleChange('duration')}
            error={props.touched.duration && props.errors.duration}
            items={dropdownItemsQ2}
        />
        <View style={styles.hr} />
        
        <HeaderText>{i18n.t('long-covid.q3')}</HeaderText>
        <DropdownField
            selectedValue={props.values.restriction}
            onValueChange={props.handleChange('restriction')}
            error={props.touched.restriction && props.errors.restriction}
            items={dropdownItemsQ3}
        />
        <View style={styles.hr} />

        <HeaderText>{i18n.t('long-covid.q4-header')}</HeaderText>
        <View style={{ ...styles.infoBox, marginBottom: 24}}>
            <RegularText>{i18n.t('long-covid.q4-info-1')}</RegularText>
            <View style={{ marginTop: 18 }}>
                <RegularText>{i18n.t('long-covid.q4-info-2')}</RegularText>
            </View>
        </View>
        <RegularText>{i18n.t('long-covid.q4-info-3')}</RegularText>

        { renderFormCheckboxes(props) }
        <View style={styles.hr} />

        {/* Have you had at least one COVID-19 vaccine done? */}
        <HeaderText>{i18n.t('long-covid.q18')}</HeaderText>
        <DropdownField
            selectedValue={props.values.at_least_one_vaccine}
            onValueChange={props.handleChange('at_least_one_vaccine')}
            error={props.touched.at_least_one_vaccine && props.errors.at_least_one_vaccine}
            items={dropdownItemsQ18}
        />
        <View style={styles.hr} />

        {/* Did you have ongoing COVID-19 symptoms in the week before your first COVID-19 vaccine injection?  */}
        <HeaderText>{i18n.t('long-covid.q19')}</HeaderText>
        <DropdownField
            selectedValue={props.values.ongoing_symptom_week_before_first_vaccine}
            onValueChange={props.handleChange('ongoing_symptom_week_before_first_vaccine')}
            error={props.touched.ongoing_symptom_week_before_first_vaccine && props.errors.ongoing_symptom_week_before_first_vaccine}
            items={dropdownItemsQ19}
        />
        <View style={styles.hr} />

        {/* Did your symptoms change 2 weeks (or more) after your first COVID-19 vaccine injection? */}
        <HeaderText>{i18n.t('long-covid.q20')}</HeaderText>
        <DropdownField
            selectedValue={props.values.ongoing_symptom_week_before_first_vaccine}
            onValueChange={props.handleChange('ongoing_symptom_week_before_first_vaccine')}
            error={props.touched.ongoing_symptom_week_before_first_vaccine && props.errors.ongoing_symptom_week_before_first_vaccine}
            items={dropdownItemsSymptomsChange}
        />
        <View style={styles.hr} />

        {/* Have your symptoms changed in the week after your vaccination (excluding the first 2 days)? */}
        <HeaderText>{i18n.t('long-covid.q21')}</HeaderText>        
        { symtpomChangesKeyList.map((key: string) => <DropdownField
            label={i18n.t(`long-covid.q21-${key}`)}
            selectedValue={props.values[key]}
            onValueChange={props.handleChange(key)}
            error={props.touched[key] && props.errors[key]}
            items={dropdownItemsSymptomsChange}
        />) }
        <View style={styles.hr} />

        {/* Do you have anything else to share regarding the evolution of your COVID-19 symptoms? */}
        <Textarea
            style={styles.textarea}
            rowSpan={5}
            bordered
            placeholder={i18n.t('placeholder-optional-question')}
            value={props.values.symptom_change_comments}
            onChangeText={props.handleChange('symptom_change_comments')}
            underline={false}
        />

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
  textarea: {

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
    marginTop: 16,
  },
  bullet: {
    fontSize: 4,
  },
  hr: {
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    marginTop: 16,
    marginBottom: 40,
  }
});