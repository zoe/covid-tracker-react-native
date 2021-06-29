import { Container } from 'inversify';
import * as React from 'react';

export const InversifyContext = React.createContext<{ container: Container | null }>({ container: null });

interface Props {
  container: Container;
}

export const ServicesProvider: React.FC<Props> = ({ container, children }) => {
  return <InversifyContext.Provider value={{ container }}>{children}</InversifyContext.Provider>;
};
