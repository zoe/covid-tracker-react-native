/* eslint-disable */

// TODO: investigate lint error:
// React Hook "React.useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render    react-hooks/rules-of-hooks

import { Text } from '@covid/components/typography';
import Analytics from '@covid/core/Analytics';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import {
  Modal as RNModal,
  PanResponderGestureState,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GestureRecognizer from 'rn-swipe-gestures';

type TSwipeFunction = (gestureState: PanResponderGestureState) => void;

interface IProps {
  animationType?: 'fade' | 'none' | 'slide';
  backgroundImage?: React.ReactNode;
  children?: React.ReactNode;
  enableBackdropDismiss?: boolean;
  footerChildren?: React.ReactNode;
  modalName: string;
  noPadding?: boolean;
  onPressClose?: () => void;
  onRequestClose: () => void;
  showsVerticalScrollIndicator?: boolean;
  swipeLeft?: TSwipeFunction;
  swipeRight?: TSwipeFunction;
  testID: string;
  visible: boolean;
}

const BORDER_RADIUS = 16;
export const CONTENT_SPACING = 24;
const SCROLL_INDICATOR_OFFSET = BORDER_RADIUS / 4 + 2;

// These magic numbers make sure the scroll indicator aligns pixel perfect to the edge on iOS.
const INSETS = {
  bottom: -3,
  left: 0,
  right: -3,
  top: -3,
};

const hitSlop = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

const COLORS = ['#ffffff00', 'white'];

const gestureConfig = {
  detectSwipeDown: false,
  detectSwipeLeft: true,
  detectSwipeRight: true,
  detectSwipeUp: false,
};

export const Modal = React.memo(function Modal(props: IProps) {
  // Don't call the hooks to prevent analytics from tracking without the modal being visible to the user.
  if (!props.visible) {
    return null;
  }

  React.useEffect(() => {
    if (props.modalName) {
      Analytics.trackModalView(props.modalName);
    }
  }, [props.modalName]);
  // @ts-ignore
  const safeAreaInsets = useSafeAreaInsets();
  function renderContent() {
    const paddingStyle = {
      paddingBottom: sizes.screenVerticalPadding + safeAreaInsets.bottom,
      paddingLeft: sizes.screenHorizontalPadding + safeAreaInsets.left,
      paddingRight: sizes.screenHorizontalPadding + safeAreaInsets.right,
      paddingTop: sizes.screenVerticalPadding + safeAreaInsets.top,
    };
    return (
      <RNModal
        transparent
        animationType={props.animationType ?? 'fade'}
        onRequestClose={props.onRequestClose}
        visible={props.visible}
      >
        <TouchableWithoutFeedback disabled={!props.enableBackdropDismiss} onPress={props.onRequestClose}>
          <View style={styles.view1} testID={props.testID}>
            <View style={[styles.view2, paddingStyle]}>
              <TouchableWithoutFeedback disabled={!props.enableBackdropDismiss}>
                <View style={styles.view3}>
                  {props.onPressClose ? (
                    <TouchableOpacity
                      hitSlop={hitSlop}
                      onPress={props.onPressClose}
                      style={styles.closeWrapper}
                      testID="button-close-modal"
                    >
                      <Text inverted colorPalette="uiDark" colorShade="darker" style={styles.alignEnd} textClass="p">
                        {i18n.t(`modal-close`)}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                  <ScrollView
                    alwaysBounceVertical={false}
                    contentContainerStyle={!props.noPadding && styles.contentContainer}
                    overScrollMode="never"
                    scrollIndicatorInsets={INSETS}
                    showsVerticalScrollIndicator={props.showsVerticalScrollIndicator || false}
                    style={props.noPadding || props.backgroundImage ? null : styles.scrollView}
                  >
                    {props.backgroundImage ? props.backgroundImage : null}
                    {props.children}
                  </ScrollView>
                  {props.footerChildren ? (
                    <View style={styles.footerWrapper}>
                      <LinearGradient colors={COLORS} style={styles.linearGradient} />
                      {props.footerChildren}
                    </View>
                  ) : null}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </RNModal>
    );
  }

  const hasSwipe = props.swipeLeft !== undefined || props.swipeRight !== undefined;

  return hasSwipe ? (
    <GestureRecognizer config={gestureConfig} onSwipeLeft={props.swipeLeft} onSwipeRight={props.swipeRight}>
      {renderContent()}
    </GestureRecognizer>
  ) : (
    renderContent()
  );
});

const styles = StyleSheet.create({
  alignEnd: {
    alignSelf: 'flex-end',
  },
  closeWrapper: {
    padding: CONTENT_SPACING,
    paddingBottom: 0,
  },
  contentContainer: {
    padding: CONTENT_SPACING - SCROLL_INDICATOR_OFFSET,
  },
  footerWrapper: {
    paddingBottom: CONTENT_SPACING,
    paddingHorizontal: CONTENT_SPACING,
  },
  linearGradient: {
    backgroundColor: '#ffffff00',
    height: CONTENT_SPACING,
    left: CONTENT_SPACING,
    position: 'absolute',
    right: CONTENT_SPACING,
    top: -CONTENT_SPACING,
    zIndex: 1,
  },
  scrollView: {
    margin: SCROLL_INDICATOR_OFFSET,
  },
  view1: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  view2: {
    flex: 0,
    flexGrow: 0,
    flexShrink: 1,
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
  },
  view3: {
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS,
    flex: 0,
    flexGrow: 0,
    flexShrink: 1,
    maxWidth: sizes.maxScreenWidth,
    overflow: 'hidden',
  },
});
