import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { colors } from '@theme';
import { HeaderText, RegularText, RegularBoldText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { Button } from '@covid/components/Buttons/Button';
import { RootState } from '@covid/core/state/root';
import { Optional } from '@covid/utils/types';
import { SubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { useAppDispatch } from '@covid/core/state/store';
import { finishedSchoolGroup } from '@covid/core/schools/Schools.slice';

import schoolNetworkCoordinator from './SchoolNetworkCoordinator';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'SchoolSuccess'>;
  route: RouteProp<ScreenParamList, 'SchoolSuccess'>;
};

export const SchoolSuccessScreen: React.FC<Props> = ({ route, navigation, ...props }) => {
  const joinedGroup = useSelector<RootState, Optional<SubscribedSchoolGroupStats>>((state) => state.school.joinedGroup);
  const group = joinedGroup;
  const showReferenceCode = false;

  const dispatch = useAppDispatch();

  const create = () => {
    finished();
  };
  const next = () => {
    schoolNetworkCoordinator.resetToHome();
    finished();
  };

  const finished = () => dispatch(finishedSchoolGroup());

  return (
    <Screen>
      <Header>
        {joinedGroup && <HeaderText>Great! Your are in</HeaderText>}
        {/* { createdSchool && <HeaderText>Great! Your group has been created</HeaderText> } */}

        <RegularText style={styles.topText}>School name</RegularText>
        <RegularBoldText>{group?.school?.name}</RegularBoldText>
        <RegularText style={styles.topText}>Group name</RegularText>
        <RegularBoldText>{group?.name}</RegularBoldText>

        <RegularText style={styles.description}>
          Invite others and let them know about this group. You will need at least 5 participants in this group before
          we can start generating statistics and showing symptoms and cases.
        </RegularText>
      </Header>

      <ProgressBlock>
        <ProgressStatus step={3} maxSteps={3} color={colors.brand} />
      </ProgressBlock>

      <View style={styles.formContainer}>
        {showReferenceCode && (
          <>
            <View style={{ alignSelf: 'center' }}>
              <RegularText style={[styles.description, styles.centerText]}>Your groups reference code is:</RegularText>
              <RegularText style={[styles.description, styles.centerText, styles.referenceCode]}>CODE</RegularText>
            </View>
            <Button
              onPress={next}
              labelStyle={{
                color: colors.purple,
              }}>
              Copy reference
            </Button>
          </>
        )}
        <View>
          <View style={{ height: 48 }} />
          <Button onPress={next} outline>
            Share this link
          </Button>
          <Button onPress={next} branded>
            Done
          </Button>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    // height: '100%',
    justifyContent: 'space-between',
  },
  topText: {
    marginTop: 16,
  },
  description: {
    marginTop: 24,
  },
  centerText: {
    textAlign: 'center',
  },
  referenceCode: {
    fontWeight: '400',
    fontSize: 20,
    color: colors.brand,
  },
  primaryButton: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: colors.brand,
  },
  primaryButtonText: {
    color: colors.white,
  },
});
