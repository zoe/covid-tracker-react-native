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
import i18n from '@covid/locale/i18n';

import { TQuestion, questions, initialOptions } from '../data';

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

  return (
    <BasicPage active={canSubmit} footerTitle="Next" onPress={next}>
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
