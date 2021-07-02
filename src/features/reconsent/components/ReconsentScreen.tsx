import { SafeLayout, Text } from '@covid/components';
import { BrandedButton } from '@covid/components/buttons';
import { FormWrapper } from '@covid/components/Forms';
import { grid, styling, useTheme } from '@covid/themes';
import { colors } from '@theme';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface IProps {
  buttonTitle: string;
  buttonOnPress: onNextClickedType;
  children?: React.ReactNode;
  secondaryButtonTitle?: string;
  secondaryButtonOnPress?: () => void;
}

interface IDiseasePreferencesData {
  diabetes: boolean;
  cvd: boolean;
}

type onNextClickedType = OnFormSubmitCallback | OnNextClickedCallback;
type OnFormSubmitCallback = (arg1?: IDiseasePreferencesData) => void;
type OnNextClickedCallback = () => void;

// TODO: Do we need any validation?

export default function ReconsentScreen(props: IProps) {
  const theme = useTheme();

  return (
    <SafeLayout style={styles.safeLayout}>
      <ScrollView contentContainerStyle={styling.flexGrow} style={{ paddingHorizontal: theme.grid.xxl }}>
        <Formik
          validateOnChange
          initialValues={{ diabetes: false, cvd: false }}
          onSubmit={(formData: IDiseasePreferencesData) => props.buttonOnPress(formData)}
        >
          {(formProps: FormikProps<IDiseasePreferencesData>) => (
            <FormWrapper>
              {props.children}
              <BrandedButton enable onPress={formProps.handleSubmit} style={styles.button}>
                {props.buttonTitle}
              </BrandedButton>
              <Text onPress={props.secondaryButtonOnPress} style={styles.secondaryButton} textClass="pLight">
                {props.secondaryButtonTitle}
              </Text>
            </FormWrapper>
          )}
        </Formik>
      </ScrollView>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
    marginTop: 'auto',
  },
  safeLayout: {
    backgroundColor: colors.backgroundPrimary,
  },
  secondaryButton: {
    color: colors.secondary,
    marginTop: grid.xxxl,
    paddingHorizontal: grid.xs,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
