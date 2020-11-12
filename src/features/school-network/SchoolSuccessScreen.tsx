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
import i18n from '@covid/locale/i18n';

import schoolNetworkCoordinator from './SchoolNetworkCoordinator';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'SchoolSuccess'>;
  route: RouteProp<ScreenParamList, 'SchoolSuccess'>;
};

export const SchoolSuccessScreen: React.FC<Props> = ({ route, navigation, ...props }) => {
  const joinedGroup = useSelector<RootState, Optional<SubscribedSchoolGroupStats>>((state) => state.school.joinedGroup);
  const group = joinedGroup;
  const showReferenceCode = false;
  const showShare = false;

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
        {joinedGroup && <HeaderText>{i18n.t('school-networks.success.joined-title')}</HeaderText>}
        <RegularText style={styles.topText}>{i18n.t('school-networks.success.school-name')}</RegularText>
        <RegularBoldText>{group?.school?.name}</RegularBoldText>
        <RegularText style={styles.topText}>{i18n.t('school-networks.success.group-name')}</RegularText>
        <RegularBoldText>{group?.name}</RegularBoldText>
      </Header>

      <View style={{ marginVertical: 8 }}>
        <ProgressBlock>
          <ProgressStatus step={3} maxSteps={3} color={colors.brand} />
        </ProgressBlock>
      </View>

      <RegularText style={[styles.description, { marginHorizontal: 16, marginTop: 16 }]}>
        {i18n.t('school-networks.success.joined-description')}
      </RegularText>

      <View style={styles.formContainer}>
        {showReferenceCode && (
          <>
            <View style={{ alignSelf: 'center' }}>
              <RegularText style={[styles.description, styles.centerText]}>
                {i18n.t('school-networks.success.ref-code-is')}
              </RegularText>
              <RegularText style={[styles.description, styles.centerText, styles.referenceCode]}>CODE</RegularText>
            </View>
            <Button
              onPress={next}
              labelStyle={{
                color: colors.purple,
              }}>
              {i18n.t('school-networks.success.copy')}
            </Button>
          </>
        )}
        <View>
          <View style={{ height: 48 }} />
          {showShare && (
            <Button onPress={next} outline>
              {i18n.t('school-networks.success.share')}
            </Button>
          )}
          <Button onPress={next} branded>
            {i18n.t('school-networks.success.cta')}
          </Button>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'flex-end',
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
