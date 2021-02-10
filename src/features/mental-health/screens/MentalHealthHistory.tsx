import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { BasicPage, DropdownField, Text, CheckBoxButton, GenericSelectableList } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import { useTheme } from '@covid/themes';
import {
  addHistoryCondition,
  removeHistoryCondition,
  selectMentalHealthHistory,
  setHasHistoryDiagnosis,
  TMentalHealthCondition,
} from '@covid/core/state/mental-health';

type TQuestion = {
  key: string;
  value: TMentalHealthCondition;
};

function MentalHealthHistory() {
  const [canSubmit, setCanSubmit] = useState(false);
  const [option, setOption] = useState<string>('');
  const MentalHealthHistory = useSelector(selectMentalHealthHistory);

  const dispatch = useDispatch();
  const { grid } = useTheme();
  const initialOptions = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
    { label: 'Prefer not to say', value: 'no' },
  ];

  const questions: TQuestion[] = [
    {
      key: 'Generalised anxiety disorder (GAD)',
      value: 'GAD',
    },
    {
      key: 'Panic disorder',
      value: 'PANIC_DISORDER',
    },
    {
      key: 'Specific phobias',
      value: 'SPECIFIC_PHOBIAS',
    },
    {
      key: 'Obsessive compulsive disorder (OCD)',
      value: 'OCD',
    },
    {
      key: 'Post-traumatic stress disorder (PTSD) ',
      value: 'PTSD',
    },
    {
      key: 'Social anxiety disorder',
      value: 'SOCIAL_ANXIETY_DISORDER',
    },
    {
      key: 'Agoraphobia',
      value: 'AGORAPHOBIA',
    },
    {
      key: 'Depression',
      value: 'DEPRESSION',
    },
    {
      key: 'Attention deficit or attention deficit and hyperactivity disorder (ADD/ADHD) ',
      value: 'ADD_ADHD',
    },
    {
      key: "Autism, Asperger's or autistic spectrum disorder ",
      value: 'AUTISTIC_SPECTRUM_DISORDER',
    },
    {
      key: 'Eating disorder (e.g. bulimia nervosa; anorexia nervosa; psychological over-eating or binge-eating',
      value: 'EATING_DISORDER',
    },
    {
      key: 'A personality disorder ',
      value: 'PERSONALITY_DISORDER',
    },
    {
      key: 'Mania, hypomania, bipolar or manic depression',
      value: 'MANIA',
    },
    {
      key: 'Schizophrenia',
      value: 'SCHIZOPHRENIA',
    },
    {
      key: 'Substance use disorder',
      value: 'SUBSTANCE_USE_DISORDER',
    },
    {
      key: 'Any other type of psychosis or psychotic illness',
      value: 'TYPE_OF_PSYCHOSIS',
    },
    {
      key: 'Other',
      value: 'OTHER',
    },
    {
      key: 'Prefer not to say',
      value: 'DECLINE_TO_SAY',
    },
  ];

  const handleSetHasHistoryDiagnosis = (value: string) => {
    setOption(value);
    switch (value) {
      case 'yes':
        dispatch(setHasHistoryDiagnosis(true));
        return;
      default:
        dispatch(setHasHistoryDiagnosis(false));
    }
  };

  const getHasExistingCondition = (condition: TMentalHealthCondition) =>
    Object.values(MentalHealthHistory.conditions).includes(condition);

  const handleAddRemoveCondition = (condition: TMentalHealthCondition) => {
    const exists = getHasExistingCondition(condition);
    if (exists) {
      dispatch(removeHistoryCondition(condition));
      return;
    }
    dispatch(addHistoryCondition(condition));
  };

  const renderRow = (data: TQuestion) => {
    return (
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ marginRight: grid.l }}>
          <CheckBoxButton
            active={getHasExistingCondition(data.value)}
            backgroundColor="#ccc"
            onPress={() => handleAddRemoveCondition(data.value)}
          />
        </View>
        <Text>{data.key}</Text>
      </View>
    );
  };

  return (
    <BasicPage
      active={canSubmit}
      footerTitle="Next"
      onPress={() => NavigatorService.navigate('MentalHealthSupport', undefined)}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text textClass="h3" rhythm={32}>
          About your history of mental health
        </Text>
        <View>
          <DropdownField
            label="Have you ever been diagnosed with a mental health condition?"
            selectedValue={option}
            onValueChange={handleSetHasHistoryDiagnosis}
            items={initialOptions}
          />
        </View>
        {MentalHealthHistory.hasDiagnosis && (
          // <CheckList listData={questions} onPress={(answer) => console.log('answer: ', answer)} />
          <GenericSelectableList
            collection={questions}
            onPress={(data) => handleAddRemoveCondition(data.value)}
            renderRow={(data) => renderRow(data)}
            style={{ paddingBottom: grid.s, paddingTop: grid.s }}
          />
        )}
      </View>
    </BasicPage>
  );
}

export default MentalHealthHistory;
