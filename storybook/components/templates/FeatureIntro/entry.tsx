import IconArrowLeft from '@assets/v2/svg/icon-arrow-left';
import { grid } from '@tracer/branding/grid';
import Button from '@tracer/components/atoms/Button';
import Screen from '@tracer/components/atoms/Screen';
import ScreenBody from '@tracer/components/molecules/Screen/body';
import ScreenFooter from '@tracer/components/molecules/Screen/footer';
import { ScreenNavigatorCompact } from '@tracer/components/organisms/Screen/nav';
import React from 'react';
import { Image, ImageProps, ImageSourcePropType, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

export interface IFeatureIntroEntryScreenProps {
  imageSource?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  imageStyle?: ImageProps;
  textStyle?: StyleProp<ViewStyle>;
  title?: string;
  testID?: string;
  textButton?: string;
  onPress?: () => void;
}

const HEIGHT_FOOTER = 114;
const HEIGHT_IMAGE = 375;

/**
 * FeatureIntroScreen
 *
 * @param style custom styling, overrides all other styles
 * @param children components to display withing the screen
 */
export default function FeatureIntroEntryScreen({
  style,
  imageStyle,
  textStyle,
  imageSource,
  title,
  testID = 'FeatureIntroScreen-test-ID',
  textButton,
  onPress,
}: IFeatureIntroEntryScreenProps) {
  return (
    <Screen style={style} testID={testID}>
      <ScreenNavigatorCompact left={<IconArrowLeft />} />
      <ScreenBody>
        <View style={[baseStyle.mainView]}>
          <Image resizeMode="contain" source={imageSource} style={[baseStyle.image, imageStyle]} />
          <Text style={[baseStyle.title, textStyle]}>{title}</Text>
        </View>
      </ScreenBody>
      <ScreenFooter>
        <View style={[baseStyle.footerView]}>
          <Button onPress={onPress} style={{ height: grid.g48 }} text={textButton} />
        </View>
      </ScreenFooter>
    </Screen>
  );
}

const baseStyle = StyleSheet.create({
  footerView: {
    height: HEIGHT_FOOTER,
    paddingHorizontal: grid.g32,
  },
  image: {
    height: HEIGHT_IMAGE,
  },
  mainView: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: grid.g32,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: grid.g48,
    paddingHorizontal: grid.g24,
    textAlign: 'center',
  },
});
