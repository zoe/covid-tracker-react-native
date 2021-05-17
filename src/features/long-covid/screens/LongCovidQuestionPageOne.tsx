import {
  BasicPage,
  CheckboxItem,
  CheckboxList,
  DropdownField,
  ErrorText,
  HeaderText,
  RegularText,
} from '@covid/components';
import { GenericTextField } from '@covid/components/GenericTextField';
import { ScreenName } from '@covid/core/Coordinator';
import { isSECountry } from '@covid/core/localisation/LocalisationService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { longCovidApiClient } from '@covid/Services';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import { Formik, FormikProps } from 'formik';
import { Form, Textarea } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { LongCovidQuestionPageOneData } from '../types';
import {
  checkBoxQuestions4To17,
  defaultState,
  dropdownItemsQ1,
  dropdownItemsQ2,
  dropdownItemsQ3,
  dropdownItemsQ18,
  dropdownItemsQ19,
  dropdownItemsSymptomsChange,
  symptomChangesKeyList,
  validations,
} from './consts.questions';

interface IProps {
  route: RouteProp<ScreenParamList, 'LongCovidStart'>;
}

export default function LongCovidQuestionPageOneScreen({ route }: IProps) {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const { patientData } = route.params;
  const handleSubmit = async (formData: LongCovidQuestionPageOneData) => {
    if (isSubmitting) {
      return;
    }
    setSubmitting(true);
    longCovidApiClient.add(patientData.patientId, formData).then((result) => {
      const thankYouScreen: ScreenName = isSECountry() ? 'ThankYouSE' : 'ThankYouUK';
      NavigatorService.reset([{ name: 'Dashboard' }, { name: thankYouScreen }], 1);
    });
  };

  const renderFormCheckboxes = (props: FormikProps<LongCovidQuestionPageOneData>) => (
    <View style={{ marginVertical: 16 }}>
      <CheckboxList>
        {checkBoxQuestions4To17.map((key: string, index: number) => (
          <CheckboxItem
            onChange={(value: boolean) => props.setFieldValue(key, !props.values[key])}
            value={props.values[key]}
          >
            {i18n.t(`long-covid.q${index + 4}`)}
          </CheckboxItem>
        ))}
        {props.values.other ? <GenericTextField formikProps={props} name="other" /> : null}
      </CheckboxList>
    </View>
  );

  const renderBulletLine = (text: string) => (
    <View style={{ flexDirection: 'row', paddingRight: 16, paddingTop: 16 }}>
      <RegularText style={styles.bullet}>{'\u2B24'}</RegularText>
      <RegularText style={{ flex: 1, paddingLeft: 16 }}>{text}</RegularText>
    </View>
  );

  const renderExtendedForm = (props: FormikProps<LongCovidQuestionPageOneData>) =>
    props.values.had_covid && props.values.had_covid.startsWith('YES') ? (
      <View>
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
          error={props.touched.duration && props.errors.duration}
          items={dropdownItemsQ2}
          onValueChange={props.handleChange('duration')}
          selectedValue={props.values.duration}
        />
        <View style={styles.hr} />
        <HeaderText>{i18n.t('long-covid.q3')}</HeaderText>
        <DropdownField
          error={props.touched.restriction && props.errors.restriction}
          items={dropdownItemsQ3}
          onValueChange={props.handleChange('restriction')}
          selectedValue={props.values.restriction}
        />
        <View style={styles.hr} />
        <HeaderText>{i18n.t('long-covid.q4-header')}</HeaderText>
        <View style={{ ...styles.infoBox, marginBottom: 24 }}>
          <RegularText>{i18n.t('long-covid.q4-info-1')}</RegularText>
          <View style={{ marginTop: 18 }}>
            <RegularText>{i18n.t('long-covid.q4-info-2')}</RegularText>
          </View>
        </View>
        <RegularText>{i18n.t('long-covid.q4-info-3')}</RegularText>
        {renderFormCheckboxes(props)}
        <View style={styles.hr} />
        {/* Have you had at least one COVID-19 vaccine done? */}
        <HeaderText>{i18n.t('long-covid.q18')}</HeaderText>
        <DropdownField
          error={props.touched.at_least_one_vaccine && props.errors.at_least_one_vaccine}
          items={dropdownItemsQ18}
          onValueChange={props.handleChange('at_least_one_vaccine')}
          selectedValue={props.values.at_least_one_vaccine}
        />
        <View style={styles.hr} />
        {/* Did you have ongoing COVID-19 symptoms in the week before your first COVID-19 vaccine injection? */}
        <HeaderText>{i18n.t('long-covid.q19')}</HeaderText>
        <DropdownField
          error={
            props.touched.ongoing_symptom_week_before_first_vaccine &&
            props.errors.ongoing_symptom_week_before_first_vaccine
          }
          items={dropdownItemsQ19}
          onValueChange={props.handleChange('ongoing_symptom_week_before_first_vaccine')}
          selectedValue={props.values.ongoing_symptom_week_before_first_vaccine}
        />
        <View style={styles.hr} />
        {/* Did your symptoms change 2 weeks (or more) after your first COVID-19 vaccine injection? */}
        <HeaderText>{i18n.t('long-covid.q20')}</HeaderText>
        <DropdownField
          error={
            props.touched.symptom_change_2_weeks_after_first_vaccine &&
            props.errors.symptom_change_2_weeks_after_first_vaccine
          }
          items={dropdownItemsQ19}
          onValueChange={props.handleChange('symptom_change_2_weeks_after_first_vaccine')}
          selectedValue={props.values.symptom_change_2_weeks_after_first_vaccine}
        />
        <View style={styles.hr} />
        {/* Have your symptoms changed in the week after your vaccination (excluding the first 2 days)? */}
        <HeaderText>{i18n.t('long-covid.q21')}</HeaderText>
        {symptomChangesKeyList.map((key: string) => (
          <DropdownField
            error={props.touched[key] && props.errors[key]}
            items={dropdownItemsSymptomsChange}
            label={i18n.t(`long-covid.q21-${key}`)}
            onValueChange={props.handleChange(key)}
            selectedValue={props.values[key]}
          />
        ))}
        <View style={styles.hr} />
        {/* Do you have anything else to share regarding the evolution of your COVID-19 symptoms? */}
        <HeaderText style={{ marginBottom: 16 }}>{i18n.t('long-covid.comments')}</HeaderText>
        <Textarea
          bordered
          onChangeText={props.handleChange('symptom_change_comments')}
          placeholder={i18n.t('placeholder-optional-question')}
          rowSpan={5}
          style={styles.textarea}
          underline={false}
          value={props.values.symptom_change_comments}
        />
      </View>
    ) : null;

  return (
    <Formik
      initialValues={{
        ...LongCovidQuestionPageOneScreen.initialFormValues(),
      }}
      onSubmit={(values: LongCovidQuestionPageOneData) => handleSubmit(values)}
      style={{ margin: 16 }}
      validationSchema={LongCovidQuestionPageOneScreen.schema}
    >
      {(props: FormikProps<LongCovidQuestionPageOneData>) => {
        return (
          <BasicPage
            withGutter
            active={props.values.had_covid !== null && Object.keys(props.errors).length < 1}
            footerTitle="Next"
            onPress={() => handleSubmit(props.values)}
          >
            <HeaderText>{i18n.t('long-covid.q1')}</HeaderText>
            <Form style={{ flexGrow: 1 }}>
              <DropdownField
                error={props.touched.had_covid && props.errors.had_covid}
                items={dropdownItemsQ1}
                label={i18n.t('long-covid.q1')}
                onValueChange={props.handleChange('had_covid')}
                selectedValue={props.values.had_covid}
              />
              {renderExtendedForm(props)}
              {Object.keys(props.errors).map((error) => (
                <ErrorText>ERROR: {props.errors[error]}</ErrorText>
              ))}
            </Form>
          </BasicPage>
        );
      }}
    </Formik>
  );
}

LongCovidQuestionPageOneScreen.initialFormValues = (): LongCovidQuestionPageOneData => defaultState;

LongCovidQuestionPageOneScreen.schema = () => validations;

const styles = StyleSheet.create({
  bullet: {
    fontSize: 4,
  },
  hr: {
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    marginBottom: 40,
    marginTop: 16,
  },
  infoBox: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: 16,
    padding: 16,
    textAlign: 'left',
  },
  textarea: {
    backgroundColor: '#EEEEEF',
    borderRadius: 8,
    paddingVertical: 32,
  },
});
