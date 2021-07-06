import { BasicPage, CheckBoxButton, GenericSelectableList, Text } from '@covid/components';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import {
  addHistoryCondition,
  removeHistoryCondition,
  selectMentalHealthHistory,
  setHasHistoryDiagnosis,
  setHistoryOtherText,
  THasDiagnosis,
  TMentalHealthCondition,
} from '@covid/core/state/mental-health';
import { initialOptions, questions, TQuestion } from '@covid/features/mental-health/data';
import { MentalHealthInfosRequest } from '@covid/features/mental-health/MentalHealthInfosRequest';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { mentalHealthApiClient } from '@covid/services';
import { useTheme } from '@covid/themes';
import * as React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function MentalHealthHistoryScreen() {
  const MentalHealthHistory = useSelector(selectMentalHealthHistory);
  const [canSubmit, setCanSubmit] = React.useState(false);
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
            onPress={() => handleAddRemoveCondition(data.value)}
          />
        </View>

        <View style={{ flex: 1, paddingRight: grid.s }}>
          <Text>{data.key}</Text>
        </View>
      </View>
    );
  };

  const next = () => {
    NavigatorService.navigate('MentalHealthSupport', undefined);
  };

  React.useEffect(() => {
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
    const updatedMentalHealth: MentalHealthInfosRequest = mentalHealthApiClient.buildRequestObject(
      existingMentalHealth,
      { mentalHealthHistory: MentalHealthHistory },
    );
    await mentalHealthApiClient.update(updatedMentalHealth);
    next();
  };

  const renderOtherTextInput = MentalHealthHistory.conditions.includes('OTHER') ? (
    <ValidatedTextInput
      onChangeText={(text: string) => {
        dispatch(setHistoryOtherText(text));
      }}
      placeholder={i18n.t('mental-health.specify-other')}
      value={MentalHealthHistory.otherText}
    />
  ) : null;

  return (
    <BasicPage active={canSubmit} footerTitle={i18n.t('navigation.next')} onPress={saveStateAndNavigate}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text rhythm={16} textClass="h3">
          {i18n.t('mental-health.question-history-title')}
        </Text>
        <RadioInput
          items={initialOptions}
          label={i18n.t('mental-health.question-history')}
          onValueChange={handleSetHasHistoryDiagnosis}
          selectedValue={MentalHealthHistory.hasDiagnosis}
        />
        {MentalHealthHistory.hasDiagnosis === 'YES' ? (
          <>
            <GenericSelectableList
              collection={questions}
              onPress={(data) => handleAddRemoveCondition(data.value)}
              renderRow={(data) => renderRow(data)}
              style={{ paddingBottom: grid.s, paddingTop: grid.s }}
            />
            {renderOtherTextInput}
          </>
        ) : null}
      </View>
    </BasicPage>
  );
}
