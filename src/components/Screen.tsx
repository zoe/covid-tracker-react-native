import { BrandedButton } from '@covid/components/buttons';
import { NavHeader } from '@covid/components/NavHeader';
import { PatientHeader } from '@covid/components/PatientHeader';
import { TProfile } from '@covid/core/profile/ProfileService';
import { sizes, styling } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

interface IProps {
  backgroundColor?: string;
  children?: React.ReactNode;
  footerEnabled?: boolean;
  footerLoading?: boolean;
  footerOnPress?: () => void;
  footerTitle?: string;
  isInsideTabBar?: boolean;
  noHeader?: boolean;
  noKeyboardDismiss?: boolean;
  noPadding?: boolean;
  noScrollView?: boolean;
  profile?: TProfile;
  renderFooter?: (props: IProps) => React.ReactNode;
  renderHeader?: (props: IProps) => React.ReactNode;
  simpleCallout?: boolean;
  testID: string;
}

function renderHeader(props: IProps) {
  if (props.noHeader) {
    return null;
  }
  if (props.renderHeader) {
    return props.renderHeader(props);
  }
  if (props.profile) {
    return <PatientHeader profile={props.profile} simpleCallout={props.simpleCallout} />;
  }
  return <NavHeader />;
}

function renderBody(props: IProps) {
  if (props.noScrollView) {
    return <View style={styles.flex}>{props.children}</View>;
  }
  const content = <View style={styles.view}>{props.children}</View>;
  return (
    <ScrollView
      alwaysBounceVertical={false}
      contentContainerStyle={props.noPadding ? styling.flexGrow : styles.contentContainer}
      testID={`scroll-view-${props.testID || 'screen'}`}
    >
      {props.noKeyboardDismiss ? (
        content
      ) : (
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          {content}
        </TouchableWithoutFeedback>
      )}
    </ScrollView>
  );
}

function renderFooter(props: IProps) {
  if (props.renderFooter) {
    return props.renderFooter(props);
  }
  return props.footerTitle ? (
    <View style={styles.footerWrapper}>
      <BrandedButton
        enabled={props.footerEnabled}
        loading={props.footerLoading}
        onPress={props.footerOnPress}
        testID="button-footer"
      >
        {props.footerTitle}
      </BrandedButton>
    </View>
  ) : null;
}

// Keep in mind that certain styling properties don't work on the SafeAreaView.
// For example setting a padding is ignored.

const edgesTabBar: Edge[] = ['right', 'top', 'left'];

export function Screen(props: IProps) {
  return (
    <SafeAreaView
      edges={props.isInsideTabBar ? edgesTabBar : undefined}
      style={[styling.flex, { backgroundColor: props.backgroundColor || colors.backgroundPrimary }]}
      testID={props.testID}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        {renderHeader(props)}
        {renderBody(props)}
        {renderFooter(props)}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: sizes.screenHorizontalPadding,
    paddingVertical: sizes.screenVerticalPadding,
  },
  flex: {
    flex: 1,
  },
  footerWrapper: {
    alignSelf: 'center',
    maxWidth: sizes.maxScreenWidth,
    paddingBottom: sizes.screenVerticalPadding,
    paddingHorizontal: sizes.screenHorizontalPadding,
    width: '100%',
  },
  view: {
    flexGrow: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: sizes.maxScreenWidth,
    width: '100%',
  },
});
