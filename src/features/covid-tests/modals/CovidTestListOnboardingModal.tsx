import { BrandedButton, HeaderText, Modal, RegularText } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import { events, track } from '@covid/core/Analytics';
import { patientService } from '@covid/core/patient/PatientService';
import { fetchStartUpInfo } from '@covid/core/state/contentSlice';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

const ONBOARDING_SCREENS = [
  require('@covid/features/covid-tests/assets/screen_1.gif'),
  require('@covid/features/covid-tests/assets/screen_2.gif'),
  require('@covid/features/covid-tests/assets/screen_3.gif'),
  require('@covid/features/covid-tests/assets/screen_4.gif'),
];

const hitSlop = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
  patientId: string;
}

export default function CovidTestListOnboardingModal(props: IProps) {
  const dispatch = useDispatch();
  const [tracked, setTracked] = React.useState(false);
  const [onboardingModalScreenIndex, setOboardingModalScreenIndex] = React.useState<number>(0);
  const [selectedGif, setSelectedGif] = React.useState<any>(ONBOARDING_SCREENS[0]);

  React.useEffect(() => {
    if (!tracked) {
      track(events.COVID_TEST_ONBOARDING_MODAL);
      setTracked(true);
    }
  });

  const closeAndUpdateStartupInfo = React.useCallback(() => {
    const infos: Partial<TPatientInfosRequest> = {
      has_seen_covid_test_onboarding: true,
    };
    patientService.updatePatientInfo(props.patientId, infos).then(() => {
      props.onRequestClose();
      dispatch(fetchStartUpInfo());
    });
  }, [props.patientId, props.onRequestClose]);

  function setIndexAndGif(selectedIndex: number) {
    setOboardingModalScreenIndex(selectedIndex);
    setSelectedGif(ONBOARDING_SCREENS[selectedIndex]);
  }

  function nextModalOrComplete() {
    const selectedIndex = onboardingModalScreenIndex + 1;
    if (selectedIndex >= ONBOARDING_SCREENS.length) {
      closeAndUpdateStartupInfo();
    } else {
      setIndexAndGif(selectedIndex);
    }
  }

  function previousModal() {
    if (onboardingModalScreenIndex === 0) {
      return;
    }
    const selectedIndex = onboardingModalScreenIndex - 1;
    setIndexAndGif(selectedIndex);
  }

  const headerChildren = React.useMemo(
    () => (
      <TouchableOpacity
        hitSlop={hitSlop}
        onPress={closeAndUpdateStartupInfo}
        style={styles.closeTouchable}
        testID="button-close-modal"
      >
        <RegularText style={styles.closeText}>{i18n.t(`modal-close`)}</RegularText>
      </TouchableOpacity>
    ),
    [closeAndUpdateStartupInfo],
  );

  const footerChildren = React.useMemo(
    () => (
      <BrandedButton onPress={nextModalOrComplete} style={styles.button} testID="covid-test-modal-button">
        {onboardingModalScreenIndex === ONBOARDING_SCREENS.length - 1
          ? i18n.t('covid-test-modal.button-end')
          : i18n.t('covid-test-modal.button')}
      </BrandedButton>
    ),
    [onboardingModalScreenIndex],
  );

  return (
    <Modal
      footerChildren={footerChildren}
      headerChildren={headerChildren}
      modalName="CovidTestListOnboarding"
      onRequestClose={closeAndUpdateStartupInfo}
      swipeLeft={nextModalOrComplete}
      swipeRight={previousModal}
      testID={`covid-test-modal-${onboardingModalScreenIndex}`}
      visible={props.visible}
    >
      <View style={styles.wrapper}>
        <ProgressStatus color={colors.lightBlueBrand} currentStep={onboardingModalScreenIndex + 1} maxSteps={4} />

        <View style={styles.newDesign}>
          <RegularText style={styles.newDesignText}>{i18n.t('covid-test-modal.new-design')}</RegularText>
        </View>

        <HeaderText style={styles.text}>
          {i18n.t(`covid-test-modal.screen-${onboardingModalScreenIndex}.title`)}
        </HeaderText>
        <Image source={selectedGif} style={styles.gif} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: sizes.m,
  },
  closeText: {
    color: colors.lightBrand,
    fontWeight: '600',
  },
  closeTouchable: {
    alignSelf: 'flex-end',
  },
  gif: {
    flex: 1,
    height: 500,
    resizeMode: 'contain',
  },
  newDesign: {
    alignSelf: 'center',
    backgroundColor: colors.lightBlueBrand,
    borderRadius: sizes.xs,
    marginBottom: sizes.l,
    paddingHorizontal: sizes.s,
    paddingVertical: sizes.xxs,
    textAlign: 'center',
  },
  newDesignText: {
    color: 'white',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  text: {
    marginBottom: sizes.s,
    textAlign: 'center',
  },
  title: {
    marginBottom: sizes.m,
    marginTop: sizes.m,
  },
  wrapper: {
    alignItems: 'center',
    padding: sizes.xs,
  },
});
