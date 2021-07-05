import { Text } from '@covid/components';
import { CheckboxTextInputList } from '@covid/components/inputs/CheckboxTextInputList';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { generalApiClient } from '@covid/services';
import * as React from 'react';

type TOption = {
  id: string;
  label: string;
  value?: string;
};

// This list doesn't have to be translated.
const defaultOptions: TOption[] = [
  {
    id: 'im_only_interested_in_fighting_covid_19_right_now',
    label: "I'm only interested in fighting COVID-19 right now",
    value: undefined,
  },
  {
    id: 'commercial_purposes',
    label: 'I don’t want my data to be used for commercial purposes',
    value: undefined,
  },
  {
    id: 'the_disease_or_disorder_i_care_about_isnt_listed',
    label: 'The disease or disorder I care about isn’t listed',
    value: undefined,
  },
  {
    id: 'its_too_much_effort',
    label: 'It’s too much effort',
    value: undefined,
  },
  {
    id: 'i_dont_feel_informed_enough',
    label: 'I don’t feel informed enough',
    value: undefined,
  },
  {
    id: 'i_dont_think_i_can_make_a_real_impact',
    label: 'I don’t think I can make a real impact on these diseases',
    value: undefined,
  },
  {
    id: 'other',
    label: 'Other',
    value: undefined,
  },
];

interface IContext {
  [key: string]: string | undefined;
}

export default function ReconsentFeedbackScreen() {
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState<TOption[]>(defaultOptions);

  async function onPress() {
    setLoading(true);
    try {
      const context = options.reduce((previous, current) => {
        previous[current.id] = current.value;
        return previous;
      }, {} as IContext);
      await generalApiClient.postUserEvent('feedback_reconsent', context);
    } catch (_) {}
    setLoading(false);
    NavigatorService.navigate('ReconsentReconsider');
  }

  function onChange(value: string | undefined, index: number) {
    const newOptions: TOption[] = [...options];
    newOptions[index].value = value;
    setOptions(newOptions);
  }

  return (
    <ReconsentScreen
      buttonEnabled={!loading}
      buttonLoading={loading}
      buttonOnPress={onPress}
      buttonTitle={i18n.t('reconsent.feedback.button')}
    >
      <Text rhythm={24} textAlign="center" textClass="h2Light">
        {i18n.t('reconsent.feedback.title')}
      </Text>
      <Text inverted colorPalette="uiDark" colorShade="dark" rhythm={24} textAlign="center" textClass="pLight">
        {i18n.t('reconsent.feedback.subtitle')}
      </Text>
      <CheckboxTextInputList onChange={onChange} options={options} />
    </ReconsentScreen>
  );
}
