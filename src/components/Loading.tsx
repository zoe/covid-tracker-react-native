import { BrandedButton } from '@covid/components/buttons';
import { AppException } from '@covid/core/api/ApiServiceErrors';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { ActivityIndicator, Modal, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { ErrorText, RegularText } from './Text';

type TProps = {
  error: AppException | null;
  status?: string;
  onRetry?: () => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const ErrorMessaging = ({ error, status, onRetry, onPress }: TProps) => {
  let message = '';
  let shouldRetry = false;
  let shouldCancel = true;

  if (error) {
    message = error.message;
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

export const Loading = (props: TProps) => {
  return (
    <View style={[styles.loadingView, props.style]}>
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

export const LoadingModal = (props: TProps) => {
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
    marginTop: sizes.l,
  },
  ctaBlock: {
    margin: sizes.s,
  },
  loadingView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    marginVertical: sizes.s,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: sizes.l,
    elevation: 5,
    margin: sizes.l,
    padding: sizes.xl,
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
