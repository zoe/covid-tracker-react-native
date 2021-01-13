import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

import Analytics, { events } from '@covid/core/Analytics';
import { openWebLink } from '@covid/utils/links';
import { closeIcon } from '@assets';
import { RootState } from '@covid/core/state/root';
import { addDismissCallout } from '@covid/core/content/state/contentSlice';
import { useAppDispatch } from '@covid/core/state/store';
import { ContentLoadingView } from '@covid/components/Content/ContentLoadingView';

type ExternalCalloutProps = {
  link?: string;
  calloutID: string;
  imageSource: ImageSourcePropType;
  aspectRatio: number;
  postClicked?: VoidFunction;
  screenName: string;
  imageStyles?: StyleProp<ImageStyle>;
  canDismiss?: boolean;
};

export const ExternalCallout: React.FC<ExternalCalloutProps> = (props) => {
  const { calloutID, link, screenName, postClicked, canDismiss } = props;
  const dismissedCalloutIds = useSelector<RootState, string[]>((state) => state.content.dismissedCallouts);
  const [dismissed, setDismissed] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageLoadError, setImageLoadError] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setDismissed(dismissedCalloutIds.includes(calloutID));
  }, [dismissedCalloutIds]);

  function clickCallout() {
    Analytics.track(events.CLICK_CALLOUT, { calloutID, screenName });
    if (link) openWebLink(link);
    if (postClicked) postClicked();
  }

  function clickDismiss() {
    Analytics.track(events.CLICK_CALLOUT_DISMISS, { calloutID, screenName });
    dispatch(addDismissCallout(calloutID));
  }

  return (
    <ContentLoadingView loading={imageLoading} errorMessage={imageLoadError}>
      {!dismissed && (
        <TouchableWithoutFeedback onPress={clickCallout}>
          <View style={styles.viewContainer}>
            <Image
              source={props.imageSource}
              style={[
                styles.image,
                { aspectRatio: props.aspectRatio },
                { ...(props.imageStyles as object) },
                imageLoading && { opacity: 0 },
              ]}
              onLoadStart={() => {
                setImageLoading(true);
              }}
              onLoadEnd={() => {
                setTimeout(() => {
                  setImageLoading(false);
                }, 330);
              }}
              onError={() => {
                setImageLoading(false);
                setImageLoadError('This content can not be loaded at the moment.');
              }}
            />
            {canDismiss && (
              <TouchableWithoutFeedback onPress={clickDismiss}>
                <Image style={styles.closeCross} source={closeIcon} />
              </TouchableWithoutFeedback>
            )}
          </View>
        </TouchableWithoutFeedback>
      )}
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
