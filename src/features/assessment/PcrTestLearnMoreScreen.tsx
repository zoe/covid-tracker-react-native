import { BigButton } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import { CaptionText, HeaderText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  navigation?: StackNavigationProp<ScreenParamList, 'PcrTestLearnMore'>;
  route?: RouteProp<ScreenParamList, 'PcrTestLearnMore'>;
}

function PcrTestLearnMoreScreen({ navigation, route }: IProps) {
  return (
    <Screen navigation={navigation}>
      <Header>
        <HeaderText>PCR Test</HeaderText>
      </Header>
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default PcrTestLearnMoreScreen;
