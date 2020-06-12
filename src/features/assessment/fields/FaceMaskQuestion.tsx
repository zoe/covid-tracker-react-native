import { FormikProps } from 'formik';
import { Item, Label } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import i18n from '@covid/locale/i18n';
import { FieldWrapper } from '@covid/components/Screen';
import { GenericTextField } from '@covid/components/GenericTextField';
import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import DropdownField from '@covid/components/DropdownField';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';

export interface FaceMaskData {
  wornFaceMask: string;
  typesOfMask: string[];
  otherMask: string | null;
}

interface Props {
  formikProps: FormikProps<FaceMaskData>;
}

export enum WornMaskValues {
  NEVER = 'never',
  SOMETIMES = 'sometimes',
  MOST_OF_THE_TIME = 'most_of_the_time',
  ALWAYS = 'always',
  NA = 'not_applicable',
}

export enum TypeOfMaskValues {
  CLOTH_SCARF = 'mask_cloth_or_scarf',
  SURGICAL = 'mask_surgical',
  RESPIRATOR = 'mask_n95_ffp',
  NOT_SURE = 'mask_not_sure_pfnts',
  OTHER = 'mask_other',
}

type FaceMaskCheckBoxData = {
  label: string;
  value: string;
};

const createMaskCheckboxes = (data: FaceMaskCheckBoxData[], props: FormikProps<FaceMaskData>) => {
  return data.map((checkBoxData) => {
    return (
      <CheckboxItem
        key={checkBoxData.value}
        value={props.values.typesOfMask.includes(checkBoxData.value)}
        onChange={(checked: boolean) => {
          let typesOfMaskArray = props.values.typesOfMask;
          if (checked) {
            typesOfMaskArray.push(checkBoxData.value);
          } else {
            typesOfMaskArray = typesOfMaskArray.filter((val) => val !== checkBoxData.value);
          }
          props.setFieldValue('typesOfMask', typesOfMaskArray);
        }}>
        {checkBoxData.label}
      </CheckboxItem>
    );
  });
};

export class FaceMaskQuestion extends Component<Props, object> {
  static initialFormValues = (): FaceMaskData => {
    return {
      wornFaceMask: '',
      typesOfMask: [] as string[],
      otherMask: null,
    };
  };

  static createMasksDTO = (selectedMasks: TypeOfMaskValues[], wornFaceMask: string, otherMask: string | null) => {
    const dto = {
      worn_face_mask: wornFaceMask,
      mask_cloth_or_scarf: false,
      mask_surgical: false,
      mask_n95_ffp: false,
      mask_not_sure_pfnts: false,
      mask_other: otherMask,
    } as Partial<AssessmentInfosRequest>;

    selectedMasks.forEach((selectedMask) => {
      if (selectedMask !== TypeOfMaskValues.OTHER) {
        dto[selectedMask] = true;
      }
    });

    return dto;
  };

  wornFaceMasksCheckboxes = [
    { label: i18n.t('face-mask.never'), value: WornMaskValues.NEVER },
    { label: i18n.t('face-mask.sometimes'), value: WornMaskValues.SOMETIMES },
    { label: i18n.t('face-mask.most-of-the-time'), value: WornMaskValues.MOST_OF_THE_TIME },
    { label: i18n.t('face-mask.always'), value: WornMaskValues.ALWAYS },
    { label: i18n.t('face-mask.not-applicable'), value: WornMaskValues.NA },
  ];

  typeFaceMasksCheckboxes = [
    { label: i18n.t('face-mask.cloth_scarf'), value: TypeOfMaskValues.CLOTH_SCARF },
    { label: i18n.t('face-mask.surgical'), value: TypeOfMaskValues.SURGICAL },
    { label: i18n.t('face-mask.respirator'), value: TypeOfMaskValues.RESPIRATOR },
    { label: i18n.t('face-mask.not-sure'), value: TypeOfMaskValues.NOT_SURE },
    { label: i18n.t('face-mask.other'), value: TypeOfMaskValues.OTHER },
  ];

  render() {
    const { formikProps } = this.props;
    return (
      <FieldWrapper>
        <DropdownField
          label={i18n.t('face-mask.worn-a-mask-question')}
          selectedValue={formikProps.values.wornFaceMask}
          onValueChange={formikProps.handleChange('wornFaceMask')}
          items={this.wornFaceMasksCheckboxes}
        />
        {(formikProps.values.wornFaceMask === WornMaskValues.SOMETIMES ||
          formikProps.values.wornFaceMask === WornMaskValues.MOST_OF_THE_TIME ||
          formikProps.values.wornFaceMask === WornMaskValues.ALWAYS) && (
          <Item stackedLabel style={styles.textItemStyle}>
            <Label>{i18n.t('face-mask.type-of-mask-question')}</Label>
            <CheckboxList>{createMaskCheckboxes(this.typeFaceMasksCheckboxes, this.props.formikProps)}</CheckboxList>
          </Item>
        )}
        {formikProps.values.typesOfMask.includes(TypeOfMaskValues.OTHER) && (
          <GenericTextField formikProps={this.props.formikProps} name="otherMask" />
        )}
      </FieldWrapper>
    );
  }
}

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
});
