import { Profile } from '@covid/core/profile/ProfileService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React, { Component } from 'react';
import {
  Dimensions,
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  showCloseButton?: boolean;
  extendEdges?: boolean;
  scrollEnabled?: boolean;
};

export default class Screen extends Component<ScreenProps> {
  screenWidth: number = screenWidth;

  screenHeight: number = screenHeight;

  render() {
    const { profile } = this.props;
    const scrollEnabled = this.props.scrollEnabled === undefined ? true : this.props.scrollEnabled;
    const header = () => {
      if (profile && this.props.navigation) {
        return (
          <PatientHeader
            calloutTitle={this.props.calloutTitle}
            navigation={this.props.navigation}
            profile={profile}
            showCloseButton={this.props.showCloseButton}
            simpleCallout={this.props.simpleCallout}
            type={this.props.calloutType}
          />
        );
      }
      if (profile && !this.props.navigation) {
        return (
          <PatientHeader
            calloutTitle={this.props.calloutTitle}
            profile={profile}
            showCloseButton={this.props.showCloseButton}
            simpleCallout={this.props.simpleCallout}
            type={this.props.calloutType}
          />
        );
      }
      if (this.props.navigation && this.props.showBackButton) {
        return <NavHeader navigation={this.props.navigation} showCloseButton={this.props.showCloseButton} />;
      }
      if (this.props.navigation && this.props.showCloseButton) {
        return <NavHeader navigation={this.props.navigation} showCloseButton={this.props.showCloseButton} />;
      }
      if (this.props.extendEdges) {
        return <View />;
      }
      return <View style={styles.statusBarBlock} />;
    };

    return (
      <SafeAreaView style={[styles.screen, this.props.style]}>
        {header()}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          {!scrollEnabled && <View style={styles.pageBlock}>{this.props.children}</View>}
          {scrollEnabled && (
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-between',
              }}
            >
              {this.props.extendEdges ? (
                <View style={styles.pageBlockExtendedEdges}>{this.props.children}</View>
              ) : (
                <View style={styles.pageBlock}>{this.props.children}</View>
              )}
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export const StickyBottomButton: React.FC<{
  label: string;
  onPress: VoidFunction;
}> = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ marginBottom: 64 }}>
    <RegularText style={[{ textAlign: 'center' }]}>{label}</RegularText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fieldWrapper: {
    marginVertical: 16,
  },

  headerBlock: {
    marginHorizontal: 16,
    marginVertical: 16,
  },

  pageBlock: {
    flexGrow: 1,
    marginBottom: 16,
    marginHorizontal: 16,
  },

  pageBlockExtendedEdges: {
    marginHorizontal: 0,
  },

  progressBlock: {
    marginHorizontal: 16,
  },

  screen: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },

  statusBarBlock: {
    marginVertical: 32,
  },
});
