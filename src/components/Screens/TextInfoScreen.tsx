import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { colors } from '@theme';
import { BrandedButton, HeaderText, RegularText, SecondaryText } from '@covid/components/Text';
import Screen, { Header } from '@covid/components/Screen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { Profile } from '@covid/components/Collections/ProfileList';

interface Props {
  // Screen
  navigation?: StackNavigationProp<ScreenParamList>;
  profile?: Profile;

  // Text info
  headerLabel: string;
  primaryLabel: string;
  secondaryLabel: string;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  bottomButtonLabel?: string;
  primaryButtonAction: VoidFunction;
  secondaryButtonAction?: VoidFunction;
  bottomButtonAction?: VoidFunction;
  bottomView?: React.ReactNode;
}

export const TextInfoScreen: React.FC<Props> = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}>
      <Screen profile={props.profile} navigation={props.navigation}>
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
          <View style={styles.contentContainer}>
            <Header>
              <HeaderText style={styles.header}>{props.headerLabel}</HeaderText>
            </Header>
            <View style={styles.textContainer}>
              <RegularText style={styles.primaryLabel}>{props.primaryLabel}</RegularText>
              {!!props.secondaryLabel && (
                <SecondaryText style={styles.secondaryLabel}>{props.secondaryLabel}</SecondaryText>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <BrandedButton style={styles.primaryButton} onPress={props.primaryButtonAction}>
                <RegularText style={styles.primaryButtonText}>{props.primaryButtonLabel}</RegularText>
              </BrandedButton>
              {!!props.secondaryButtonLabel && !!props.secondaryButtonAction && (
                <BrandedButton style={styles.secondaryButton} onPress={props.secondaryButtonAction}>
                  <RegularText style={styles.secondaryButtonText}>{props.secondaryButtonLabel}</RegularText>
                </BrandedButton>
              )}
            </View>
          </View>
        </View>
      </Screen>
      {!!props.bottomView && props.bottomView}
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  header: {
    textAlign: 'center',
  },
  textContainer: {},
  primaryLabel: {
    textAlign: 'center',
    marginBottom: 24,
  },
  secondaryLabel: {
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 32,
    alignItems: 'center',
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: colors.purple,
  },
  secondaryButton: {
    marginTop: 16,
    backgroundColor: colors.backgroundTertiary,
  },
  primaryButtonText: {
    color: colors.white,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
});
