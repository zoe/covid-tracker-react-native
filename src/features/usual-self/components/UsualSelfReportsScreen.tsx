import { Tag, Text, TextWithBoldInserts } from '@covid/components';
import FeatureIntroScreen from '@covid/components/FeatureIntroScreen';
import { IconTime } from '@covid/features/study-hub/components/IconTime';
import { TUsualSelfSetupScreenName } from '@covid/features/usual-self/data/types';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { Image, ImageSourcePropType, StyleSheet, useWindowDimensions, View } from 'react-native';

const ILLUSTRATION_WIDTH_HEIGHT_RATIO = 375 / 205;

interface IProps {
  activeDot: number;
  buttonTitle: string;
  description: string;
  illustration: ImageSourcePropType;
  nextScreenName: keyof TScreenParamList;
  nextScreenParams?: { screenName: TUsualSelfSetupScreenName };
  showTime?: boolean;
  testID: string;
  title: string;
}

export default function UsualSelfReportsScreen(props: IProps) {
  const windowDimensions = useWindowDimensions();
  const minWidthIllustration = windowDimensions.width;
  const minHeightIllustration = minWidthIllustration / ILLUSTRATION_WIDTH_HEIGHT_RATIO;

  return (
    <FeatureIntroScreen
      noPadding
      activeDot={props.activeDot}
      buttonOnPress={() => NavigatorService.navigate(props.nextScreenName, props.nextScreenParams)}
      buttonTitle={props.buttonTitle}
      headerBgColor={colors.backgroundSecondary}
      testID={props.testID}
    >
      <View style={[styles.illustrationWrapper, { minHeight: minHeightIllustration, minWidth: minWidthIllustration }]}>
        <Image resizeMode="contain" source={props.illustration} style={styles.illustration} />
      </View>
      <View style={styles.content}>
        <Tag color={colors.lightBlueBrand} style={styles.tag} text={i18n.t('usual-self.tag')} />
        <Text
          inverted
          colorPalette="uiDark"
          colorShade="darker"
          rhythm={sizes.m}
          textAlign="center"
          textClass="h2Light"
        >
          {props.title}
        </Text>
        <TextWithBoldInserts
          inverted
          colorPalette="uiDark"
          colorShade="darker"
          rhythm={sizes.l}
          textAlign="center"
          textClass="h5Light"
        >
          {props.description}
        </TextWithBoldInserts>

        {props.showTime ? (
          <View style={styles.rowWrapper}>
            <IconTime color={colors.primary} />
            <Text style={styles.time} textClass="labelMedium">
              {i18n.t('usual-self.time')}
            </Text>
          </View>
        ) : null}
      </View>
    </FeatureIntroScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: sizes.screenHorizontalPadding,
    paddingVertical: sizes.screenVerticalPadding,
  },
  illustration: {
    height: '100%',
    width: '100%',
  },
  illustrationWrapper: {
    alignSelf: 'center',
    backgroundColor: colors.backgroundSecondary,
    height: 205,
    width: 205 * ILLUSTRATION_WIDTH_HEIGHT_RATIO,
  },
  rowWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: sizes.s,
  },
  tag: {
    alignSelf: 'center',
    marginBottom: sizes.m,
  },
  time: {
    marginLeft: sizes.xs,
    textTransform: 'uppercase',
  },
});
