import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { IAboutYouData } from '@covid/features/health-profile/screens/HPAboutYouScreen';
import i18n from '@covid/locale/i18n';
import { cleanFloatVal, cleanIntegerVal } from '@covid/utils/number';
import * as Yup from 'yup';

import { EHealthProfileQuestionCardStatus } from '../components/HealthProfileQuestionCard';

export const isEditing = (status: EHealthProfileQuestionCardStatus) => {
  return [EHealthProfileQuestionCardStatus.EDIT_ANSWER, EHealthProfileQuestionCardStatus.NOT_ANSWERED].includes(status);
};

export const validationSchemaHPAboutYou = Yup.object().shape({
  // TODO: Add remaining field validations
  feet: Yup.number().when('heightUnit', {
    is: 'ft',
    then: Yup.number().required(),
  }),
  gender: Yup.string().required(i18n.t('required-sex-at-birth')),
  gender_identity: Yup.string()
    .required(i18n.t('required-gender-identity'))
    .test('len', i18n.t('error-gender-identity-length'), (val) => (val && val.length < 30) || !val),
  height: Yup.number().when('heightUnit', {
    is: 'cm',
    then: Yup.number().required(i18n.t('required-height-in-cm')),
  }),
  heightUnit: Yup.string().required(),
  inches: Yup.number().when('heightUnit', {
    is: 'ft',
    then: Yup.number().required(i18n.t('required-height-in-ft-in')),
  }),
  is_twin: Yup.string().required(),
  pcos: Yup.string().required(), // TODO: delete - this is just for testing multiselect validation
  postcode: Yup.string().required(i18n.t('required-postcode')).max(8, i18n.t('postcode-too-long')),
  pounds: Yup.number().when('weightUnit', {
    is: 'lbs',
    then: Yup.number().required(i18n.t('required-weight-in-lb')),
  }),
  race: Yup.string().required(),
  stones: Yup.number().when('weightUnit', {
    is: 'lbs',
    then: Yup.number().required(),
  }),
  twin_type: Yup.string().when('is_twin', {
    is: 'yes',
    then: Yup.string().required(),
  }),
  weight: Yup.number().when('weightUnit', {
    is: 'kg',
    then: Yup.number().required(i18n.t('required-weight-in-kg')),
  }),
  weightUnit: Yup.string().required(),
  year_of_birth: Yup.number()
    .typeError(i18n.t('correct-year-of-birth'))
    .required(i18n.t('required-year-of-birth'))
    .integer(i18n.t('correct-year-of-birth'))
    .min(1900, i18n.t('correct-year-of-birth'))
    .max(new Date().getFullYear(), i18n.t('correct-year-of-birth')),
});

export const createHPAboutYouDTO = (formData: IAboutYouData) => {
  let infos = {
    ...formData,
    gender: formData.gender === '1' ? 1 : formData.gender === '0' ? 0 : formData.gender === '2' ? 2 : 3,
    year_of_birth: cleanIntegerVal(formData.year_of_birth as string),
  } as Partial<TPatientInfosRequest>;

  if (formData.heightUnit === 'ft') {
    let inches = cleanFloatVal(formData.inches);
    if (formData.feet) {
      const feet = cleanFloatVal(formData.feet) || 0;
      inches += feet * 12;
    }
    infos = { ...infos, height_feet: inches / 12.0 };
  } else {
    infos = { ...infos, height_cm: cleanFloatVal(formData.height) };
  }

  if (formData.weightUnit === 'lbs') {
    let pounds = cleanFloatVal(formData.pounds);
    if (formData.stones) {
      const stones = cleanFloatVal(formData.stones) || 0;
      pounds += stones * 14;
    }
    infos = { ...infos, weight_pounds: pounds };
  } else {
    infos = { ...infos, weight_kg: cleanFloatVal(formData.weight) };
  }

  return infos;
};
