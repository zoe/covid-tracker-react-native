import { THealthProfileRequest } from '@covid/core/user/dto/UserAPIContracts';
import { EHealthProfileQuestionCardStatus } from '@covid/features/health-profile/components/HealthProfileQuestionCard';
import {
  IHealthProfileFormData,
  THealthProfilePropertyName,
} from '@covid/features/health-profile/data/healthProfileQuestions';
import i18n from '@covid/locale/i18n';
import { cleanFloatVal, cleanIntegerVal } from '@covid/utils/number';
import * as Yup from 'yup';

export const TEXT_INPUT_PNTS_LABEL = 'Prefer not to say';
export const PNTS_VALUE_TO_SAVE_IN_DB = 'pfnts';

export const isEditing = (status: EHealthProfileQuestionCardStatus) => {
  return [EHealthProfileQuestionCardStatus.EDIT_ANSWER, EHealthProfileQuestionCardStatus.NOT_ANSWERED].includes(status);
};

export const isNumber = (value: string) => /^\d+$/.test(value);

export const testIsValidNumberOrString = (
  value: string,
  minValue: number | undefined,
  maxValue: number | undefined,
) => {
  let valid = true;

  if (value !== TEXT_INPUT_PNTS_LABEL) {
    if (minValue || minValue === 0) {
      valid = valid && Number.parseInt(value, 10) >= minValue && isNumber(value);
    }

    if (maxValue || maxValue === 0) {
      valid = valid && Number.parseInt(value, 10) <= maxValue && isNumber(value);
    }
  }

  return valid;
};

export const validationSchemaHPAboutYou = Yup.object().shape({
  feet: Yup.number().when('heightUnit', {
    is: 'ft',
    then: Yup.number().required(),
  }),
  gender: Yup.string().required(i18n.t('required-sex-at-birth')),
  gender_identity: Yup.string()
    .required(i18n.t('required-gender-identity'))
    .test('len', i18n.t('error-gender-identity-length'), (val) => (val && val.length < 30) || !val),
  healthcare_professional: Yup.string().required(),
  height: Yup.number().when('heightUnit', {
    is: 'cm',
    then: Yup.number().required(i18n.t('required-height-in-cm')),
  }),
  heightUnit: Yup.string().required(),
  help_available: Yup.string().required(),
  highest_qualification: Yup.string().required(),
  housebound_problems: Yup.string().required(),
  inches: Yup.number().when('heightUnit', {
    is: 'ft',
    then: Yup.number().required(i18n.t('required-height-in-ft-in')),
  }),
  is_carer_for_community: Yup.string().required(),
  is_twin: Yup.string().required(),
  limited_activity: Yup.string().required(),
  mobility_aid: Yup.string().required(),
  needs_help: Yup.string().required(),
  postcode: Yup.string().required(i18n.t('required-postcode')).max(8, i18n.t('postcode-too-long')),
  pounds: Yup.number().when('weightUnit', {
    is: 'lbs',
    then: Yup.number().required(i18n.t('required-weight-in-lb')),
  }),
  race: Yup.string().required(),
  race_other: Yup.string().when('race', {
    is: 'other',
    then: Yup.string().required(),
  }),
  smoker_quit: Yup.string().when('smoker_status', {
    is: 'not_currently',
    then: Yup.string().required(),
  }),
  smoker_status: Yup.string().required(),
  stones: Yup.number().when('weightUnit', {
    is: 'lbs',
    then: Yup.number().required(),
  }),
  twin_sex: Yup.string().when(['is_twin', 'twin_type'], {
    is: (is_twin_answer, twin_type_answer) => is_twin_answer === 'yes' && twin_type_answer === 'non_identical',
    then: Yup.string().required(),
  }),
  twin_type: Yup.string().when('is_twin', {
    is: 'yes',
    then: Yup.string().required(),
  }),
  vape_status: Yup.string().required(),
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

export const createHPAboutYouDTO = (formData: IHealthProfileFormData) => {
  let infos = {
    ...formData,
    gender: formData.gender === '1' ? 1 : formData.gender === '0' ? 0 : formData.gender === '2' ? 2 : 3,
    year_of_birth: cleanIntegerVal(formData.year_of_birth as string),
  } as Partial<THealthProfileRequest>;

  if (formData.heightUnit === 'ft') {
    let inches = cleanFloatVal(formData.inches);
    if (formData.feet) {
      const feet = cleanFloatVal(formData.feet) || 0;
      inches += feet * 12;
    }
    infos = { ...infos, height_cm: undefined, height_feet: inches / 12.0 };
  } else {
    infos = { ...infos, height_cm: cleanFloatVal(formData.height), height_feet: undefined };
  }

  if (formData.weightUnit === 'lbs') {
    let pounds = cleanFloatVal(formData.pounds);
    if (formData.stones) {
      const stones = cleanFloatVal(formData.stones) || 0;
      pounds += stones * 14;
    }
    infos = { ...infos, weight_kg: undefined, weight_pounds: pounds };
  } else {
    infos = { ...infos, weight_kg: cleanFloatVal(formData.weight), weight_pounds: undefined };
  }

  // NOTE: YesNo fields are submitted as strings, but no need to convert to boolean as Django backend automatically deduces it as boolean
  return infos;
};

export const createCompletedHealthProfileDTO = (formData: Partial<IHealthProfileFormData>): THealthProfileRequest => {
  const infos: THealthProfileRequest = {
    ...formData,
  };

  // Convert the amount of minutes from a string to a number
  if (formData.minutes_sleep_week_nights) {
    infos.minutes_sleep_week_nights = Number.parseInt(formData.minutes_sleep_week_nights, 10);
  }
  if (formData.minutes_sleep_weekend_nights) {
    infos.minutes_sleep_weekend_nights = Number.parseInt(formData.minutes_sleep_weekend_nights, 10);
  }

  Object.keys(infos).forEach((key) => {
    // This is for condiditional fields that are initialised to empty string, but ultimately not required
    if (infos[key as THealthProfilePropertyName] === '') {
      infos[key as keyof IHealthProfileFormData] = undefined;
      // This is for text fields where pnts is an option
    } else if (infos[key as THealthProfilePropertyName] === TEXT_INPUT_PNTS_LABEL) {
      infos[key as keyof IHealthProfileFormData] = PNTS_VALUE_TO_SAVE_IN_DB;
    }
  });

  // NOTE: YesNo fields are submitted as strings, but no need to convert to boolean as Django backend automatically deduces it as boolean
  return infos;
};
