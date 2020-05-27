import { AppException } from '@covid/core/api/ApiServiceErrors';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import React from 'react';
import { View, StyleSheet, ActivityIndicator, Modal } from 'react-native';

import { ErrorText, BrandedButton, RegularText } from './Text';

type LoadingProps = {
  error: AppException | null;
  status?: string;
  style?: StyleSheet | object;
  onRetry?: () => void;
  onPress?: () => void;
};

const ErrorMessaging = ({ error, status, onRetry, onPress }: LoadingProps) => {
  let messageKey: string | null = null;
  let message: string | null = null;
  let shouldRetry = false;
  let shouldCancel = true;

  if (error) {
    messageKey = error.friendlyI18n;
    message = messageKey && i18n.t(messageKey);
    shouldRetry = !!error.isRetryable && !!onRetry;
    shouldCancel = !shouldRetry && !!error;
  }

  const showRetry = shouldRetry && !!onRetry;
  return (
    <View>
      {!!message && <ErrorText style={{ color: colors.coral }}>{message}</ErrorText>}
      {!message && !!status && <RegularText>{status}</RegularText>}
      {shouldRetry && !!onRetry && (
        <View style={styles.ctaBlock}>
          <BrandedButton onPress={onRetry}>{i18n.t('errors.button-retry')}</BrandedButton>
        </View>
      )}
      {shouldCancel && !!error && !!onPress && (
        <View style={styles.ctaBlock}>
          <BrandedButton onPress={onPress}>{i18n.t('errors.button-okay')}</BrandedButton>
        </View>
      )}
    </View>
  );
};

export const Loading = (props: LoadingProps) => {
  return (
    <View style={styles.loadingView}>
      {props.error ? (
        <ErrorMessaging {...props} />
      ) : (
        <>
          <ActivityIndicator size="large" color={colors.predict} />
          <RegularText>{props.status}</RegularText>
        </>
      )}
    </View>
  );
};

export const LoadingModal = (props: LoadingProps) => {
  let messageKey: string | null = null;
  let message: string | null = null;
  let shouldRetry = false;

  if (props.error) {
    messageKey = props.error.friendlyI18n;
    message = messageKey && i18n.t(messageKey);
    shouldRetry = !!props.error.isRetryable && !!props.onRetry;
  }

  return (
    <Modal visible transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color={colors.predict} />
          <ErrorMessaging {...props} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
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
