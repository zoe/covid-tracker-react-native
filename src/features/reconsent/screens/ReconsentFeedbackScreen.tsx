import { Text } from '@covid/components';
import CheckboxTextInputList from '@covid/components/inputs/CheckboxTextInputList';
import { selectFeedbackData, TFeedbackId, updateFeedback } from '@covid/core/state/reconsent';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

type TItem = {
  id: TFeedbackId;
  label: string;
};

// This list doesn't have to be translated.
const items: TItem[] = [
  {
    id: 'im_only_interested_in_fighting_covid_19_right_now',
    label: "I'm only interested in fighting COVID-19 right now",
  },
  {
    id: 'commercial_purposes',
    label: 'I don’t want my data to be used for commercial purposes',
  },
  {
    id: 'the_disease_or_disorder_i_care_about_isnt_listed',
    label: 'The disease or disorder I care about isn’t listed',
  },
  {
    id: 'its_too_much_effort',
    label: 'It’s too much effort',
  },
  {
    id: 'i_dont_feel_informed_enough',
    label: 'I don’t feel informed enough',
  },
  {
    id: 'i_dont_think_i_can_make_a_real_impact',
    label: 'I don’t think I can make a real impact on these diseases',
  },
  {
    id: 'other',
    label: 'Other',
  },
];

export default function ReconsentFeedbackScreen() {
  const dispatch = useDispatch();
  const feedbackData = useSelector(selectFeedbackData);

  const options = React.useMemo(
    () =>
      items.map((option) => ({
        ...option,
        value: feedbackData[option.id],
      })),
    [feedbackData],
  );

  function onPress() {
    NavigatorService.navigate('ReconsentReconsider');
  }

  function onChange(value: string | undefined, index: number) {
    dispatch(
      updateFeedback({
        feedbackId: options[index].id,
        value,
      }),
    );
  }

  return (
    <ReconsentScreen buttonOnPress={onPress} buttonTitle={i18n.t('reconsent.feedback.button')}>
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
