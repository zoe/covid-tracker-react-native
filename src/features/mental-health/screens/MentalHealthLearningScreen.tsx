import { CheckBoxButton, GenericSelectableList, Text } from '@covid/components';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { Screen } from '@covid/components/Screen';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import {
  addLearningCondition,
  removeLearningCondition,
  selectMentalHealthLearning,
  setHasLearningDisability,
  setLearningOtherText,
  THasDisability,
  TMentalHealthLearning,
} from '@covid/core/state/mental-health';
import { learningInitialOptions, learningQuestions, TLearningQuestion } from '@covid/features/mental-health/data';
import { mentalHealthApiClient } from '@covid/features/mental-health/MentalHealthApiClient';
import { TMentalHealthInfosRequest } from '@covid/features/mental-health/MentalHealthInfosRequest';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function MentalHealthLearningScreen() {
  const MentalHealthLearning = useSelector(selectMentalHealthLearning);
  const [canSubmit, setCanSubmit] = React.useState(false);
  const dispatch = useDispatch();

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
        <View style={{ marginRight: sizes.m }}>
          <CheckBoxButton
            active={getHasExistingCondition(data.value)}
            onPress={() => handleAddRemoveCondition(data.value)}
          />
        </View>
        <View style={{ flex: 1, paddingRight: sizes.xs }}>
          <Text>{data.key}</Text>
        </View>
      </View>
    );
  };

  React.useEffect(() => {
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
    const updatedMentalHealth: TMentalHealthInfosRequest = mentalHealthApiClient.buildRequestObject(
      existingMentalHealth,
      { mentalHealthLearning: MentalHealthLearning },
    );
    await mentalHealthApiClient.update(updatedMentalHealth);
    NavigatorService.navigate('MentalHealthEnd', undefined);
  };

  const renderOtherTextInput = MentalHealthLearning.conditions.includes('OTHER') ? (
    <ValidatedTextInput
      onChangeText={(text: string) => {
        dispatch(setLearningOtherText(text));
      }}
      placeholder={i18n.t('mental-health.specify-other')}
      value={MentalHealthLearning.otherText}
    />
  ) : null;

  return (
    <Screen
      backgroundColor={colors.backgroundTertiary}
      footerEnabled={canSubmit}
      footerOnPress={saveStateAndNavigate}
      footerTitle={i18n.t('navigation.next')}
      testID="mental-health-learning-screen"
    >
      <Text rhythm={16} textClass="h3">
        {i18n.t('mental-health.question-learning-title')}
      </Text>
      <View>
        <RadioInput
          items={learningInitialOptions}
          label={i18n.t('mental-health.question-learning')}
          onValueChange={handleSetHasLearningDisability}
          selectedValue={MentalHealthLearning.hasDisability}
        />
      </View>
      {MentalHealthLearning.hasDisability === 'YES' ? (
        <>
          <GenericSelectableList
            collection={learningQuestions}
            onPress={(data) => handleAddRemoveCondition(data.value)}
            renderRow={(data) => renderRow(data)}
            style={{ paddingBottom: sizes.xs, paddingTop: sizes.xs }}
          />
          {renderOtherTextInput}
        </>
      ) : null}
    </Screen>
  );
}
