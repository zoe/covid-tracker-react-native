import { closeIcon } from '@assets';
import { ContentLoadingView } from '@covid/components/content/ContentLoadingView';
import Analytics, { events } from '@covid/core/Analytics';
import { addDismissCallout } from '@covid/core/content/state/contentSlice';
import { RootState } from '@covid/core/state/root';
import { useAppDispatch } from '@covid/core/state/store';
import i18n from '@covid/locale/i18n';
import { openWebLink } from '@covid/utils/links';
import * as React from 'react';
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
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';

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
  const [dismissed, setDismissed] = React.useState<boolean>(false);
  const [imageLoading, setImageLoading] = React.useState<boolean>(false);
  const [imageLoadError, setImageLoadError] = React.useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();

  const imageProps = {
    onError: () => {
      setImageLoading(false);
      setImageLoadError(i18n.t('generic.content-can-not-be-loaded-atm'));
    },
    onLoadEnd: () => {
      setTimeout(() => {
        setImageLoading(false);
      }, 330);
    },
    onLoadStart: () => {
      setImageLoading(true);
    },
    style: [
      styles.image,
      { aspectRatio: props.aspectRatio },
      { ...(props.imageStyles as object) },
      imageLoading && { opacity: 0 },
    ],
  };

  React.useEffect(() => {
    setDismissed(dismissedCalloutIds.includes(props.calloutID));
  }, [dismissedCalloutIds]);

  React.useEffect(() => {
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
      disableShimmers={props.disableLoadingState}
      errorMessage={imageLoadError}
      loading={imageLoading}
    >
      {!dismissed ? (
        <TouchableWithoutFeedback
          accessibilityRole={props.isSharing ? 'none' : 'button'}
          accessible={props.isSharing}
          onPress={clickCallout}
        >
          <View style={styles.viewContainer}>
            {Object.keys(props.imageSource).includes('uri') ? (
              <FastImage {...imageProps} source={{ uri: (props.imageSource as ImageURISource).uri }} />
            ) : (
              <Image {...imageProps} source={props.imageSource} />
            )}
            {props.canDismiss && !props.isSharing ? (
              <TouchableWithoutFeedback onPress={clickDismiss}>
                <Image source={closeIcon} style={styles.closeCross} />
              </TouchableWithoutFeedback>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      ) : null}
    </ContentLoadingView>
  );
};

const styles = StyleSheet.create({
  closeCross: {
    end: 12,
    height: 24,
    position: 'absolute',
    tintColor: 'white',
    top: 12,
    width: 24,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
  },
  viewContainer: {
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
    marginVertical: 8,
  },
});
