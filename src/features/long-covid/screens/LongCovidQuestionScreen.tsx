import InfoCircle from '@assets/icons/InfoCircle';
import {
  BrandedButton,
  CheckboxItem,
  CheckboxList,
  ColourHighlightHeaderTextText,
  ErrorText,
  HeaderText,
  RegularText,
  TextareaWithCharCount,
} from '@covid/components';
import { Form } from '@covid/components/Form';
import { GenericTextField } from '@covid/components/GenericTextField';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { Screen } from '@covid/components/Screen';
import { homeScreenName, thankYouScreenName } from '@covid/core/localisation/LocalisationService';
import { ILongCovid } from '@covid/features/long-covid/types';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { longCovidApiClient } from '@covid/services';
import { sizes, styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  checkboxIndexOffset,
  longCovidQuestionPageOneDataInitialState,
  symptomChangesKeyList,
  validations,
} from './consts.questions';

interface IProps {
  route: RouteProp<TScreenParamList, 'LongCovidStart'>;
}

const renderBulletLine = (text: string) => (
  <View style={{ flexDirection: 'row', paddingRight: sizes.m, paddingTop: sizes.m }}>
    <RegularText style={styles.bullet}>{'\u2B24'}</RegularText>
    <RegularText style={{ flex: 1, paddingLeft: sizes.m }}>{text}</RegularText>
  </View>
);

