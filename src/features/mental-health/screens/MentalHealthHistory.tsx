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
  THasDiagnosis,
} from '@covid/core/state/mental-health';
import { mentalHealthApiClient } from '@covid/Services';
import UserService from '@covid/core/user/UserService';

import { TQuestion, questions, initialOptions } from '../data';
import { MentalHealthInfosRequest } from '../MentalHealthInfosRequest';

function MentalHealthHistory() {
  const MentalHealthHistory = useSelector(selectMentalHealthHistory);
  const [canSubmit, setCanSubmit] = useState(false);
  const dispatch = useDispatch();
  const { grid } = useTheme();

  const handleSetHasHistoryDiagnosis = (value: THasDiagnosis) => {
    dispatch(setHasHistoryDiagnosis(value));
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

  useEffect(() => {
    if (MentalHealthHistory.hasDiagnosis === 'NO' || MentalHealthHistory.hasDiagnosis === 'DECLINE_TO_SAY') {
      setCanSubmit(true);
      return;
    }
    if (MentalHealthHistory.hasDiagnosis === 'YES' && MentalHealthHistory.conditions.length) {
      setCanSubmit(true);
      return;
    }
    setCanSubmit(false);
  }, [MentalHealthHistory]);

  const saveStateAndNavigate = async () => {
    // TODO: get patient id from route
    // TODO: get existing mental health data, specifically ID, from state (Should be preloaded by here)
    const existingMentalHealthListForUser = await mentalHealthApiClient.get();
    const existingMentalHealth = existingMentalHealthListForUser[0];
    const updatedMentalHealth: MentalHealthInfosRequest = {
      id: existingMentalHealth.id,
      patient: existingMentalHealth.patient,
      ever_diagnosed_with_mental_health_condition: MentalHealthHistory.hasDiagnosis,

      // Map the list of additions to the BE counterpart booleans
      mental_health_history_data: {
        generalised_anxiety_disorder: MentalHealthHistory.conditions.includes('GAD'),
        panic: MentalHealthHistory.conditions.includes('PANIC_DISORDER'),
        specific_phobias: MentalHealthHistory.conditions.includes('SPECIFIC_PHOBIAS'),
        ocd: MentalHealthHistory.conditions.includes('OCD'),
        ptsd: MentalHealthHistory.conditions.includes('PTSD'),
        social_anxiety: MentalHealthHistory.conditions.includes('SOCIAL_ANXIETY_DISORDER'),
        agoraphobia: MentalHealthHistory.conditions.includes('AGORAPHOBIA'),
        depression: MentalHealthHistory.conditions.includes('DEPRESSION'),
        add_adhd: MentalHealthHistory.conditions.includes('ADD_ADHD'),
        autism: MentalHealthHistory.conditions.includes('AUTISTIC_SPECTRUM_DISORDER'),
        eating: MentalHealthHistory.conditions.includes('EATING_DISORDER'),
        personality: MentalHealthHistory.conditions.includes('PERSONALITY_DISORDER'),
        mania_hyopmania_bipolar_manic_depression: MentalHealthHistory.conditions.includes('MANIA'),
        schizophrenia: MentalHealthHistory.conditions.includes('SCHIZOPHRENIA'),
        substance_use: MentalHealthHistory.conditions.includes('SUBSTANCE_USE_DISORDER'),
        psychosis_or_psychotic_ilness: MentalHealthHistory.conditions.includes('TYPE_OF_PSYCHOSIS'),
        other: MentalHealthHistory.conditions.includes('OTHER'),
        prefer_not_to_say: MentalHealthHistory.conditions.includes('DECLINE_TO_SAY'),
      },
    };
    await mentalHealthApiClient.update(existingMentalHealth.id, updatedMentalHealth);
    NavigatorService.navigate('MentalHealthLearning', undefined);
  };

  return (
    <BasicPage active={canSubmit} footerTitle="Next" onPress={() => saveStateAndNavigate()}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text textClass="h3" rhythm={32}>
          About your history of mental health
        </Text>
        <View>
          <DropdownField
            label="Have you ever been diagnosed with a mental health condition?"
            selectedValue={MentalHealthHistory.hasDiagnosis}
            onValueChange={handleSetHasHistoryDiagnosis}
            items={initialOptions}
          />
        </View>
        {MentalHealthHistory.hasDiagnosis === 'YES' && (
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
