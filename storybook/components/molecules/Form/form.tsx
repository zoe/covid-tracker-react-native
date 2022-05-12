import { grid } from '@tracer/branding/grid';
import { Formik, FormikProps, FormikValues } from 'formik';
import React, { Children, cloneElement, isValidElement } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export interface IFormProps {
  initValues: object;
  validationSchema?: object;
  children: any;
  style?: StyleProp<ViewStyle>;
  ref: any;
  onSubmit?: (values: FormikValues) => void;
  testID?: string;
}

/**
 * Form
 *
 * @param initValues form input initial values
 * @param validationSchema (optional) form input validation rules
 * @param children: form input components
 * @param style (optional) custom styling, to override default form view
 * @param onSubmit form submission handler
 * @param testID (optional) form test ID
 */
export default function Form({ initValues = { text: '' }, ref, children }: IFormProps) {
  return (
    <Formik
      initialValues={initValues}
      innerRef={ref}
      onSubmit={(submitted: FormikValues) => {
        // eslint-disable-next-line no-console
        console.log('submitted', submitted);
      }}
      style={baseStyle.view}
    >
      {({ handleChange, handleSubmit, values }: FormikProps<FormikValues>) => {
        // handleSubmit = ()
        return (
          <View style={{ paddingHorizontal: grid.g24 }}>
            {Children.map(children, (child: any) => {
              if (!isValidElement(child)) return null;
              return cloneElement<any>(child, {
                form: values,
                handleChange,
              });
            })}
          </View>
        );
      }}
    </Formik>
  );
}

const baseStyle = StyleSheet.create({
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
  },
});
