import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { GenericTextField } from '@covid/components/GenericTextField';
import { isUSCountry } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import { FormikProps } from 'formik';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export interface IRaceEthnicityData {
  race: string[];
  raceOther: string;
  ethnicity: string;
}

interface IRaceEthnicityQuestionProps {
  showRaceQuestion: boolean | undefined;
  showEthnicityQuestion: boolean | undefined;
  formikProps: FormikProps<IRaceEthnicityData>;
}

type TRaceCheckBoxData = {
  label: string;
  value: string;
};

function renderRaceCheckboxes(data: TRaceCheckBoxData[], props: FormikProps<IRaceEthnicityData>) {
  return data.map((checkBoxData) => (
    <CheckboxItem
      key={checkBoxData.value}
      onChange={(checked: boolean) => {
        let raceArray = props.values.race;
        if (checkBoxData.value === 'prefer_not_to_say') {
          raceArray = ['prefer_not_to_say'];
        } else if (checked) {
          raceArray.push(checkBoxData.value);
          raceArray = raceArray.filter((val) => val !== 'prefer_not_to_say');
        } else {
          raceArray = raceArray.filter((val) => val !== checkBoxData.value);
        }
        props.setFieldValue('race', raceArray);
      }}
      testID={`checkbox-race-ethnicity-${checkBoxData.value}`}
      value={props.values.race.includes(checkBoxData.value)}
    >
      {checkBoxData.label}
    </CheckboxItem>
  ));
}

export class RaceEthnicityQuestion extends React.Component<IRaceEthnicityQuestionProps, object> {
  UKRaceCheckboxes = [
    { label: i18n.t('uk-asian'), value: 'uk_asian' },
    { label: i18n.t('uk-black'), value: 'uk_black' },
    { label: i18n.t('uk-mixed-white-black'), value: 'uk_mixed_white_black' },
    { label: i18n.t('uk-mixed-other'), value: 'uk_mixed_other' },
    { label: i18n.t('uk-white'), value: 'uk_white' },
    { label: i18n.t('uk-chinese'), value: 'uk_chinese' },
    { label: i18n.t('uk-middle-eastern'), value: 'uk_middle_eastern' },
    { label: i18n.t('uk-other'), value: 'other' },
    { label: i18n.t('prefer-not-to-say'), value: 'prefer_not_to_say' },
  ];

  USRaceCheckboxes = [
    { label: i18n.t('us-indian_native'), value: 'us_indian_native' },
    { label: i18n.t('us-asian'), value: 'us_asian' },
    { label: i18n.t('us-black'), value: 'us_black' },
    { label: i18n.t('us-hawaiian_pacific'), value: 'us_hawaiian_pacific' },
    { label: i18n.t('us-white'), value: 'us_white' },
    { label: i18n.t('us-other'), value: 'other' },
    { label: i18n.t('prefer-not-to-say'), value: 'prefer_not_to_say' },
  ];

  static getInitialFormValues = () => {
    return {
      ethnicity: '',
      race: [] as string[],
      raceOther: '',
    };
  };

  render() {
    return (
      <View>
        {this.props.showRaceQuestion ? (
          <View style={styles.view}>
            <CheckboxList required label={i18n.t('race-question')}>
              {renderRaceCheckboxes(this.UKRaceCheckboxes, this.props.formikProps)}
            </CheckboxList>
          </View>
        ) : null}

        {this.props.showEthnicityQuestion ? (
          <View style={styles.view}>
            <CheckboxList required label={i18n.t('race-question')}>
              {renderRaceCheckboxes(this.USRaceCheckboxes, this.props.formikProps)}
            </CheckboxList>
          </View>
        ) : null}

        {this.props.formikProps.values.race.includes('other') ? (
          <GenericTextField
            required
            formikProps={this.props.formikProps}
            label={i18n.t('race-other-question')}
            name="raceOther"
          />
        ) : null}

        {isUSCountry() ? (
          <View style={styles.view}>
            <CheckboxList required label={i18n.t('ethnicity-question')}>
              <CheckboxItem
                onChange={(value: boolean) => {
                  this.props.formikProps.setFieldValue('ethnicity', value ? 'hispanic' : '');
                }}
                value={this.props.formikProps.values.ethnicity === 'hispanic'}
              >
                {i18n.t('hispanic')}
              </CheckboxItem>
              <CheckboxItem
                onChange={(value: boolean) => {
                  this.props.formikProps.setFieldValue('ethnicity', value ? 'not_hispanic' : '');
                }}
                value={this.props.formikProps.values.ethnicity === 'not_hispanic'}
              >
                {i18n.t('not-hispanic')}
              </CheckboxItem>
              <CheckboxItem
                onChange={(value: boolean) => {
                  this.props.formikProps.setFieldValue('ethnicity', value ? 'prefer_not_to_say' : '');
                }}
                value={this.props.formikProps.values.ethnicity === 'prefer_not_to_say'}
              >
                {i18n.t('prefer-not-to-say')}
              </CheckboxItem>
            </CheckboxList>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: colors.primary,
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
  },
  view: {
    marginVertical: sizes.m,
  },
});
