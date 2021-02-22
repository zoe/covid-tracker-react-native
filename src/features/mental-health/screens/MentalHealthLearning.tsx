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
  setLearningOtherText,
  selectMentalHealthLearning,
  THasDisability,
  TMentalHealthLearning,
} from '@covid/core/state/mental-health';
import { mentalHealthApiClient } from '@covid/Services';
import i18n from '@covid/locale/i18n';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { events, track } from '@covid/core/Analytics';

import { TLearningQuestion, learningQuestions, learningInitialOptions } from '../data';
import { MentalHealthInfosRequest } from '../MentalHealthInfosRequest';

function MentalHealthLearning() {
  const MentalHealthLearning = useSelector(selectMentalHealthLearning);
  const [tracked, setTracked] = useState(false);
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
            onPress={() => handleAddRemoveCondition(data.value)}
          />
        </View>
        <View style={{ flex: 1, paddingRight: grid.s }}>
          <Text>{data.key}</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    if (!tracked) {
      track(events.MENTAL_HEALTH_SCREEN_LEARNING);
      setTracked(true);
    }
  });

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
    const existingMentalHealthListForUser = await mentalHealthApiClient.get();
    const existingMentalHealth = existingMentalHealthListForUser[0];
    const updatedMentalHealth: MentalHealthInfosRequest = mentalHealthApiClient.buildRequestObject(
      existingMentalHealth,
      { mentalHealthLearning: MentalHealthLearning }
    );
    await mentalHealthApiClient.update(updatedMentalHealth);
    NavigatorService.navigate('MentalHealthEnd', undefined);
  };

  const renderOtherTextInput = MentalHealthLearning.conditions.includes('OTHER') ? (
    <ValidatedTextInput
      placeholder={i18n.t('mental-health.specify-other')}
      value={MentalHealthLearning.otherText}
      onChangeText={(text: string) => {
        dispatch(setLearningOtherText(text));
      }}
    />
  ) : null;

  return (
    <BasicPage active={canSubmit} footerTitle={i18n.t('navigation.next')} onPress={saveStateAndNavigate}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text textClass="h3" rhythm={16}>
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
          <>
            <GenericSelectableList
              collection={learningQuestions}
              onPress={(data) => handleAddRemoveCondition(data.value)}
              renderRow={(data) => renderRow(data)}
              style={{ paddingBottom: grid.s, paddingTop: grid.s }}
            />
            {renderOtherTextInput}
          </>
        )}
      </View>
    </BasicPage>
  );
}

export default MentalHealthLearning;
