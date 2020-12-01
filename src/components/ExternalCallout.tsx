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
    <>
      {!dismissed && (
        <TouchableWithoutFeedback style={styles.container} onPress={clickCallout}>
          <View style={styles.viewContainer}>
            <Image
              source={props.imageSource}
              style={[styles.image, { aspectRatio: props.aspectRatio }, { ...(props.imageStyles as object) }]}
            />
            {canDismiss && (
              <TouchableWithoutFeedback onPress={clickDismiss}>
                <Image style={styles.closeCross} source={closeIcon} />
              </TouchableWithoutFeedback>
            )}
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},

  viewContainer: {
    marginVertical: 20,
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
