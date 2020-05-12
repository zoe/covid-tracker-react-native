import { AxiosResponse } from 'axios';

const NETWORK_ERROR = 'Network Error';

const STATUS_NOT_FOUND = 404;
const STATUS_SERVER_BUSY = 429;

type ReceivedError = {
  message: string;
  isAxiosError?: boolean;
  response?: AxiosResponse;
};

class OfflineException extends Error {}
export class ApiException extends Error {
  isApiException = true;
  isRetryable = false;
  response: AxiosResponse;

  constructor(message: string, response: any) {
    super(message);
    this.message = message;
    this.response = response;
  }
}
class RetryableApiException extends ApiException {
  isRetryable = true;
}
class ServerBusyException extends RetryableApiException {}

export const handleServiceError = (error: ReceivedError) => {
  if (error.isAxiosError && error.response) {
    switch (error.response.status) {
      case STATUS_SERVER_BUSY:
      case STATUS_NOT_FOUND:
        throw new ServerBusyException(error.message, error.response);
      case STATUS_NOT_FOUND:
        throw new ApiException(error.message, error.response);
      default:
        console.log('[ERROR] Unhandled:', error.response.status, ':', error.message);
        throw error;
    }
  } else if (error.message === NETWORK_ERROR) {
    throw new OfflineException(error.message);
  }

  // Rethrow error if we get here
  throw error;
};
