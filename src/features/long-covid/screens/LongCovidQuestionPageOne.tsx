import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BasicPage, RegularText, HeaderText, DropdownField, CheckboxList, CheckboxItem, ErrorText } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import { Formik, FormikProps } from 'formik';
import { Form, Textarea } from 'native-base';
import { LongCovidQuestionPageOneData } from '../types';
import { defaultState, dropdownItemsQ1, dropdownItemsQ2, dropdownItemsQ3, checkBoxQuestions4To17, dropdownItemsQ18, dropdownItemsQ19, dropdownItemsSymptomsChange, symtpomChangesKeyList, validations } from './consts.questions';
import { GenericTextField } from '@covid/components/GenericTextField';
import { RouteProp } from '@react-navigation/native';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { longCovidApiClient } from '@covid/Services';

interface IProps {
    route: RouteProp<ScreenParamList, 'LongCovidStart'>;
}

export default function LongCovidQuestionPageOneScreen({ route }: IProps) {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const { patientData } = route.params;
  
  console.log('QUIZ IT WITH ', patientData.patientId)
  useEffect(() => {
    // if (!LongCovidState.completed) {
    //   dispatch(setCompleted(true));
    // }
  });

  const handleSubmit = async (formData: LongCovidQuestionPageOneData) => {
    if (isSubmitting) {
        return;
    }
    setSubmitting(true);
    longCovidApiClient.add(patientData.patientId, formData).then((result)=>{
        console.log('RESULT IS ', result)
    });
  };

  const renderFormCheckboxes = (props: FormikProps<LongCovidQuestionPageOneData>) => <View style={{ marginVertical: 16 }}>
    <CheckboxList>
        { checkBoxQuestions4To17.map((key: string, index: number) =>
            <CheckboxItem onChange={(value: boolean) => 
              props.setFieldValue(key, !props.values[key])
            }
            value={props.values[key]}>
            {i18n.t(`long-covid.q${index + 4}`)}
            </CheckboxItem>)
        }
        { props.values.other ? (
          <GenericTextField
            formikProps={props}
            name="other"
          />
        ) : null }
    </CheckboxList>
  </View>;

  const renderBulletLine = (text: string) => <View style={{ flexDirection: 'row', paddingTop: 16, paddingRight: 16, }}>
        <RegularText style={styles.bullet}>{'\u2B24'}</RegularText>
        <RegularText style={{flex: 1, paddingLeft: 16}}>{text}</RegularText>
  </View>;

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
            selectedValue={props.values.symptom_change_2_weeks_after_first_vaccine}
            onValueChange={props.handleChange('symptom_change_2_weeks_after_first_vaccine')}
            error={props.touched.symptom_change_2_weeks_after_first_vaccine && props.errors.symptom_change_2_weeks_after_first_vaccine}
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
        <HeaderText style={{ marginBottom: 16 }}>{i18n.t('long-covid.comments')}</HeaderText>     
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
    <Formik
        style={{ margin: 16 }}
        initialValues={{
        ...LongCovidQuestionPageOneScreen.initialFormValues(),
        }}
        validationSchema={LongCovidQuestionPageOneScreen.schema}
        onSubmit={(values: LongCovidQuestionPageOneData) => handleSubmit(values)}
    >
        {(props: FormikProps<LongCovidQuestionPageOneData>) => {
        return (
            <BasicPage 
            footerTitle="Next" active={props.values.had_covid !== null && Object.keys(props.errors).length < 1} onPress={()=>handleSubmit(props.values)} withGutter
        >
            <HeaderText>{i18n.t('long-covid.q1')}</HeaderText>   
            <Form style={{ flexGrow: 1 }}>
            <DropdownField
                selectedValue={props.values.had_covid}
                onValueChange={props.handleChange('had_covid')}
                label={i18n.t('long-covid.q1')}
                error={props.touched.had_covid && props.errors.had_covid}
                items={dropdownItemsQ1}
            />
            { renderExtendedForm(props) }
            {Object.keys(props.errors).map((error)=><ErrorText>ERROR: {props.errors[error]}</ErrorText>)}            
            </Form></BasicPage>
        );
        }}
    </Formik>
  );
}

LongCovidQuestionPageOneScreen.initialFormValues = (): LongCovidQuestionPageOneData => defaultState;
  
LongCovidQuestionPageOneScreen.schema = () => validations;

const styles = StyleSheet.create({
  textarea: {
    borderRadius: 8,
    backgroundColor: '#EEEEEF',
    paddingVertical: 32,
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
