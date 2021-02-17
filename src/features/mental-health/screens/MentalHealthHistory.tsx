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
import i18n from '@covid/locale/i18n';

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

  const next = () => {
    if (MentalHealthHistory.hasDiagnosis === 'NO' || MentalHealthHistory.hasDiagnosis === 'DECLINE_TO_SAY') {
      NavigatorService.navigate('MentalHealthLearning', undefined);
      return;
    }
    NavigatorService.navigate('MentalHealthSupport', undefined);
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
    const existingMentalHealthListForUser = await mentalHealthApiClient.get();
    const existingMentalHealth = existingMentalHealthListForUser[0];
    const updatedMentalHealth: MentalHealthInfosRequest = {
      id: existingMentalHealth.id ?? undefined,
      patient: existingMentalHealth.patient,
      ever_diagnosed_with_mental_health_condition: MentalHealthHistory.hasDiagnosis,

      // Map the list of additions to the BE counterpart booleans
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
      mania_hypomania_bipolar_manic_depression: MentalHealthHistory.conditions.includes('MANIA'),
      schizophrenia: MentalHealthHistory.conditions.includes('SCHIZOPHRENIA'),
      substance_use: MentalHealthHistory.conditions.includes('SUBSTANCE_USE_DISORDER'),
      psychosis_or_psychotic_illness: MentalHealthHistory.conditions.includes('TYPE_OF_PSYCHOSIS'),
      history_other: MentalHealthHistory.conditions.includes('OTHER'),
      history_prefer_not_to_say: MentalHealthHistory.conditions.includes('DECLINE_TO_SAY'),
    };
    await mentalHealthApiClient.update(existingMentalHealth.id, updatedMentalHealth);
    NavigatorService.navigate('MentalHealthLearning', undefined);
  };

  return (
    <BasicPage active={canSubmit} footerTitle="Next" onPress={saveStateAndNavigate}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text textClass="h3" rhythm={32}>
          {i18n.t('mental-health.question-history-title')}
        </Text>
        <View>
          <DropdownField
            label={i18n.t('mental-health.question-history')}
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
