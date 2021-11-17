import { BrandedButton, TextareaWithCharCount } from '@covid/components';
import { Form } from '@covid/components/Form';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { Screen } from '@covid/components/Screen';
import { ErrorText, HeaderText, SecondaryText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features';
import { CovidTestDateQuestion, ICovidTestDateData } from '@covid/features/covid-tests/questions';
import { PingdemicApiClient } from '@covid/features/pingdemic/PingdemicApiClient';
import { TPingdemicRequest } from '@covid/features/pingdemic/PingdemicRequest';
import i18n from '@covid/locale/i18n';
import { sizes, styling } from '@covid/themes';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { Formik, FormikProps } from 'formik';
import moment from 'moment';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

const pingdemicApiClient = new PingdemicApiClient();

type TSelectionOption = {
  label: string;
  value: string;
};

interface IPingdemicData extends ICovidTestDateData {
  appActiveWithBluetooth?: string;
  askedByApp?: string;
  haveApp?: string;
  otherText?: string;
}

type TProps = {
  route: RouteProp<ScreenParamList, 'Pingdemic'>;
};

const initialFormValues = {
  appActive: undefined,
  askedByApp: undefined,
  dateTakenBetweenEnd: undefined,
  dateTakenBetweenStart: undefined,
  dateTakenSpecific: undefined,
  haveApp: undefined,
  useApproximateDate: undefined,
} as IPingdemicData;

const ValidationSchema = () => {
  return Yup.object().shape({
    appActiveWithBluetooth: Yup.string().when('haveApp', {
      is: 'yes',
      then: Yup.string().required(i18n.t('validation-error-text-required')),
    }),

    askedByApp: Yup.string().required(i18n.t('validation-error-text-required')),

    dateTakenBetweenEnd: Yup.date().when(['askedByApp', 'useApproximateDate'], {
      is: (askedByApp, useApproximateDate) => askedByApp === 'yes' && useApproximateDate,
      then: Yup.date().required(i18n.t('validation-error-text-required')),
    }),

    dateTakenBetweenStart: Yup.date().when(['askedByApp', 'useApproximateDate'], {
      is: (askedByApp, useApproximateDate) => askedByApp === 'yes' && useApproximateDate,
      then: Yup.date().required(i18n.t('validation-error-text-required')),
    }),

    dateTakenSpecific: Yup.date().when(['askedByApp', 'useApproximateDate'], {
      is: (askedByApp, useApproximateDate) => askedByApp === 'yes' && !useApproximateDate,
      then: Yup.date().required(i18n.t('validation-error-text-required')),
    }),

    haveApp: Yup.string().when('askedByApp', {
      is: 'no',
      then: Yup.string().required(i18n.t('validation-error-text-required')),
    }),
  });
};

export const PingdemicScreen: React.FC<TProps> = ({ route }) => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const isFocused = useIsFocused();

  const askedByAppOptions: TSelectionOption[] = [
    { label: i18n.t('pingdemic.q1-yes'), value: 'yes' },
    { label: i18n.t('pingdemic.q1-no'), value: 'no' },
    { label: i18n.t('pingdemic.q1-prefer-not-to-say'), value: 'pfnts' },
    { label: i18n.t('pingdemic.q1-other'), value: 'other' },
  ];

  const haveAppOptions: TSelectionOption[] = [
    { label: i18n.t('pingdemic.no-app-yes'), value: 'yes' },
    { label: i18n.t('pingdemic.no-app-never-had'), value: 'no_prev' },
    { label: i18n.t('pingdemic.no-app-used-to-have'), value: 'no_never' },
    { label: i18n.t('pingdemic.no-app-prefer-not-to-say'), value: 'pfnts' },
  ];

  const bluetoothOptions: TSelectionOption[] = [
    { label: i18n.t('pingdemic.active-yes'), value: 'yes' },
    { label: i18n.t('pingdemic.active-no'), value: 'no' },
    { label: i18n.t('pingdemic.active-not-sure'), value: 'not_sure' },
  ];

  const onSubmit = async (values: IPingdemicData) => {
    setIsSubmitting(true);
    const patientId = assessmentCoordinator.assessmentData?.patientData.patientId;
    const dateToString = (date: Date | undefined) => (date ? moment(date).format('YYYY-MM-DD') : null);
    const pingdemicRequestData = {
      app_bluetooth: values.appActiveWithBluetooth,
      app_installed: values.haveApp,
      asked_to_isolate: values.askedByApp,
      isolate_date_between_end: dateToString(values.dateTakenBetweenEnd),
      isolate_date_between_start: dateToString(values.dateTakenBetweenStart),
      isolate_date_specific: dateToString(values.dateTakenSpecific),
      other_text: values.otherText,
      patient: patientId,
    } as TPingdemicRequest;

    try {
      await pingdemicApiClient.add(pingdemicRequestData);
      assessmentCoordinator.gotoNextScreen(route.name);
    } catch (error) {
      setErrorMessage(i18n.t('something-went-wrong'));
    }
    setIsSubmitting(false);
  };

  React.useEffect(() => {
    setIsSubmitting(false);
  }, [isFocused]);

  const renderDate = (formikProps: FormikProps<IPingdemicData>) =>
    formikProps.values.askedByApp === 'yes' ? (
      <CovidTestDateQuestion
        dateChangeCallback={() => formikProps.validateForm()}
        formikProps={formikProps as FormikProps<ICovidTestDateData>}
        label={i18n.t('pingdemic.dates')}
      />
    ) : null;

  const renderHaveApp = (formikProps: FormikProps<IPingdemicData>) =>
    formikProps.values.askedByApp === 'no' ? (
      <RadioInput
        required
        items={haveAppOptions}
        label={i18n.t('pingdemic.no-app')}
        onValueChange={formikProps.handleChange('haveApp')}
        selectedValue={formikProps.values.haveApp}
        testID="input-pingdemic-radio-have-app"
      />
    ) : null;

  const renderBluetooth = (formikProps: FormikProps<IPingdemicData>) =>
    formikProps.values.haveApp === 'yes' ? (
      <RadioInput
        required
        items={bluetoothOptions}
        label={i18n.t('pingdemic.active-bluetooth')}
        onValueChange={formikProps.handleChange('appActiveWithBluetooth')}
        selectedValue={formikProps.values.appActiveWithBluetooth}
        testID="input-pingdemic-radio-have-app"
      />
    ) : null;

  const renderOtherText = (formikProps: FormikProps<IPingdemicData>) =>
    formikProps.values.askedByApp === 'other' ? (
      <TextareaWithCharCount
        bordered={false}
        maxLength={500}
        onChangeText={formikProps.handleChange('otherText')}
        placeholder={i18n.t('placeholder-optional')}
        rowSpan={5}
        textAreaStyle={styling.textarea}
        value={formikProps.values.otherText}
      />
    ) : null;

  return (
    <Screen
      profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      testID="pingdemic-screen"
    >
      <HeaderText>{i18n.t('pingdemic.title')}</HeaderText>

      <SecondaryText style={{ marginBottom: sizes.m, marginTop: sizes.xl }}>{`${i18n.t(
        'pingdemic.body',
      )} `}</SecondaryText>

      <Formik
        validateOnChange
        validateOnMount
        initialValues={initialFormValues}
        onSubmit={onSubmit}
        validationSchema={ValidationSchema()}
      >
        {(formikProps: FormikProps<IPingdemicData>) => {
          return (
            <Form>
              <RadioInput
                required
                items={askedByAppOptions}
                label={i18n.t('pingdemic.q1')}
                onValueChange={formikProps.handleChange('askedByApp')}
                selectedValue={formikProps.values.askedByApp}
                testID="input-radio-asked-by-app"
              />
              {renderOtherText(formikProps)}
              {renderDate(formikProps)}
              {renderHaveApp(formikProps)}
              {renderBluetooth(formikProps)}

              <View style={styling.flex} />

              {errorMessage ? <ErrorText style={styling.marginTop}>{errorMessage}</ErrorText> : null}
              <BrandedButton
                enabled={formikProps.isValid}
                loading={isSubmitting}
                onPress={formikProps.handleSubmit}
                style={styling.marginTop}
                testID="button-submit"
              >
                {i18n.t('vaccines.dose-symptoms.next')}
              </BrandedButton>
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
};
