import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { BasicPage, CheckBoxButton, DropdownField, GenericSelectableList, Text } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import { useTheme } from '@covid/themes';
import {
  addLearningCondition,
  removeLearningCondition,
  setHasLearningDisability,
  selectMentalHealthLearning,
  THasDisability,
  TMentalHealthLearning,
} from '@covid/core/state/mental-health';
import { mentalHealthApiClient } from '@covid/Services';
import i18n from '@covid/locale/i18n';

import { TLearningQuestion, learningQuestions, learningInitialOptions } from '../data';
import { MentalHealthInfosRequest } from '../MentalHealthInfosRequest';

function MentalHealthLearning() {
  const MentalHealthLearning = useSelector(selectMentalHealthLearning);
  const [canSubmit, setCanSubmit] = useState(false);
  const dispatch = useDispatch();
  const { grid } = useTheme();

  const handleSetHasLearningDisability = (value: THasDisability) => {
    dispatch(setHasLearningDisability(value));
  };

  const getHasExistingCondition = (condition: TMentalHealthLearning) =>
    Object.values(MentalHealthLearning.conditions).includes(condition);

  const handleAddRemoveCondition = (condition: TMentalHealthLearning) => {
    const exists = getHasExistingCondition(condition);
    if (exists) {
      dispatch(removeLearningCondition(condition));
      return;
    }
    dispatch(addLearningCondition(condition));
  };

  const renderRow = (data: TLearningQuestion) => {
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
    if (MentalHealthLearning.hasDisability === 'NO' || MentalHealthLearning.hasDisability === 'DECLINE_TO_SAY') {
      setCanSubmit(true);
      return;
    }
    if (MentalHealthLearning.hasDisability === 'YES' && MentalHealthLearning.conditions.length) {
      setCanSubmit(true);
      return;
    }
    setCanSubmit(false);
  }, [MentalHealthLearning]);

  const saveStateAndNavigate = async () => {
    // // TODO: get existing mental health data, specifically ID, from state (Should be preloaded by here)
    const existingMentalHealthListForUser = await mentalHealthApiClient.get();
    const existingMentalHealth = existingMentalHealthListForUser[0];
    const updatedMentalHealth: MentalHealthInfosRequest = {
      id: existingMentalHealth.id,
      patient: existingMentalHealth.patient,
      about_your_learning_needs: MentalHealthLearning.hasDisability,

      // Map the list of additions to the BE counterpart booleans
      dyslexia: MentalHealthLearning.conditions.includes('DYSLEXIA'),
      dyscalculia: MentalHealthLearning.conditions.includes('DYSCALCULIA'),
      dysgraphia: MentalHealthLearning.conditions.includes('DYSGRAPHIA'),
      non_verbal: MentalHealthLearning.conditions.includes('NON-VERBAL'),
      oral: MentalHealthLearning.conditions.includes('ORAL_WRITTEN'),
      sensory_impairment: MentalHealthLearning.conditions.includes('SENSORY'),
      learning_other: MentalHealthLearning.conditions.includes('OTHER'),
      learning_prefer_not_to_say: MentalHealthLearning.conditions.includes('DECLINE_TO_SAY'),
    };

    await mentalHealthApiClient.update(existingMentalHealth.id, updatedMentalHealth);
    NavigatorService.navigate('MentalHealthEnd', undefined);
  };

  return (
    <BasicPage active={canSubmit} footerTitle="Next" onPress={() => saveStateAndNavigate()}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text textClass="h3" rhythm={32}>
          {i18n.t('mental-health.question-learning-title')}
        </Text>
        <View>
          <DropdownField
            label={i18n.t('mental-health.question-learning')}
            selectedValue={MentalHealthLearning.hasDisability}
            onValueChange={handleSetHasLearningDisability}
            items={learningInitialOptions}
          />
        </View>
        {MentalHealthLearning.hasDisability === 'YES' && (
          <GenericSelectableList
            collection={learningQuestions}
            onPress={(data) => handleAddRemoveCondition(data.value)}
            renderRow={(data) => renderRow(data)}
            style={{ paddingBottom: grid.s, paddingTop: grid.s }}
          />
        )}
      </View>
    </BasicPage>
  );
}

export default MentalHealthLearning;
