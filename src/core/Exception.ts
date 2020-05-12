export default class AppException extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AppException.prototype);
  }
}

// TODO: How to remove the boilerplate weight on creating each exception?
// Object.setPrototypeOf is necessary for exception types

export class UserNotFoundException extends AppException {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UserNotFoundException.prototype);
  }
}

export class UserNotAuthorisedException extends AppException {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UserNotAuthorisedException.prototype);
  }
}

export class ServiceError extends AppException {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ServiceError.prototype);
  }
}

export class EntityNotFoundException extends AppException {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, EntityNotFoundException.prototype);
  }
}
