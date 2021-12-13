import * as React from 'react';
import * as Yup from 'yup';

export interface IFormQuestion<P, Data, Dto> extends React.FC<P> {
  getInitialFormValues: () => Data;
  createValidationSchema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<Dto>;
}
