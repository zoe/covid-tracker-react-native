import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

import { RegularBoldText, RegularText } from '@covid/components/Text';
import { FieldWrapper } from '@covid/components/Screen';
import { BigButton } from '@covid/components/Button';
import { ModalContainer } from '@covid/components/ModalContainer';
import i18n from '@covid/locale/i18n';

type Props = {
  submitReason: (reason: string) => void;
};

export const ArchiveReasonModal: React.FC<Props> = (props) => {
  const reasons = [
    {
      text: i18n.t('archive-reason.choice-duplicate-account'),
      value: 'duplicate_account',
    },
    {
      text: i18n.t('archive-reason.choice-no-report'),
      value: 'no_longer_report',
    },
    {
      text: i18n.t('archive-reason.choice-moved-away'),
      value: 'moved_away',
    },
    {
      text: i18n.t('archive-reason.choice-passed-away'),
      value: 'passed_away',
    },
    {
      text: i18n.t('archive-reason.choice-other'),
      value: 'other',
    },
    {
      text: i18n.t('archive-reason.choice-pfnts'),
      value: 'pfnts',
    },
  ];

  return (
    <ModalContainer>
      <RegularBoldText style={styles.ratingHeader}>{i18n.t('archive-reason.title')}</RegularBoldText>

      <View style={{ paddingHorizontal: 20 }}>
        <RegularText>{i18n.t('archive-reason.text')}</RegularText>
        <RegularText style={{ marginTop: 20 }}>{i18n.t('archive-reason.text2')}</RegularText>

        {reasons.map((reason, i) => {
          return (
            <FieldWrapper key={i}>
              <BigButton onPress={() => props.submitReason(reason.value)}>
                <RegularText>{reason.text}</RegularText>
              </BigButton>
            </FieldWrapper>
          );
        })}
      </View>
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
