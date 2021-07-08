import { BrandedButton } from '@covid/components/buttons';
import { AppException } from '@covid/core/api/ApiServiceErrors';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import * as React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

import { ErrorText, RegularText } from './Text';

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

  return (
    <View>
      {message ? <ErrorText style={{ color: colors.coral }}>{message}</ErrorText> : null}
      {!message ? !!status && <RegularText>{status}</RegularText> : null}
      {shouldRetry && !!onRetry ? (
        <View style={styles.ctaBlock}>
          <BrandedButton onPress={onRetry}>{i18n.t('errors.button-retry')}</BrandedButton>
        </View>
      ) : null}
      {shouldCancel && !!error && !!onPress ? (
        <View style={styles.ctaBlock}>
          <BrandedButton onPress={onPress}>{i18n.t('errors.button-okay')}</BrandedButton>
        </View>
      ) : null}
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
          <ActivityIndicator color={colors.predict} size="large" />
          <RegularText>{props.status}</RegularText>
        </>
      )}
    </View>
  );
};

export const LoadingModal = (props: LoadingProps) => {
  return (
    <Modal transparent visible>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator color={colors.predict} size="large" />
          <ErrorMessaging {...props} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  ctaBlock: {
    margin: 10,
  },
  loadingView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    marginVertical: 10,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '90%',
  },
});
