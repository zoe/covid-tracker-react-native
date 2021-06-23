import ProgressStatus from '@covid/components/ProgressStatus';
import { Header, ProgressBlock } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet } from 'react-native';

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
        <ProgressStatus color={colors.brand} maxSteps={maxSteps} step={currentStep} />
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
