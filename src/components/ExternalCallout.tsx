import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

import Analytics, { events } from '@covid/core/Analytics';
import { openWebLink } from '@covid/utils/links';
import { closeIcon } from '@assets';
import { RootState } from '@covid/core/state/root';
import { addDismissCallout } from '@covid/core/content/state/contentSlice';
import { useAppDispatch } from '@covid/core/state/store';
import { ContentLoadingView } from '@covid/components/content/ContentLoadingView';
import i18n from '@covid/locale/i18n';

type ExternalCalloutProps = {
  aspectRatio: number;
  calloutID: string;
  canDismiss?: boolean;
  disableLoadingState?: boolean;
  imageSource: ImageSourcePropType;
  imageStyles?: StyleProp<ImageStyle>;
  isSharing?: boolean;
  link?: string;
  orderIndex?: number;
  postClicked?: VoidFunction;
  screenName: string;
};

export const ExternalCallout: React.FC<ExternalCalloutProps> = (props) => {
  const dismissedCalloutIds = useSelector<RootState, string[]>((state) => state.content.dismissedCallouts);
  const [dismissed, setDismissed] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageLoadError, setImageLoadError] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();

  const imageProps = {
    style: [
      styles.image,
      { aspectRatio: props.aspectRatio },
      { ...(props.imageStyles as object) },
      imageLoading && { opacity: 0 },
    ],
    onLoadStart: () => {
      setImageLoading(true);
    },
    onLoadEnd: () => {
      setTimeout(() => {
        setImageLoading(false);
      }, 330);
    },
    onError: () => {
      setImageLoading(false);
      setImageLoadError(i18n.t('generic.content-can-not-be-loaded-atm'));
    },
  };

  useEffect(() => {
    setDismissed(dismissedCalloutIds.includes(props.calloutID));
  }, [dismissedCalloutIds]);

  useEffect(() => {
    setImageLoading(true);
  }, []);

  function clickCallout() {
    Analytics.track(events.CLICK_CALLOUT, {
      calloutID: props.calloutID,
      orderIndex: props.orderIndex,
      screenName: props.screenName,
    });
    if (props.link) openWebLink(props.link);
    if (props.postClicked) props.postClicked();
  }

  function clickDismiss() {
    Analytics.track(events.CLICK_CALLOUT_DISMISS, {
      calloutID: props.calloutID,
      orderIndex: props.orderIndex,
      screenName: props.screenName,
    });
    dispatch(addDismissCallout(props.calloutID));
  }

  return (
    <ContentLoadingView
      loading={imageLoading}
      errorMessage={imageLoadError}
      disableShimmers={props.disableLoadingState}>
      {!dismissed ? (
        <TouchableWithoutFeedback
          onPress={clickCallout}
          accessible={props.isSharing}
          accessibilityRole={props.isSharing ? 'none' : 'button'}>
          <View style={styles.viewContainer}>
            {Object.keys(props.imageSource).includes('uri') ? (
              <FastImage {...imageProps} source={{ uri: (props.imageSource as ImageURISource).uri }} />
            ) : (
              <Image {...imageProps} source={props.imageSource} />
            )}
            {props.canDismiss && !props.isSharing ? (
              <TouchableWithoutFeedback onPress={clickDismiss}>
                <Image style={styles.closeCross} source={closeIcon} />
              </TouchableWithoutFeedback>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      ) : null}
    </ContentLoadingView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    marginVertical: 8,
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
  },
  closeCross: {
    position: 'absolute',
    end: 12,
    top: 12,
    height: 24,
    width: 24,
    tintColor: 'white',
  },
});
