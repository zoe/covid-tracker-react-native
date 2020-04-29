import {Item, Label } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import i18n from '../../../locale/i18n';
import { CheckboxItem, CheckboxList } from '../../../components/Checkbox';
import { GenericTextField } from '../../../components/GenericTextField';
import { isUSCountry } from '../../../core/user/UserService';
import { FormikProps } from 'formik';
import { FieldWrapper } from '../../../components/Screen';
import { AboutYouData } from '../AboutYouScreen';

export interface RaceEthnicityData {
  race: string[];
  raceOther: string;
  ethnicity: string;
}

interface RaceEthnicityQuestionProps {
  showRaceQuestion: Boolean;
  showEthnicityQuestion: Boolean;
  formikProps: FormikProps<RaceEthnicityData>;
}

type RaceCheckBoxData = {
  label: string;
  value: string;
};

const UKRaceCheckboxes = [
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

const USRaceCheckboxes = [
  { label: i18n.t('us-indian_native'), value: 'us_indian_native' },
  { label: i18n.t('us-asian'), value: 'us_asian' },
  { label: i18n.t('us-black'), value: 'us_black' },
  { label: i18n.t('us-hawaiian_pacific'), value: 'us_hawaiian_pacific' },
  { label: i18n.t('us-white'), value: 'us_white' },
  { label: i18n.t('us-other'), value: 'other' },
  { label: i18n.t('prefer-not-to-say'), value: 'prefer_not_to_say' },
];

const createRaceCheckboxes = (data: RaceCheckBoxData[], props: FormikProps<RaceEthnicityData>) => {
  return data.map((checkBoxData) => {
    return (
      <CheckboxItem
        key={checkBoxData.value}
        value={props.values.race.includes(checkBoxData.value)}
        onChange={(checked: boolean) => {
          let raceArray = props.values.race;
          if (checked) {
            raceArray.push(checkBoxData.value);
          } else {
            raceArray = raceArray.filter((val) => val != checkBoxData.value);
          }
          props.setFieldValue('race', raceArray);
        }}>
        {checkBoxData.label}
      </CheckboxItem>
    );
  });
};

export class RaceEthnicityQuestion extends Component<RaceEthnicityQuestionProps, {}> {
  render() {
    return (
      <View>
        {this.props.showRaceQuestion && (
          <FieldWrapper>
            <Item stackedLabel style={styles.textItemStyle}>
              <Label>{i18n.t('race-question')}</Label>
              <CheckboxList>{createRaceCheckboxes(UKRaceCheckboxes, this.props.formikProps)}</CheckboxList>
            </Item>
          </FieldWrapper>
        )}

        {this.props.showEthnicityQuestion && (
          <FieldWrapper>
            <Item stackedLabel style={styles.textItemStyle}>
              <Label>{i18n.t('race-question')}</Label>
              <CheckboxList>{createRaceCheckboxes(USRaceCheckboxes, this.props.formikProps)}</CheckboxList>
            </Item>
          </FieldWrapper>
        )}

        {this.props.formikProps.values.race.includes('other') && (
          <GenericTextField
            formikProps={this.props.formikProps}
            label={i18n.t('race-other-question')}
            name="raceOther"
          />
        )}

        {isUSCountry() && (
          <FieldWrapper>
            <Item stackedLabel style={styles.textItemStyle}>
              <Label>{i18n.t('ethnicity-question')}</Label>
              <CheckboxList>
                <CheckboxItem
                  value={this.props.formikProps.values.ethnicity == 'hispanic'}
                  onChange={(value: boolean) => {
                    this.props.formikProps.setFieldValue('ethnicity', value ? 'hispanic' : '');
                  }}>
                  {i18n.t('hispanic')}
                </CheckboxItem>
                <CheckboxItem
                  value={this.props.formikProps.values.ethnicity == 'not_hispanic'}
                  onChange={(value: boolean) => {
                    this.props.formikProps.setFieldValue('ethnicity', value ? 'not_hispanic' : '');
                  }}>
                  {i18n.t('not-hispanic')}
                </CheckboxItem>
                <CheckboxItem
                  value={this.props.formikProps.values.ethnicity == 'prefer_not_to_say'}
                  onChange={(value: boolean) => {
                    this.props.formikProps.setFieldValue('ethnicity', value ? 'prefer_not_to_say' : '');
                  }}>
                  {i18n.t('prefer-not-to-say')}
                </CheckboxItem>
              </CheckboxList>
            </Item>
          </FieldWrapper>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
});
