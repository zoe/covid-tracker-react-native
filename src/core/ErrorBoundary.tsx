import { errors } from '@assets';
import { Header3Text, RegularBoldText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as Sentry from 'sentry-expo';

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
        <Image source={errors} style={styles.logo} />
        <Header3Text>{i18n.t('error-boundary.something-went-wrong')}</Header3Text>
        <RegularText>{`\n${i18n.t('error-boundary.encountered-error')}`}</RegularText>
        <RegularBoldText>'{errorData.error.message}'</RegularBoldText>
        <RegularText>{`\n${i18n.t('error-boundary.notified')}`}</RegularText>
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
  innerContainer: {
    alignContent: 'center',
    backgroundColor: colors.backgroundPrimary,
    justifyContent: 'center',
    margin: 16,
    padding: 12,
  },
  logo: {
    marginBottom: 32,
    resizeMode: 'contain',
  },
  outerContainer: {
    alignContent: 'center',
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
    justifyContent: 'center',
  },
});
