import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableHighlight } from 'react-native';
import { Form, Text, View } from 'native-base';

import Navigator from '@covid/features/Navigation';
import { RegularBoldText, RegularText } from '@covid/components/Text';
import { colors } from '@theme';
import { FieldWrapper } from '@covid/components/Screen';
import { BigButton } from '@covid/components/Button';
import i18n from '@covid/locale/i18n';

type Props = {
  submitReason: (string) => void;
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

  function saveReason(value: string) {
    const payload = {};
  }

  return (
    <Modal transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
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
        </View>
      </View>
    </Modal>
  );
};

const actionButtonBorder = 'rgba(240, 240, 240, 1)';
const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 35,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  verticalDivider: {
    height: '100%',
    width: 1,
    backgroundColor: actionButtonBorder,
  },
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
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: actionButtonBorder,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.linkBlue,
  },
  ratingButton: {
    width: '50%',
    height: 60,
    justifyContent: 'center',
    color: colors.linkBlue,
  },
});
