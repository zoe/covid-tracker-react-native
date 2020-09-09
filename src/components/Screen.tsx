import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors } from '@theme';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { Profile } from '@covid/components/Collections/ProfileList';

import PatientHeader, { CallOutType, NavHeader } from './PatientHeader';
import { RegularText } from './Text';

export const screenWidth = Math.round(Dimensions.get('window').width) - 32;
export const screenHeight = Math.round(Dimensions.get('window').height);

type HeaderProp = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
};

export const Header = (props: HeaderProp) => {
  return <View style={[styles.headerBlock, props.style]}>{props.children}</View>;
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
export type ScreenProps = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  navigation?: StackNavigationProp<ScreenParamList, keyof ScreenParamList>;
  profile?: Profile;
  simpleCallout?: boolean;
  calloutType?: CallOutType;
  calloutTitle?: string;
  showBackButton?: boolean;
};

export default class Screen extends Component<ScreenProps> {
  screenWidth: number = screenWidth;
  screenHeight: number = screenHeight;

  render() {
    const profile = this.props.profile;

    const header = () => {
      if (profile && this.props.navigation) {
        return (
          <PatientHeader
            profile={profile}
            navigation={this.props.navigation}
            simpleCallout={this.props.simpleCallout}
            type={this.props.calloutType}
            calloutTitle={this.props.calloutTitle}
          />
        );
      } else if (this.props.navigation && this.props.showBackButton) {
        return <NavHeader navigation={this.props.navigation} />;
      } else {
        return <View style={styles.statusBarBlock} />;
      }
    };

    return (
      <SafeAreaView style={[styles.screen, this.props.style]}>
        {header()}
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
            }}>
            <View style={styles.pageBlock}>{this.props.children}</View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export const StickyBottomButton: React.FC<{
  label: string;
  onPress: VoidFunction;
}> = ({ label, onPress }) => (
  <TouchableOpacity style={{ marginBottom: 64 }} onPress={onPress}>
    <RegularText style={[{ textAlign: 'center' }]}>{label}</RegularText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },

  statusBarBlock: {
    marginVertical: 32,
  },

  pageBlock: {
    flexGrow: 1,
    marginHorizontal: 16,
  },

  headerBlock: {
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
