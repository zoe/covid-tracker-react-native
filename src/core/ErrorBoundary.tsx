import React from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import * as Sentry from 'sentry-expo';

import { Header3Text, RegularBoldText, RegularText } from '@covid/components/Text';
import { colors } from '@theme';
import { covidIcon } from '@assets';
import i18n from '@covid/locale/i18n';

const myErrorHandler = (error: Error, componentStack: string, eventId: string) => {
  Sentry.Native.captureException(error);
};
function ErrorFallback(errorData: {
  error: Error;
  componentStack: string | null;
  eventId: string | null;
  resetError(): void;
}) {
  return (
    <View style={[styles.outerContainer]}>
      <View style={[styles.innerContainer]}>
        <Image source={covidIcon} style={styles.logo} />
        <Header3Text>{i18n.t('error-boundary.something-went-wrong')}</Header3Text>
        <RegularText>{'\n' + i18n.t('error-boundary.encountered-error')}</RegularText>
        <RegularBoldText>'{errorData.error.message}'</RegularBoldText>
        <RegularText>{'\n' + i18n.t('error-boundary.notified')}</RegularText>
      </View>
    </View>
  );
}
export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <Sentry.Native.ErrorBoundary fallback={ErrorFallback} onError={myErrorHandler}>
    {children}
  </Sentry.Native.ErrorBoundary>
);
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  innerContainer: {
    margin: 16,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 12,
  },
  logo: {
    resizeMode: 'contain',
    height: 70,
    width: 70,
    marginBottom: 8,
  },
});
