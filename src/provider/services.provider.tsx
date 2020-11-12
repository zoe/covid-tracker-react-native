import React from 'react';
import { Container } from 'inversify';

export const InversifyContext = React.createContext<{ container: Container | null }>({ container: null });

interface Props {
  container: Container;
}

export const Provider: React.FC<Props> = ({ container, children }) => {
  return <InversifyContext.Provider value={{ container }}>{children}</InversifyContext.Provider>;
};
