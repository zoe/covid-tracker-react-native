import React, { useState, useRef, useEffect } from 'react';
import { Linking, Image, View, StyleSheet, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { IWebflowBlogModel } from '@covid/core/content/WebflowModels.interfaces';
import { useInjection } from '@covid/provider/services.hooks';
import { IWebflowService } from '@covid/core/content/WebflowClient';
import { Services } from '@covid/provider/services.types';
import { Header3Text, CaptionText } from '@covid/components/Text';
import { colors } from '@theme';
import { openWebLink } from '@covid/utils/links';

type Props = {
  model: IWebflowBlogModel;
};

export const NewsCard: React.FC<Props> = ({ model }) => {
  const webflowService = useInjection<IWebflowService>(Services.WebflowService);
  const onPress = () => {
    openWebLink(webflowService.getUKBlogPostUrl(model.slug));
  };
  const displayDate = (): string => moment(model.publishedDate).format('MMMM DD, YYYY');

  // Animation code

  const [pressedDown, setPressedDown] = useState<boolean>(false);

  const opacity = { start: 0, end: 1 };
  const translateY = { start: 25, end: 0 };

  const fadeAnimation = useRef(new Animated.Value(opacity.start)).current;
  const translateAnimation = useRef(new Animated.Value(translateY.start)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const getFadeInTiming = (value: any) => ({
    toValue: value,
    duration: 250,
    easing: Easing.out(Easing.quad),
    useNativeDriver: true,
  });

  const minScale = 0.92;
  const getScaleRange = (pressed: boolean): number[] => (pressed ? [1, minScale] : [minScale, 1]);
  const scaleTiming = {
    toValue: 1,
    duration: 75,
    easing: pressedDown ? Easing.out(Easing.quad) : Easing.in(Easing.quad),
    useNativeDriver: true,
  };

  // Button scale state

  const setPressedAnimationState = (pressed: boolean) => {
    setPressedDown(pressed);
    scaleAnimation.setValue(0);
    Animated.timing(scaleAnimation, scaleTiming).start();
  };

  const onPressDown = () => {
    setPressedAnimationState(true);
  };
  const onPressRelease = () => {
    setPressedAnimationState(false);
  };

  useEffect(() => {
    Animated.timing(fadeAnimation, getFadeInTiming(opacity.end)).start();
    Animated.timing(translateAnimation, getFadeInTiming(translateY.end)).start();
  });

  const containerStyle = {
    opacity: fadeAnimation,
    transform: [
      {
        translateY: translateAnimation,
      },
      {
        scale: scaleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: getScaleRange(pressedDown),
        }),
      },
    ],
  };

  // End of Animation code

  return (
    <Animated.View style={containerStyle}>
      <TouchableWithoutFeedback onPressIn={onPressDown} onPressOut={onPressRelease} onPress={onPress}>
        <View style={styles.root}>
          <Image source={{ uri: model.mainImage?.url }} style={styles.image} />
          <View style={styles.textContainer}>
            <Header3Text style={styles.titleLabel}>{model.name}</Header3Text>
            <CaptionText>{displayDate()}</CaptionText>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },

  image: {
    height: 240,
    resizeMode: 'cover',
    overflow: 'hidden',
  },

  textContainer: {
    margin: 16,
    paddingHorizontal: 0,
  },

  titleLabel: {
    fontWeight: '500',
    marginBottom: 8,
  },
});