export default function LongCovidQuestionScreen({ route }: IProps) {
  const dropdownItemsQ1 = [
    { label: i18n.t('long-covid.q1-a5'), value: 'NO' },
    { label: i18n.t('long-covid.q1-a1'), value: 'YES_TEST' },
    { label: i18n.t('long-covid.q1-a2'), value: 'YES_ADVICE' },
    { label: i18n.t('long-covid.q1-a3'), value: 'YES_SUSPICION' },
    { label: i18n.t('long-covid.q1-a4'), value: 'UNSURE' },
    { label: i18n.t('long-covid.q1-a6'), value: 'DECLINE_TO_SAY' },
  ];

  const dropdownItemsQ2 = [
    { label: i18n.t('long-covid.q2-a1'), value: 'LESS_THAN_TWO_WEEKS' },
    { label: i18n.t('long-covid.q2-a2'), value: '2_TO_3_WEEKS' },
    { label: i18n.t('long-covid.q2-a3'), value: '4_TO_12_WEEKS' },
    { label: i18n.t('long-covid.q2-a4'), value: 'MORE_THAN_12_WEEKS' },
  ];

  const dropdownItemsQ3 = [
    { label: i18n.t('long-covid.q3-a1'), value: 'ALWAYS_FUNCTION_NORMAL' },
    { label: i18n.t('long-covid.q3-a2'), value: '1_TO_3_DAYS' },
    { label: i18n.t('long-covid.q3-a3'), value: '4_TO_6_DAYS' },
    { label: i18n.t('long-covid.q3-a4'), value: '7_TO_13_DAYS' },
    { label: i18n.t('long-covid.q3-a5'), value: '2_TO_3_WEEKS' },
    { label: i18n.t('long-covid.q3-a6'), value: '4_TO_12_WEEKS' },
    { label: i18n.t('long-covid.q3-a7'), value: 'MORE_THAN_12_WEEKS' },
  ];

  const checkBoxQuestions4To17 = [
    'problems_thinking_and_communicating',
    'mood_changes',
    'poor_sleep',
    'body_aches',
    'muscle_aches',
    'skin_rashes',
    'bone_or_joint_pain',
    'headaches',
    'light_headed',
    'altered_taste_or_smell',
    'breathing_problems',
    'heart_problems',
    'abdominal_pain_diarrhoea',
    'other_checkbox',
  ];

  const dropdownItemsQ18 = [
    { label: i18n.t('long-covid.q18-a1'), value: 'YES' },
    { label: i18n.t('long-covid.q18-a2'), value: 'NO' },
  ];

  const dropdownItemsQ19 = [
    { label: i18n.t('long-covid.q19-a1'), value: 'YES' },
    { label: i18n.t('long-covid.q19-a2'), value: 'NO' },
    { label: i18n.t('long-covid.q19-a3'), value: 'UNSURE' },
  ];

  const dropdownItemsSymptomsChange = [
    { label: i18n.t('long-covid.symptoms-change-a1'), value: 'YES_ALL_BETTER' },
    { label: i18n.t('long-covid.symptoms-change-a2'), value: 'YES_SOME_BETTER' },
    { label: i18n.t('long-covid.symptoms-change-a3'), value: 'NO_CHANGE' },
    { label: i18n.t('long-covid.symptoms-change-a4'), value: 'YES_SOME_WORSE' },
    { label: i18n.t('long-covid.symptoms-change-a5'), value: 'YES_ALL_WORSE' },
    { label: i18n.t('long-covid.symptoms-change-a6'), value: 'SOME_IMPROVED' },
    { label: i18n.t('long-covid.symptoms-change-a7'), value: 'NOT_YET_TWO_WEEKS' },
    { label: i18n.t('long-covid.symptoms-change-a8'), value: 'OTHER' },
  ];

  const dropdownItemsSymptomsChangeSeverity = [
    { label: i18n.t('long-covid.symptoms-change-severity-a1'), value: 'COMPLETELY_DISAPPEARED' },
    { label: i18n.t('long-covid.symptoms-change-severity-a2'), value: 'DECREASED' },
    { label: i18n.t('long-covid.symptoms-change-severity-a3'), value: 'NO_CHANGE' },
    { label: i18n.t('long-covid.symptoms-change-severity-a4'), value: 'INCREASED' },
    { label: i18n.t('long-covid.symptoms-change-severity-a5'), value: 'CAME_BACK' },
    { label: i18n.t('long-covid.symptoms-change-severity-a6'), value: 'NOT_APPLICABLE' },
  ];

  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);

  const onSubmit = async (values: ILongCovid) => {
    if (isSubmitting) {
      return;
    }
    delete values.other_checkbox;
    setSubmitting(true);
    longCovidApiClient.add(route.params?.patientData?.patientId, values).then(() => {
      NavigatorService.reset([{ name: homeScreenName() }, { name: thankYouScreenName() }], 1);
    });
  };

  const renderFormCheckboxes = (props: FormikProps<ILongCovid>) => (
    <View style={{ marginVertical: sizes.m }}>
      <CheckboxList>
        {checkBoxQuestions4To17.map((key: string, index: number) => (
          <View style={{ marginBottom: sizes.m }}>
            <CheckboxItem dark onChange={() => props.setFieldValue(key, !props.values[key])} value={props.values[key]}>
              {i18n.t(`long-covid.q${index + checkboxIndexOffset}`)}
            </CheckboxItem>
          </View>
        ))}
        {props.values.other_checkbox ? <GenericTextField formikProps={props} name="other" /> : null}
      </CheckboxList>
    </View>
  );

  const renderError = (props: FormikProps<ILongCovid>, propertyKey: keyof ILongCovid) =>
    props.touched[propertyKey] && props.errors[propertyKey] ? (
      <View style={{ marginBottom: sizes.m }}>
        <ErrorText>{props.errors[propertyKey]}</ErrorText>
      </View>
    ) : null;

  const renderExtendedForm = (props: FormikProps<ILongCovid>) =>
    props.values.had_covid && (props.values.had_covid.startsWith('YES') || props.values.had_covid === 'UNSURE') ? (
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
        <RadioInput
          error={props.touched.duration ? props.errors.duration : ''}
          items={dropdownItemsQ2}
          onValueChange={props.handleChange('duration')}
          selectedValue={props.values.duration}
        />
        {renderError(props, 'duration')}

        <View style={styles.hr} />
        <HeaderText>{i18n.t('long-covid.q3')}</HeaderText>
        <RadioInput
          error={props.touched.restriction ? props.errors.restriction : ''}
          items={dropdownItemsQ3}
          onValueChange={props.handleChange('restriction')}
          selectedValue={props.values.restriction}
        />
        {renderError(props, 'restriction')}

        <View style={styles.hr} />
        <ColourHighlightHeaderTextText highlightColor={colors.purple} text={i18n.t('long-covid.q4-header')} />
        <View style={{ ...styles.infoBox, marginBottom: sizes.l }}>
          <View style={{ flexDirection: 'row', paddingRight: sizes.l, paddingTop: sizes.m }}>
            <View style={{ paddingRight: sizes.s }}>
              <InfoCircle color={colors.primary} />
            </View>
            <RegularText>{i18n.t('long-covid.q4-info-1')}</RegularText>
          </View>
          <View style={{ marginTop: sizes.m, paddingLeft: sizes.xl }}>
            <RegularText>{i18n.t('long-covid.q4-info-2')}</RegularText>
          </View>
        </View>
        <RegularText>{i18n.t('long-covid.q4-info-3')}</RegularText>
        {renderFormCheckboxes(props)}
        <View style={styles.hr} />

        {/* Have you had at least one COVID-19 vaccine done? */}
        <HeaderText>{i18n.t('long-covid.q18')}</HeaderText>
        <RadioInput
          error={props.touched.at_least_one_vaccine ? props.errors.at_least_one_vaccine : ''}
          items={dropdownItemsQ18}
          onValueChange={props.handleChange('at_least_one_vaccine')}
          selectedValue={props.values.at_least_one_vaccine}
        />
        {renderError(props, 'at_least_one_vaccine')}
        {renderExtendedVaccineForm(props)}
      </View>
    ) : null;

  const renderExtendedVaccineForm = (props: FormikProps<ILongCovid>) =>
    props.values.at_least_one_vaccine && props.values.at_least_one_vaccine === 'YES' ? (
      <View>
        <View style={styles.hr} />
        {/* Did you have ongoing COVID-19 symptoms in the week before your first COVID-19 vaccine injection? */}
        <ColourHighlightHeaderTextText highlightColor={colors.purple} text={i18n.t('long-covid.q19')} />
        <RadioInput
          error={
            props.touched.ongoing_symptom_week_before_first_vaccine
              ? props.errors.ongoing_symptom_week_before_first_vaccine
              : ''
          }
          items={dropdownItemsQ19}
          onValueChange={props.handleChange('ongoing_symptom_week_before_first_vaccine')}
          selectedValue={props.values.ongoing_symptom_week_before_first_vaccine}
        />
        {renderError(props, 'ongoing_symptom_week_before_first_vaccine')}

        <View style={styles.hr} />
        {/* Did your symptoms change 2 weeks (or more) after your first COVID-19 vaccine injection? */}
        <ColourHighlightHeaderTextText highlightColor={colors.purple} text={i18n.t('long-covid.q20')} />
        <RadioInput
          error={
            props.touched.symptom_change_2_weeks_after_first_vaccine
              ? props.errors.symptom_change_2_weeks_after_first_vaccine
              : ''
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
          <RadioInput
            error={props.touched[key] && props.errors[key]}
            items={dropdownItemsSymptomsChangeSeverity}
            label={i18n.t(`long-covid.q21-${key}`)}
            onValueChange={props.handleChange(key)}
            selectedValue={props.values[key]}
          />
        ))}
        <View style={styles.hr} />

        {/* Do you have anything else to share regarding the evolution of your COVID-19 symptoms? */}
        <HeaderText style={{ marginBottom: sizes.m }}>{i18n.t('long-covid.comments')}</HeaderText>
        <TextareaWithCharCount
          bordered
          onChangeText={props.handleChange('symptom_change_comments')}
          placeholder={i18n.t('placeholder-optional-question')}
          textAreaStyle={styles.textarea}
          value={props.values.symptom_change_comments}
        />
      </View>
    ) : null;

  return (
    <Screen backgroundColor={colors.backgroundSecondary} testID="long-covid-question-screen">
      <Formik
        initialValues={{
          ...LongCovidQuestionScreen.initialFormValues(),
        }}
        onSubmit={onSubmit}
        validationSchema={LongCovidQuestionScreen.schema}
      >
        {(props: FormikProps<ILongCovid>) => {
          return (
            <Form>
              <HeaderText>{i18n.t('long-covid.q1')}</HeaderText>
              <RadioInput
                error={props.touched.had_covid && props.errors.had_covid}
                items={dropdownItemsQ1}
                onValueChange={props.handleChange('had_covid')}
                selectedValue={props.values.had_covid}
                testID="input-had-covid"
              />
              {renderExtendedForm(props)}
              <View style={styling.flex} />
              <BrandedButton
                enabled={props.values.had_covid !== null && Object.keys(props.errors).length < 1}
                onPress={props.handleSubmit}
                style={styles.marginTop}
                testID="button-submit"
              >
                <RegularText style={{ color: colors.white }}>{i18n.t('long-covid.finish')}</RegularText>
              </BrandedButton>
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
}

LongCovidQuestionScreen.initialFormValues = (): ILongCovid => longCovidQuestionPageOneDataInitialState;

LongCovidQuestionScreen.schema = () => validations;

const styles = StyleSheet.create({
  bullet: {
    fontSize: 4,
  },
  hr: {
    borderBottomColor: colors.hrColor,
    borderBottomWidth: 1,
    marginBottom: sizes.xxl,
    marginTop: sizes.m,
  },
  infoBox: {
    backgroundColor: colors.white,
    borderRadius: sizes.xs,
    marginTop: sizes.m,
    padding: sizes.m,
    paddingBottom: sizes.l,
    textAlign: 'left',
  },
  marginTop: {
    marginTop: sizes.xl,
  },
  textarea: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: sizes.xs,
    paddingVertical: sizes.xxl,
  },
});
