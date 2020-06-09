import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';

import { RegularBoldText, RegularText } from '@covid/components/Text';
import { FieldWrapper } from '@covid/components/Screen';
import { BigButton } from '@covid/components/Button';
import { ModalContainer } from '@covid/components/ModalContainer';

type Props = {
  submitReason: (reason: string) => void;
};

export const ArchiveReasonModal: React.FC<Props> = (props) => {
  const reasons = [
    {
      text: 'Duplicate account',
      value: 'duplicate_account',
    },
    {
      text: "I don't want to report for them",
      value: 'no_longer_report',
    },
    {
      text: 'This person has passed away',
      value: 'passed_away',
    },
    {
      text: 'Prefer not to say',
      value: 'pfnts',
    },
  ];

  return (
    <ModalContainer>
      <RegularBoldText style={styles.ratingHeader}>Profile Archived</RegularBoldText>
      <RegularText style={styles.ratingText}>
        Help us understand why you archived this profile, so we can more accurately predict levels of COVID
      </RegularText>

      {reasons.map((reason, i) => {
        return (
          <FieldWrapper key={i}>
            <BigButton onPress={() => props.submitReason(reason.value)}>
              <Text>{reason.text}</Text>
            </BigButton>
          </FieldWrapper>
        );
      })}
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  ratingText: {
    paddingBottom: 30,
    marginHorizontal: 60,
    fontSize: 14,
    textAlign: 'center',
  },
  ratingHeader: {
    paddingBottom: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});
