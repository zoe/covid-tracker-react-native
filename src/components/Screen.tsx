import { ScreenName } from '@covid/core/Coordinator';
import { Profile } from '@covid/core/profile/ProfileService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';

import PatientHeader, { CallOutType, NavHeader } from './PatientHeader';

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
  style?: StyleProp<ViewStyle>;
};

export const FieldWrapper = (props: FieldWrapperType) => {
  return <View style={[styles.fieldWrapper, props.style]}>{props.children}</View>;
};

type TProps = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  navigation?: StackNavigationProp<ScreenParamList, ScreenName>;
  profile?: Profile;
  simpleCallout?: boolean;
  calloutType?: CallOutType;
  calloutTitle?: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  extendEdges?: boolean;
  scrollEnabled?: boolean;
  testID?: string;
};

function renderHeader(props: TProps) {
  if (props.profile && props.navigation) {
    return (
      <PatientHeader
        calloutTitle={props.calloutTitle}
        navigation={props.navigation}
        profile={props.profile}
        showCloseButton={props.showCloseButton}
        simpleCallout={props.simpleCallout}
        type={props.calloutType}
      />
    );
  }
  if (props.profile && !props.navigation) {
    return (
      <PatientHeader
        calloutTitle={props.calloutTitle}
        profile={props.profile}
        showCloseButton={props.showCloseButton}
        simpleCallout={props.simpleCallout}
        type={props.calloutType}
      />
    );
  }
  if (props.navigation && props.showBackButton) {
    return <NavHeader navigation={props.navigation} showCloseButton={props.showCloseButton} />;
  }
  if (props.navigation && props.showCloseButton) {
    return <NavHeader navigation={props.navigation} showCloseButton={props.showCloseButton} />;
  }
  if (props.extendEdges) {
    return <View />;
  }
  return <View style={styles.statusBarBlock} />;
}

export default function Screen(props: TProps) {
  const scrollEnabled = props.scrollEnabled === undefined ? true : props.scrollEnabled;

  return (
    <SafeAreaView style={[styles.screen, props.style]} testID={props.testID}>
      {renderHeader(props)}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        {!scrollEnabled ? <View style={styles.pageBlock}>{props.children}</View> : null}
        {scrollEnabled ? (
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            testID={`scroll-view-${props.testID || 'screen'}`}
          >
            {props.extendEdges ? (
              <View style={styles.pageBlockExtendedEdges}>{props.children}</View>
            ) : (
              <View style={styles.pageBlock}>{props.children}</View>
            )}
          </ScrollView>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  fieldWrapper: {
    marginVertical: 16,
  },
  flex: {
    flex: 1,
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
