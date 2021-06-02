import InfoCircle from '@assets/icons/InfoCircle';
import {
  BrandedButton,
  CheckboxItem,
  CheckboxList,
  ColourHighlightHeaderTextText,
  DropdownField,
  ErrorText,
  HeaderText,
  RegularText,
} from '@covid/components';
import { GenericTextField } from '@covid/components/GenericTextField';
import {
  homeScreenName,
  thankYouScreenName,
} from '@covid/core/localisation/LocalisationService';
import { ILongCovid } from '@covid/features/long-covid/types';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { longCovidApiClient } from '@covid/Services';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import { Formik, FormikProps } from 'formik';
import { Form, Textarea } from 'native-base';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

import {
  checkboxIndexOffset,
  checkBoxQuestions4To17,
  dropdownItemsQ1,
  dropdownItemsQ2,
  dropdownItemsQ3,
  dropdownItemsQ18,
  dropdownItemsQ19,
  dropdownItemsSymptomsChange,
  longCovidQuestionPageOneDataInitialState,
  symptomChangesKeyList,
  validations,
} from './consts.questions';

interface IProps {
  route: RouteProp<ScreenParamList, 'LongCovidStart'>;
}

const renderBulletLine = (text: string) => (
  <View style={{ flexDirection: 'row', paddingRight: 16, paddingTop: 16 }}>
    <RegularText style={styles.bullet}>{'\u2B24'}</RegularText>
    <RegularText style={{ flex: 1, paddingLeft: 16 }}>{text}</RegularText>
  </View>
);

