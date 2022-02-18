import { noseSwabX3 } from '@assets';
import { Card, ErrorText, Spacer, Tag, TextWithBoldInserts } from '@covid/components';
import {
  ENegativePositiveFieldOptions,
  NegativePositiveField,
} from '@covid/components/inputsRedesigned/NegativePositiveField';
import Analytics, { events } from '@covid/core/Analytics';
import Logging, { contextNames, logLevel } from '@covid/core/Logging';
import { TRootState } from '@covid/core/state/root';
import { covidTestService } from '@covid/core/user/CovidTestService';
import { ECovidTestType, TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { ECovidTestMechanismOptions, ECovidTestResultOptions } from '@covid/core/user/dto/UserAPIContracts';
import { CovidTestLFTResultConfirmationModal } from '@covid/features/covid-tests/modals/CovidTestLFTResultConfirmationModal';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { dateToString } from '@covid/utils/datetime';
import { colors } from '@theme';
import * as React from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

interface IProps {
  onSuccessfulAdd: () => void;
  todaysLFT?: TCovidTest;
}

export const CovidLFTQuickReport = (props: IProps) => {
  const patientId = useSelector<TRootState, string>((state) => state.assessment.patient || '');

  const [LFTResult, setLFTResult] = React.useState<ENegativePositiveFieldOptions>(ENegativePositiveFieldOptions.EMPTY);
  const [showLFTResultConfirmationModal, setShowLFTResultConfirmationModal] = React.useState<boolean>(false);
  const [loadingLFTResult, setLoadingLFTResult] = React.useState<boolean>(false);
  const [LFTResultError, setLFTResultError] = React.useState<string>('');

  const onLFTResultButtonPress = (value: ENegativePositiveFieldOptions) => {
    setLFTResult(value);
    setShowLFTResultConfirmationModal(true);
    Analytics.track(events.COVID_TEST_LFT_RESULT_SELECTED, { result: value });
  };

  const addLFT = async () => {
    Analytics.track(events.COVID_TEST_LFT_RESULT_CONFIRM_ADD);
    setShowLFTResultConfirmationModal(false);
    setLoadingLFTResult(true);

    if (!LFTResult) {
      return;
    }

    const infos = {
      date_taken_specific: dateToString(new Date()),
      is_rapid_test: true,
      mechanism: ECovidTestMechanismOptions.NOSE_OR_THROAT_SWAB,
      patient: patientId,
      result: LFTResult as unknown as ECovidTestResultOptions, // subset of available results
      type: ECovidTestType.Generic,
    } as Partial<TCovidTest>;

    try {
      await covidTestService.addTest(infos);
      props.onSuccessfulAdd();
    } catch (e) {
      setLFTResult(ENegativePositiveFieldOptions.EMPTY);
      setLFTResultError(i18n.t('something-went-wrong'));
      Logging.log(
        'covid_test',
        'lft_quick_report_add_failed',
        contextNames.COVID_TEST_LFT_QUICK_REPORT,
        {
          error: e,
        },
        logLevel.Error,
      );
    } finally {
      setLoadingLFTResult(false);
    }
  };

  const dismissModal = () => {
    Analytics.track(events.COVID_TEST_LFT_RESULT_CANCEL_ADD);
    setShowLFTResultConfirmationModal(false);
    setLFTResult(ENegativePositiveFieldOptions.EMPTY);
  };

  const renderTodaysResult = React.useCallback(() => {
    if (!props.todaysLFT) {
      return undefined;
    }
    let relevantText;

    if (props.todaysLFT.result === ECovidTestResultOptions.WAITING) {
      relevantText = i18n.t('covid-test-list.lft-quick-report.todays-result-waiting');
    } else if (props.todaysLFT.result === ECovidTestResultOptions.FAILED) {
      relevantText = i18n.t('covid-test-list.lft-quick-report.todays-result-failed');
    } else {
      relevantText = i18n.t('covid-test-list.lft-quick-report.todays-result', { result: props.todaysLFT.result });
    }

    return (
      <TextWithBoldInserts inverted colorPalette="uiDark" colorShade="darker" textAlign="center" textClass="h5Light">
        {relevantText}
      </TextWithBoldInserts>
    );
  }, [props.todaysLFT]);

  return (
    <>
      <CovidTestLFTResultConfirmationModal
        onPositiveConfirmation={addLFT}
        onRequestClose={dismissModal}
        result={LFTResult}
        visible={showLFTResultConfirmationModal}
      />
      <Card style={styles.card}>
        <View style={styles.iconTagRow}>
          <Image source={noseSwabX3} style={styles.icon} />
          <Tag color={colors.teal} style={styles.tag} text={i18n.t('covid-test-list.lft-quick-report.tag-today')} />
          <Spacer space={24} />
        </View>
        {loadingLFTResult ? (
          <ActivityIndicator color={colors.secondary} size={24} />
        ) : props.todaysLFT ? (
          renderTodaysResult()
        ) : (
          <>
            <TextWithBoldInserts
              inverted
              colorPalette="uiDark"
              colorShade="darker"
              rhythm={sizes.l}
              textAlign="center"
              textClass="h5Light"
            >
              {i18n.t('covid-test-list.lft-quick-report.question')}
            </TextWithBoldInserts>
            {/* key prop used to ensure component resets if error or confirmation is dismissed */}
            <NegativePositiveField
              key={LFTResult}
              onValueChange={onLFTResultButtonPress}
              selectedValue={LFTResult}
              testID="covid-test-lft-quick-report"
            />
            {LFTResultError ? <ErrorText style={styles.error}>{LFTResultError}</ErrorText> : null}
          </>
        )}
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundSecondary,
    marginTop: sizes.l,
    paddingBottom: sizes.l,
    paddingHorizontal: sizes.m,
    paddingTop: sizes.m,
  },
  error: {
    marginTop: sizes.m,
    textAlign: 'center',
  },
  icon: {
    height: 24,
    width: 24,
  },
  iconTagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: sizes.s,
  },
  question: {
    textAlign: 'center',
  },
  tag: {
    alignSelf: 'center',
    marginTop: sizes.xs,
  },
});
