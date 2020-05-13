import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { AppException } from '../core/ApiServiceErrors';
import { colors } from '../../theme';
import { ErrorText, BrandedButton, RegularText } from './Text';
import i18n from '../locale/i18n';

type LoadingProps = {
  error: AppException | null;
  status: string;
  style: StyleSheet | object;
  onRetry?: () => void;
};

export const Loading = ({ error, status, onRetry }: LoadingProps) => {
  let messageKey: string | null = null;
  let message: string | null = null;
  let shouldRetry = false;

  if (error) {
    messageKey = error.friendlyI18n;
    message = messageKey && i18n.t(messageKey);
    shouldRetry = !!error.isRetryable && !!onRetry;
  }

  return (
    <View style={styles.loadingView}>
      {!!error ? (
        <View>
          {!!message && <ErrorText>{message}</ErrorText>}
          {!message && status && <RegularText>{status}</RegularText>}
          {shouldRetry && !!onRetry && (
            <View style={styles.ctaBlock}>
              <BrandedButton onPress={onRetry}>{i18n.t("errors.button-retry")}</BrandedButton>
            </View>
          )}
        </View>
      ) : (
        <>
          <ActivityIndicator size="large" color={colors.predict} />
          <RegularText>{status}</RegularText>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingView: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
  },
  ctaBlock: {
    margin: 10,
  },
});