export default function LongCovidQuestionPageOneScreen({ route }: IProps) {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const { patientData } = route.params;
  const handleSubmit = async (formData: ILongCovid) => {
    if (isSubmitting) {
      return;
    }
    delete formData.other_checkbox;
    setSubmitting(true);
    longCovidApiClient.add(patientData.patientId, formData).then(() => {
      NavigatorService.reset([{ name: homeScreenName() }, { name: thankYouScreenName() }], 1);
    });
  };

  const renderFormCheckboxes = (props: FormikProps<ILongCovid>) => (
    <View style={{ marginVertical: 16 }}>
      <CheckboxList>
        {checkBoxQuestions4To17.map((key: string, index: number) => (
          <View style={{ marginBottom: 16 }}>
            <CheckboxItem
              dark
              onChange={(value: boolean) => props.setFieldValue(key, !props.values[key])}
              value={props.values[key]}
            >
              {i18n.t(`long-covid.q${index + checkboxIndexOffset}`)}
            </CheckboxItem>
          </View>
        ))}
        {props.values.other_checkbox ? <GenericTextField formikProps={props} name="other" /> : null}
      </CheckboxList>
    </View>
  );

  const renderError = (props: FormikProps<ILongCovid>, propertyKey: string) =>
    props.touched[propertyKey] && props.errors[propertyKey] ? (
      <View style={{ marginBottom: 16 }}>
        <ErrorText>{props.errors[propertyKey]}</ErrorText>
      </View>
    ) : null;

  const renderExtendedForm = (props: FormikProps<ILongCovid>) =>
    props.values.had_covid && props.values.had_covid.startsWith('YES') ? (
      <View>
        <View style={styles.hr} />
        <HeaderText>{i18n.t('long-covid.q2')}</HeaderText>
        <View style={styles.infoBox}>
          <RegularText>{i18n.t('long-covid.q2-info-1')}</RegularText>
          {renderBulletLine(i18n.t('long-covid.q2-info-2'))}
          {renderBulletLine(i18n.t('long-covid.q2-info-3'))}
          {renderBulletLine(i18n.t('long-covid.q2-info-4'))}
          {renderBulletLine(i18n.t('long-covid.q2-info-5'))}
        </View>
        <DropdownField
          error={props.touched.duration && props.errors.duration}
          items={dropdownItemsQ2}
          onValueChange={props.handleChange('duration')}
          selectedValue={props.values.duration}
        />
        {renderError(props, 'duration')}

        <View style={styles.hr} />
        <HeaderText>{i18n.t('long-covid.q3')}</HeaderText>
        <DropdownField
          error={props.touched.restriction && props.errors.restriction}
          items={dropdownItemsQ3}
          onValueChange={props.handleChange('restriction')}
          selectedValue={props.values.restriction}
        />
        {renderError(props, 'restriction')}

        <View style={styles.hr} />
        <ColourHighlightHeaderTextText highlightColor={colors.purple} text={i18n.t('long-covid.q4-header')} />
        <View style={{ ...styles.infoBox, marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', paddingRight: 24, paddingTop: 16 }}>
            <View style={{ paddingRight: 12 }}>
              <InfoCircle color={colors.primary} />
            </View>
            <RegularText>{i18n.t('long-covid.q4-info-1')}</RegularText>
          </View>
          <View style={{ marginTop: 16, paddingLeft: 32 }}>
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
        {renderError(props, 'at_least_one_vaccine')}
        {renderExtendedVaccineForm(props)}
    </View>) : null;
    
    const renderExtendedVaccineForm = (props: FormikProps<ILongCovid>) =>
    props.values.at_least_one_vaccine && props.values.at_least_one_vaccine === 'YES' ? (
      <View>

        <View style={styles.hr} />
        {/* Did you have ongoing COVID-19 symptoms in the week before your first COVID-19 vaccine injection? */}
        <ColourHighlightHeaderTextText highlightColor={colors.purple} text={i18n.t('long-covid.q19')} />
        <DropdownField
          error={
            props.touched.ongoing_symptom_week_before_first_vaccine &&
            props.errors.ongoing_symptom_week_before_first_vaccine
          }
          items={dropdownItemsQ19}
          onValueChange={props.handleChange('ongoing_symptom_week_before_first_vaccine')}
          selectedValue={props.values.ongoing_symptom_week_before_first_vaccine}
        />
        {renderError(props, 'ongoing_symptom_week_before_first_vaccine')}

        <View style={styles.hr} />
        {/* Did your symptoms change 2 weeks (or more) after your first COVID-19 vaccine injection? */}
        <ColourHighlightHeaderTextText highlightColor={colors.purple} text={i18n.t('long-covid.q20')} />
        <DropdownField
          error={
            props.touched.symptom_change_2_weeks_after_first_vaccine &&
            props.errors.symptom_change_2_weeks_after_first_vaccine
          }
          items={dropdownItemsSymptomsChange}
          onValueChange={props.handleChange('symptom_change_2_weeks_after_first_vaccine')}
          selectedValue={props.values.symptom_change_2_weeks_after_first_vaccine}
        />
        {renderError(props, 'symptom_change_2_weeks_after_first_vaccine')}

        <View style={styles.hr} />
        {/* Have your symptoms changed in the week after your vaccination (excluding the first 2 days)? */}
        <ColourHighlightHeaderTextText highlightColor={colors.purple} text={i18n.t('long-covid.q21')} />
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
          maxLength={1000}
        />
      </View>
    ) : null;

  return (
    <Formik
      initialValues={{
        ...LongCovidQuestionPageOneScreen.initialFormValues(),
      }}
      onSubmit={(values: ILongCovid) => handleSubmit(values)}
      style={{ padding: 16 }}
      validationSchema={LongCovidQuestionPageOneScreen.schema}
    >
      {(props: FormikProps<ILongCovid>) => {
        return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.rootContainer}>
          <ScrollView>
            <Form style={{ flexGrow: 1 }}>            
            <HeaderText>{i18n.t('long-covid.q1')}</HeaderText>
              <DropdownField
                error={props.touched.had_covid && props.errors.had_covid}
                items={dropdownItemsQ1}
                onValueChange={props.handleChange('had_covid')}
                selectedValue={props.values.had_covid}
              />
              {renderExtendedForm(props)}
              <View style={{ marginVertical: 64 }}><BrandedButton 
                enable={props.values.had_covid !== null && Object.keys(props.errors).length < 1}
                onPress={() => handleSubmit(props.values)}
              >
                <RegularText style={{ color: colors.white }}>{i18n.t('long-covid.finish')}</RegularText>
                </BrandedButton>
              </View>
            </Form>
          </ScrollView>
        </KeyboardAvoidingView>
        );
      }}
    </Formik>
  );
}

LongCovidQuestionPageOneScreen.initialFormValues = (): ILongCovid => longCovidQuestionPageOneDataInitialState;

LongCovidQuestionPageOneScreen.schema = () => validations;

const styles = StyleSheet.create({
  bullet: {
    fontSize: 4,
  },
  hr: {
    borderBottomColor: colors.hrColor,
    borderBottomWidth: 1,
    marginBottom: 40,
    marginTop: 16,
  },
  infoBox: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: 16,
    padding: 16,
    paddingBottom: 24,
    textAlign: 'left',
  },
  rootContainer: {
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 32,
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  textarea: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    paddingVertical: 40,
  },
});
