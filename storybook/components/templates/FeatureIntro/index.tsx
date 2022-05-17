import { ScrollView } from '@covid/components/ScrollView';
import { grid } from '@tracer/branding/grid';
import Button from '@tracer/components/atoms/Button';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import Tag from '@tracer/components/atoms/Tag';
import Dots from '@tracer/components/molecules/Dots';
import ScreenBody from '@tracer/components/molecules/Screen/body';
import ScreenFooter from '@tracer/components/molecules/Screen/footer';
import React from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, Text, useWindowDimensions, ViewStyle } from 'react-native';

import { colors } from '../../../branding/colors';
import ScreenStandardHeader from '../ScreenHeaders/standard';

export interface IFeatureIntroScreenProps {
  imageSource?: ImageSourcePropType;
  feature: string;
  title: string;
  content?: string;
  style?: StyleProp<ViewStyle>;
  textButton?: string;
  introPageIndex: number;
  introPageLength?: number;
  onPress?: (updatePage: number) => void;
}

/**
 * FeatureIntroScreen
 *
 * @param style custom styling, overrides all other styles
 * @param children components to display withing the screen
 */
export default function FeatureIntroScreen({
  imageSource,
  feature,
  title,
  content,
  textButton,
  introPageIndex,
  introPageLength = 0,
  onPress,
}: IFeatureIntroScreenProps) {
  const onPressNext = () => {
    if (onPress) onPress(introPageIndex + 1);
  };

  const onPressBack = () => {
    if (onPress) onPress(introPageIndex - 1);
  };

  const { width, height } = useWindowDimensions();
  return (
    <Column style={{ height, width }}>
      <ScrollView>
        <ScreenStandardHeader onGoBack={onPressBack} style={[baseStyle.nav]} />
        <Row style={[baseStyle.imageRow]}>
          {/* @ts-ignore */}
          <Image resizeMode="contain" source={imageSource} style={baseStyle.image} />
        </Row>
        <ScreenBody style={[baseStyle.body]}>
          <Column>
            <Row style={[baseStyle.tagRow]}>
              <Column>
                <Tag style={[baseStyle.tag]} text={feature} />
              </Column>
            </Row>
            <Row style={[baseStyle.row]}>
              <Column style={[baseStyle.contentColumn]}>
                <Row style={[baseStyle.row]}>
                  <Text style={baseStyle.title}>{title}</Text>
                </Row>
                <Row style={[baseStyle.row, baseStyle.contentRow]}>
                  <Text style={baseStyle.content}>{content}</Text>
                </Row>
              </Column>
            </Row>
          </Column>
        </ScreenBody>
        <ScreenFooter style={[baseStyle.footer]}>
          <Button onPress={onPressNext} text={textButton} />
          <Dots activeIndex={introPageIndex} length={introPageLength} />
        </ScreenFooter>
      </ScrollView>
    </Column>
  );
}

const baseStyle = StyleSheet.create({
  body: {
    paddingHorizontal: grid.g16,
  },
  content: {
    fontSize: 16,
    fontWeight: '200',
    lineHeight: grid.g24,
    textAlign: 'center',
  },
  contentColumn: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  contentRow: {
    paddingTop: grid.g12,
  },
  footer: {
    marginTop: grid.g16,
    paddingHorizontal: grid.g32,
  },
  image: {
    backgroundColor: colors.surface.subdued,
    maxHeight: 200,
  },
  imageRow: {
    backgroundColor: colors.surface.subdued,
  },
  nav: {
    backgroundColor: colors.surface.subdued,
    paddingVertical: grid.g32,
  },
  row: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  tag: {
    paddingHorizontal: grid.g8,
    paddingVertical: grid.g4,
  },
  tagRow: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: grid.g16,
    paddingTop: grid.g24,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 40,
    textAlign: 'center',
  },
});
