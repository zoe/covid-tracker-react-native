import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { ECovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';
import { ETabScreen } from '@covid/features/covid-tests/screens/CovidTestTabbedListsScreen';

const PCR_LATERAL_FLOW_MECHANISMS = [
  ECovidTestMechanismOptions.NOSE_OR_THROAT_SWAB,
  ECovidTestMechanismOptions.SPIT_TUBE,
  ECovidTestMechanismOptions.NOSE_OR_THROAT_SWAB_AND_SALIVA,
  ECovidTestMechanismOptions.NOSE_SWAB,
  ECovidTestMechanismOptions.THROAT_SWAB,
];

const ANTIBODY_MECHANISMS = [
  ECovidTestMechanismOptions.BLOOD_SAMPLE,
  ECovidTestMechanismOptions.BLOOD_FINGER_PRICK,
  ECovidTestMechanismOptions.BLOOD_NEEDLE_DRAW,
];

const ALL_MECHANISMS_EXCEPT_OTHER = PCR_LATERAL_FLOW_MECHANISMS.concat(ANTIBODY_MECHANISMS);

export function isPcrTest(mechanism: ECovidTestMechanismOptions, isRapidTest: boolean) {
  return PCR_LATERAL_FLOW_MECHANISMS.includes(mechanism) && !isRapidTest;
}

export function isLateralFlowTest(mechanism: ECovidTestMechanismOptions, isRapidTest: boolean) {
  return PCR_LATERAL_FLOW_MECHANISMS.includes(mechanism) && isRapidTest;
}

export function isAntibodyTest(mechanism: ECovidTestMechanismOptions) {
  return ANTIBODY_MECHANISMS.includes(mechanism);
}

export function isOtherTest(mechanism: ECovidTestMechanismOptions) {
  return !ALL_MECHANISMS_EXCEPT_OTHER.includes(mechanism);
}

export function getInitialRouteName(
  mechanism: ECovidTestMechanismOptions | undefined,
  isRapidTest: boolean | undefined,
): ETabScreen {
  if (mechanism) {
    if (isRapidTest !== undefined) {
      if (isPcrTest(mechanism, isRapidTest)) {
        return ETabScreen.PCR;
      }
      if (isLateralFlowTest(mechanism, isRapidTest)) {
        return ETabScreen.LATERAL;
      }
    }

    if (isAntibodyTest(mechanism)) {
      return ETabScreen.ANTIBODY;
    }
    if (isOtherTest(mechanism)) {
      return ETabScreen.OTHER;
    }
  }
  return ETabScreen.LATERAL;
}

export function showDualAntibodyTestUI(
  mechanism: ECovidTestMechanismOptions | undefined,
  invitedToTest: string | undefined,
  bookedViaGov: string | undefined,
) {
  if (!mechanism || (!invitedToTest && !bookedViaGov)) {
    return false;
  }

  return (
    mechanism === ECovidTestMechanismOptions.BLOOD_FINGER_PRICK && (invitedToTest === 'yes' || bookedViaGov === 'yes')
  );
}

export function isPostDHSCRevisedVersion(version: string) {
  // The version that incorporates new DHSC antibody dual testing is v2.1.0
  return Number(version[0]) >= 2 && Number(version[2]) >= 1;
}

export function isOldVersionAntibodyInviteTest(test: TCovidTest) {
  return !!test.antibody_type_check && !isPostDHSCRevisedVersion(test.version);
}

export function isZoeInviteWithDualResultTest(test: TCovidTest) {
  return test.invited_to_test && isPostDHSCRevisedVersion(test.version);
}
