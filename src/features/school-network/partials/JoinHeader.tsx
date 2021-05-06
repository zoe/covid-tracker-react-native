import React from 'react';
import { StyleSheet } from 'react-native';

import ProgressStatus from '@covid/components/ProgressStatus';
import { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { colors } from '@covid/theme';

interface IProps {
  headerText: string;
  bodyText: string;
  currentStep: number;
  maxSteps: number;
}

function JoinHeader({ headerText, bodyText, currentStep, maxSteps }: IProps) {
  return (
    <>
      <Header>
        <HeaderText>{i18n.t(headerText)}</HeaderText>
        <RegularText style={styles.spacer}>{i18n.t(bodyText)}</RegularText>
      </Header>
      <ProgressBlock>
        <ProgressStatus step={currentStep} maxSteps={maxSteps} color={colors.brand} />
      </ProgressBlock>
    </>
  );
}

const styles = StyleSheet.create({
  spacer: {
    marginTop: 16,
  },
});

export default JoinHeader;
