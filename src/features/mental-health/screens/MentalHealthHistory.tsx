import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { BasicPage, DropdownField, Text } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';
import { useTheme } from '@covid/themes';
import { selectMentalHealthHistory, setHasHistoryDiagnosis } from '@covid/core/state/mental-health';

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
        {MentalHealthHistory.hasDiagnosis && <Text>Show the questions</Text>}
      </View>
    </BasicPage>
  );
}

export default MentalHealthHistory;
