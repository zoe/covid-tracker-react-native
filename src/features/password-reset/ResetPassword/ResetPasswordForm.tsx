import { BrandedButton, ErrorText, HeaderText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import i18n from '@covid/locale/i18n';
import { Form } from 'native-base';
import React, { FC } from 'react';
import { View } from 'react-native';

import styles from './styles';

export interface Props {
  values: {
    email: string;
  };
  touched: {
    email?: boolean;
  };
  errors: {
    email?: string;
  };
  errorMessage?: string;
  handleChange: (field: string) => (text: string) => void;
  handleBlur: (field: string) => () => void;
  handleSubmit: () => void;
}

const ResetPasswordForm: FC<Props> = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  errorMessage,
}) => (
  <View>
    <View style={styles.formItem}>
      <HeaderText>{i18n.t('reset-password.title')}</HeaderText>
      <Form>
        <ValidatedTextInput
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="email"
          placeholder={i18n.t('reset-password.email-label')}
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          error={touched.email && errors.email}
          returnKeyType="go"
        />

        {touched.email && errors.email && <ErrorText> {i18n.t('reset-password.email-error')}</ErrorText>}
      </Form>
    </View>
    <View>
      <ErrorText>{errorMessage}</ErrorText>
    </View>

    <View>
      <BrandedButton onPress={handleSubmit}>{i18n.t('reset-password.button')}</BrandedButton>
    </View>
  </View>
);

export default React.memo(ResetPasswordForm);
