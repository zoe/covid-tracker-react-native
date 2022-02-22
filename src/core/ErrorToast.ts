import {
  CONNECTION_ABORTED,
  NETWORK_ERROR,
  STATUS_NOT_FOUND,
  STATUS_SERVER_BUSY,
  STATUS_SERVER_ERROR,
  STATUS_UNAUTHORIZED,
  TIMED_OUT,
  TReceivedError,
} from '@covid/core/api/ApiServiceErrors';
import i18n from '@covid/locale/i18n';
import Toast, { ToastShowParams } from 'react-native-toast-message';

export const showErrorToast = (error: TReceivedError) => {
  let errorMessage = i18n.t('errors.try-again');

  if (error.isAxiosError && error.response) {
    switch (error.response.status) {
      case STATUS_NOT_FOUND:
        errorMessage = i18n.t('errors.404-error');
        break;
      case STATUS_UNAUTHORIZED:
        errorMessage = i18n.t('errors.resource-not-found');
        break;
      case STATUS_SERVER_BUSY:
        errorMessage = i18n.t('errors.server-is-busy');
        break;
      case STATUS_SERVER_ERROR:
        errorMessage = i18n.t('errors.server-error');
        break;
      default:
        errorMessage = i18n.t('errors.try-again');
    }
  } else if (error.message === NETWORK_ERROR) {
    errorMessage = i18n.t('errors.user-is-offline');
  } else if (error.code && [CONNECTION_ABORTED, TIMED_OUT].includes(error.code)) {
    errorMessage = i18n.t('errors.user-is-offline');
  }

  const toastSettings: ToastShowParams = {
    position: 'bottom',
    text1: i18n.t('errors.something-went-wrong'),
    text2: errorMessage,
    type: 'customError',
    visibilityTime: 10000,
  };

  return Toast.show(toastSettings);
};
