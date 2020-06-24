import { useContext } from 'react';
import { interfaces, id } from 'inversify';

import AppException from '@covid/core/Exception';

import { InversifyContext } from './services.provider';

export class DependencyNotFoundException extends AppException {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DependencyNotFoundException.prototype);
  }
}

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
  const { container } = useContext(InversifyContext);
  if (!container) {
    throw new DependencyNotFoundException(`Did you forget to register a service with id: ${id}?`);
  }
  return container.get<T>(identifier);
}
