import { colors } from '@theme';
import { grid } from '@tracer/branding/grid';
import Button from '@tracer/components/atoms/Button';
import Column from '@tracer/components/atoms/Column';
import ScreenBody from '@tracer/components/molecules/Screen/body';
import ScreenFooter from '@tracer/components/molecules/Screen/footer';
import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  useWindowDimensions,
  View,
} from 'react-native';

import ScreenStandardHeader from '../ScreenHeaders/standard';

export interface IFeatureIntroEntryScreenProps {
  imageSource?: ImageSourcePropType;
  imageStyle?: ImageProps;
  textStyle?: StyleProp<TextStyle>;
  title?: string;
  textButton?: string;
  onPressBack: () => void;
  onPress?: () => void;
}

const HEIGHT_FOOTER = 114;
const HEIGHT_IMAGE = 375;

/**
 * FeatureIntroEntryScreen
 *
 * @param style custom styling, overrides all other styles
 * @param children components to display withing the screen
 */
export default function FeatureIntroEntryScreen({
  imageStyle,
  textStyle,
  imageSource,
  title,
  textButton,
  onPressBack,
  onPress,
}: IFeatureIntroEntryScreenProps) {
  const { height } = useWindowDimensions();
  return (
    <Column style={{ height }}>
      <ScreenStandardHeader onGoBack={onPressBack} style={[baseStyle.nav]} />
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
    </Column>
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
  nav: {
    backgroundColor: colors.white,
    paddingVertical: grid.g32,
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
