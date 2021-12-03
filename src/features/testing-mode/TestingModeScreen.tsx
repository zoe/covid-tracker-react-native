import { RegularText, Text } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import Switch from '@covid/components/Switch';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { testingModeActions } from '@covid/core/state/testingMode';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

let hash = '';
try {
  hash = require('../../../.git-hash.json');
} catch (error) {
  // eslint-disable-next-line no-console
  console.warn(error);
}

// Added show_research_consent flag for illustrative purposes - feel free to remove forRedux & final version
const CUSTOMISABLE_SETTINGS: Array<keyof TStartupInfo> = ['show_new_vaccines_ui', 'show_research_consent'];

const renderStartupInfo = (startupInfo: TStartupInfo) =>
  Object.keys(startupInfo)
    .sort()
    .map((key: string) => {
      if (key === 'local_data') {
        // We're not bothered about showing the local_data object
        return null;
      }
      return <RegularText key={key}>{`${key}: ${startupInfo[key as keyof TStartupInfo]}`}</RegularText>;
    });

const renderCustomisableSettings = (startupInfo: TStartupInfo, dispatch: Dispatch) =>
  CUSTOMISABLE_SETTINGS.map((setting) => {
    const currentValue = !!startupInfo[setting];

    return (
      <Switch
        key={setting}
        label={setting}
        onValueChange={(value) => dispatch(testingModeActions.updateStartupInfo({ key: setting, value }))}
        selectedValue={currentValue}
        style={{ marginBottom: sizes.s }}
      />
    );
  });

export function TestingModeScreen() {
  const dispatch = useDispatch();
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);

  return startupInfo ? (
    <Screen backgroundColor={colors.backgroundPrimary} testID="testing-mode-screen">
      <Text rhythm={24} textClass="h3Bold">
        Welcome Tester. Choose your experience.
      </Text>
      <Text rhythm={24} textClass="h5Medium">
        Git hash: {hash.substring(0, 10)}
      </Text>
      <Text rhythm={12} textClass="h5Medium">
        Customisable settings
      </Text>
      <View style={{ marginBottom: sizes.xl }}>{renderCustomisableSettings(startupInfo, dispatch)}</View>
      <Text rhythm={12} textClass="h5Medium">
        All settings
      </Text>
      {renderStartupInfo(startupInfo)}
    </Screen>
  ) : (
    <Screen backgroundColor={colors.backgroundPrimary} testID="testing-mode-screen">
      <RegularText>
        Are you an imposter? Because you don't seem to have any startup info. Contact your nearest software engineer to
        sort it out.
      </RegularText>
    </Screen>
  );
}
