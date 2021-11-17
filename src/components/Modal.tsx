import Analytics from '@covid/core/Analytics';
import { sizes } from '@covid/themes';
import * as React from 'react';
import {
  Modal as RNModal,
  PanResponderGestureState,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GestureRecognizer from 'react-native-swipe-gestures';

type TSwipeFunction = (gestureState: PanResponderGestureState) => void;

interface IProps {
  animationType?: 'fade' | 'none' | 'slide';
  children?: React.ReactNode;
  enableBackdropDismiss?: boolean;
  footerChildren?: React.ReactNode;
  headerChildren?: React.ReactNode;
  modalName: string;
  onRequestClose: () => void;
  showsVerticalScrollIndicator?: boolean;
  swipeDown?: TSwipeFunction;
  swipeLeft?: TSwipeFunction;
  swipeRight?: TSwipeFunction;
  swipeUp?: TSwipeFunction;
  testID: string;
  visible: boolean;
}

const BORDER_RADIUS = 16;
const CONTENT_SPACING = 24;
const SCROLL_INDICATOR_OFFSET = BORDER_RADIUS / 4 + 2;

// These magic numbers make sure the scroll indicator aligns pixel perfect to the edge on iOS.
const INSETS = {
  bottom: -3,
  left: 0,
  right: -3,
  top: -3,
};

const COLORS = ['#ffffff00', 'white'];

export default React.memo(function Modal(props: IProps) {
  const safeAreaInsets = useSafeAreaInsets();

  React.useEffect(() => {
    if (props.modalName) {
      Analytics.trackModalView(props.modalName);
    }
  }, [props.modalName]);

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
                  {props.headerChildren ? <View style={styles.headerWrapper}>{props.headerChildren}</View> : null}
                  <ScrollView
                    alwaysBounceVertical={false}
                    contentContainerStyle={styles.contentContainer}
                    scrollIndicatorInsets={INSETS}
                    showsVerticalScrollIndicator={props.showsVerticalScrollIndicator || false}
                    style={styles.scrollView}
                  >
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

  const hasSwipe =
    props.swipeUp !== undefined ||
    props.swipeDown !== undefined ||
    props.swipeLeft !== undefined ||
    props.swipeRight !== undefined;

  return hasSwipe ? (
    <GestureRecognizer
      onSwipeDown={props.swipeDown}
      onSwipeLeft={props.swipeLeft}
      onSwipeRight={props.swipeRight}
      onSwipeUp={props.swipeUp}
    >
      {renderContent()}
    </GestureRecognizer>
  ) : (
    renderContent()
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    padding: CONTENT_SPACING - SCROLL_INDICATOR_OFFSET,
  },
  footerWrapper: {
    paddingBottom: CONTENT_SPACING,
    paddingHorizontal: CONTENT_SPACING,
  },
  headerWrapper: {
    padding: CONTENT_SPACING / 2,
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
  },
});
