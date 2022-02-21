/* eslint-disable max-classes-per-file */
import i18n from '@covid/locale/i18n';
import { AxiosResponse } from 'axios';

export const NETWORK_ERROR = 'Network Error';
export const CONNECTION_ABORTED = 'ECONNABORTED';
export const TIMED_OUT = 'ETIMEDOUT';

export const STATUS_NOT_FOUND = 404;
export const STATUS_UNAUTHORIZED = 401;
export const STATUS_SERVER_BUSY = 429;
export const STATUS_SERVER_ERROR = 500;

export type TReceivedError = {
  message: string;
  isAxiosError?: boolean;
  response?: AxiosResponse;
  code?: string;
};

export type TApiErrorState = {
  isApiError: boolean;
  error: AppException | null;
  status: string;
  onRetry?: () => void;
};

export const initialErrorState = {
  error: null,
  isApiError: false,
  status: '',
};

export class AppException extends Error {
  isRetryable = false;

  status: number;
}

class OfflineException extends AppException {
  isRetryable = true;
}

export class ApiException extends AppException {
  response: AxiosResponse;

  constructor(message: string, status: number, fallbackMessage: string) {
    super(message || fallbackMessage);
    this.message = message || fallbackMessage;
    this.status = status;
  }
}
class RetryableApiException extends ApiException {
  isRetryable = true;
}

export const handleServiceError = (error: TReceivedError) => {
  if (error.isAxiosError && error.response) {
    switch (error.response.status) {
      case STATUS_NOT_FOUND:
      case STATUS_UNAUTHORIZED:
        throw new RetryableApiException(error.message, error.response.status, i18n.t('errors.resource-not-found'));
      case STATUS_SERVER_BUSY:
        throw new RetryableApiException(error.message, error.response.status, i18n.t('errors.server-is-busy'));
      case STATUS_SERVER_ERROR:
        throw new RetryableApiException(error.message, error.response.status, i18n.t('errors.server-error'));
      default:
        throw new ApiException(error.message, error.response.status, i18n.t('errors.user-is-offline'));
    }
  } else if (error.message === NETWORK_ERROR) {
    throw new OfflineException(error.message);
  } else if (error.code && [CONNECTION_ABORTED, TIMED_OUT].includes(error.code)) {
    throw new OfflineException(error.message);
  }

  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw error;
};
