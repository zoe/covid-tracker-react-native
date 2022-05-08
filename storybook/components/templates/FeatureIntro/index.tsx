import IconArrowLeft from '@assets/v2/svg/icon-arrow-left';
import { grid } from '@tracer/branding/grid';
import Button from '@tracer/components/atoms/Button';
import Row from '@tracer/components/atoms/Row';
import Screen from '@tracer/components/atoms/Screen';
import Tag from '@tracer/components/atoms/Tag';
import Dots from '@tracer/components/molecules/Dots';
import IconButton from '@tracer/components/molecules/IconButton';
import ScreenBody from '@tracer/components/molecules/Screen/body';
import ScreenFooter from '@tracer/components/molecules/Screen/footer';
import { ScreenNavigatorCompact } from '@tracer/components/organisms/Screen/nav';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import { colors } from '../../../branding/colors';

export interface IFeatureIntroScreenProps {
  imageSource?: ImageSourcePropType;
  feature: string;
  title: string;
  content?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  textButton?: string;
  introPageIndex: number;
  introPageLength?: number;
  onPress?: (updatePage: number) => void;
}

const FOOTER_HEIGHT = 100;

/**
 * FeatureIntroScreen
 *
 * @param style custom styling, overrides all other styles
 * @param children components to display withing the screen
 */
export default function FeatureIntroScreen({
  style,
  imageSource,
  feature,
  title,
  content,
  testID = 'FeatureIntroScreen-test-ID',
  textButton,
  introPageIndex,
  introPageLength = 0,
  onPress,
}: IFeatureIntroScreenProps) {
  const { height } = useWindowDimensions();

  const onPressNext = () => {
    if (onPress) onPress(introPageIndex + 1);
  };

  const onPressBack = () => {
    if (onPress) onPress(introPageIndex - 1);
  };

  return (
    <Screen testID={testID}>
      <ScreenNavigatorCompact
        left={
          <IconButton onPress={onPressBack}>
            <IconArrowLeft />
          </IconButton>
        }
        style={baseStyle.navView}
      />
      <ScreenBody>
        {/* @ts-ignore */}
        <View style={[baseStyle.imageView]}>
          {/* @ts-ignore */}
          <Image resizeMode="contain" source={imageSource} style={baseStyle.image} />
        </View>
        <View style={[baseStyle.mainView, { height: height - FOOTER_HEIGHT }, style]}>
          <Row>
            <Tag style={baseStyle.featureTag} text={feature} />
          </Row>
          <Text style={baseStyle.title}>{title}</Text>
          <Text style={baseStyle.content}>{content}</Text>
        </View>
      </ScreenBody>
      <ScreenFooter>
        <View style={baseStyle.footerView}>
          <Button onPress={onPressNext} style={{ height: grid.g48 }} text={textButton} />
          <Dots activeIndex={introPageIndex} length={introPageLength} />
        </View>
      </ScreenFooter>
    </Screen>
  );
}

const baseStyle = StyleSheet.create({
  content: {
    fontSize: 16,
    fontWeight: '200',
    lineHeight: grid.g24,
    paddingHorizontal: grid.g16,
    paddingVertical: grid.g16,
    textAlign: 'center',
  },
  featureTag: {
    marginBottom: grid.g16,
    width: 160,
  },
  footerView: {
    paddingHorizontal: grid.g32,
  },
  image: {
    backgroundColor: colors.tertiary,
    maxHeight: 205,
  },
  imageView: {
    backgroundColor: colors.tertiary,
  },
  mainView: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: grid.g24,
    textAlign: 'center',
  },
  navView: {
    backgroundColor: colors.tertiary,
    flexDirection: 'row',
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 40,
    textAlign: 'center',
  },
  view: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
