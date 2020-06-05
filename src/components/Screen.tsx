import Analytics from '@covid/core/Analytics';
import { PatientProfile } from '@covid/core/patient/PatientState';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React, { Component } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PatientHeader from './PatientHeader';

export const screenWidth = Math.round(Dimensions.get('window').width) - 32;
export const screenHeight = Math.round(Dimensions.get('window').height);
export const isAndroid = Platform.OS === 'android';
export const isIos = Platform.OS === 'ios';

type HeaderProp = {
  children: React.ReactNode;
};

export const Header = (props: HeaderProp) => {
  return <View style={styles.headerBlock}>{props.children}</View>;
};

type OverviewProp = {
  children: React.ReactNode;
};

export const Overview = (props: OverviewProp) => {
  return <View style={styles.overviewBlock}>{props.children}</View>;
};

type ProgressBlockType = {
  children: React.ReactNode;
};

export const ProgressBlock = (props: ProgressBlockType) => {
  return <View style={styles.progressBlock}>{props.children}</View>;
};

type FieldWrapperType = {
  children: React.ReactNode;
  style?: object;
};

export const FieldWrapper = (props: FieldWrapperType) => {
  return <View style={[styles.fieldWrapper, props.style]}>{props.children}</View>;
};

/*
 * A component to wrap all screens in a common wrapper.
 * For permanent page fixtures
 */
type ScreenProps = {
  children: React.ReactNode;
  navigation?: StackNavigationProp<ScreenParamList>;
  profile?: PatientProfile;
};

export default class Screen extends Component<ScreenProps> {
  screenWidth: number = screenWidth;
  screenHeight: number = screenHeight;

  render() {
    const profile = this.props.profile;

    return (
      <SafeAreaView style={styles.screen}>
        {profile ? (
          <PatientHeader profile={profile} navigation={this.props.navigation} />
        ) : (
          <View style={styles.statusBarBlock} />
        )}

        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView>
            <View style={styles.pageBlock}>{this.props.children}</View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* TODO: Put any fixed footer component */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },

  statusBarBlock: {
    marginVertical: 32,
  },

  pageBlock: {
    marginHorizontal: 16,
    marginBottom: 40,
  },

  headerBlock: {
    marginVertical: 16,
    marginHorizontal: 16,
  },

  overviewBlock: {
    marginVertical: 16,
    marginHorizontal: 16,
  },

  progressBlock: {
    marginHorizontal: 16,
  },

  fieldWrapper: {
    marginVertical: 16,
  },
});
