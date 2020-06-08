import { AxiosResponse } from 'axios';

const NETWORK_ERROR = 'Network Error';
const CONNECTION_ABORTED = 'ECONNABORTED';
const TIMED_OUT = 'ETIMEDOUT';

const STATUS_NOT_FOUND = 404;
const STATUS_REQUEST_ERROR = 400;
const STATUS_SERVER_BUSY = 429;
const STATUS_SERVER_ERROR = 500;

type ReceivedError = {
  message: string;
  isAxiosError?: boolean;
  response?: AxiosResponse;
  code?: string;
};

export type ApiErrorState = {
  isApiError: boolean;
  error: AppException | null;
  status: string;
  onRetry?: () => void;
};

export const initialErrorState = {
  isApiError: false,
  error: null,
  status: '',
};

export class AppException extends Error {
  friendlyI18n: string | null;
  isRetryable = false;
  status: number;
}

class OfflineException extends AppException {
  isRetryable = true;
  friendlyI18n = 'errors.user-is-offline';
}

export class ApiException extends AppException {
  isApiException = true;
  response: AxiosResponse;

  constructor(message: string, status: number, i18nString: string | null = null) {
    super(message);
    this.message = message;
    this.status = status;
    this.friendlyI18n = i18nString ?? this.friendlyI18n;
  }
}
class RetryableApiException extends ApiException {
  isRetryable = true;
}

export const handleServiceError = (error: ReceivedError) => {
  if (error.isAxiosError && error.response) {
    switch (error.response.status) {
      case STATUS_NOT_FOUND:
        throw new ApiException(error.message, error.response.status, 'errors.resource-not-found');
      case STATUS_SERVER_BUSY:
        throw new RetryableApiException(error.message, error.response.status, 'errors.server-is-busy');
      case STATUS_SERVER_ERROR:
        throw new RetryableApiException(error.message, error.response.status, 'errors.server-error');
      default:
        console.log('[ERROR] Unhandled status:', error.response.status, ':', error.message);
        throw new ApiException(error.message, error.response.status);
    }
  } else if (error.message === NETWORK_ERROR) {
    throw new OfflineException(error.message);
  } else if (error.code && [CONNECTION_ABORTED, TIMED_OUT].includes(error.code)) {
    throw new OfflineException(error.message);
  } else {
    console.log('[ERROR] Unhandled error:', error.message);
  }

  // Rethrow error if we get here
  throw error;
};
