import { externalResourcesPlaceholder } from '@assets';
import { Text } from '@covid/components';
import { IconArrowRight } from '@covid/features/study-hub/components/IconArrowRight';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import { colors } from '@theme';
import * as React from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

type TProps = {
  imageSource?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  title: string;
  url: string;
};

export function CardExternalResource(props: TProps) {
  const onPress = React.useCallback(() => openWebLink(props.url), [props.url]);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.view, props.style]}>
      <View style={styles.textWrapper}>
        <Text textClass="pSmallLight">{props.title}</Text>
        <View style={styles.iconTextWrapper}>
          <IconArrowRight color={colors.purple} />
          <Text inverted colorPalette="actionSecondary" colorShade="main" style={styles.marginLeft} textClass="p">
            {i18n.t('more-details')}
          </Text>
        </View>
      </View>
      {props.imageSource ? (
        <Image source={props.imageSource} style={styles.image} />
      ) : (
        <Image source={externalResourcesPlaceholder} style={styles.image} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconTextWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 'auto',
  },
  image: {
    aspectRatio: 4 / 3,
    backgroundColor: colors.backgroundFive,
    borderRadius: sizes.m,
    flex: 1,
    maxWidth: 320,
  },
  marginLeft: {
    marginLeft: sizes.s,
  },
  textWrapper: {
    flex: 1,
    paddingRight: sizes.m,
  },
  view: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: sizes.m,
    flexDirection: 'row',
    paddingHorizontal: sizes.s,
    paddingVertical: sizes.m,
  },
});
