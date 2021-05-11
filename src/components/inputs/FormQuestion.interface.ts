import * as Yup from 'yup';

export interface IFormQuestion<P, Data, Dto> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<Dto>;
}
