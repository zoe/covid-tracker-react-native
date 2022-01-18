import { Text } from '@covid/components';
import { IconArrowRight } from '@covid/features/study-hub/components/IconArrowRight';
import { IconTime } from '@covid/features/study-hub/components/IconTime';
import { RowInterested } from '@covid/features/study-hub/components/RowInterested';
import { TStudy } from '@covid/features/study-hub/types';
import i18n from '@covid/locale/i18n';
import { sizes, styling } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

type TProps = {
  active: boolean;
  onPress: () => void;
  enableOnboardingOverlay?: boolean;
  study: TStudy;
  style?: StyleProp<ViewStyle>;
  cardColor: string;
};

export function StudyCard(props: TProps) {
  return (
    <TouchableOpacity
      accessible
      onPress={props.onPress}
      style={[styles.outerWrapper, styling.shadow, props.style]}
      testID={`study-card-${props.study.key}`}
    >
      <View style={styles.innerWrapper}>
        <View style={[styles.lineColor, { backgroundColor: props.cardColor }]} />
        <Text inverted colorPalette="uiDark" colorShade="main" style={styles.marginBottom} textClass="pSmallMedium">
          {props.study.organiser}
        </Text>
        <Text inverted colorPalette="uiDark" colorShade="darker" style={styles.marginBottom} textClass="h5Medium">
          {props.study.title}
        </Text>
        <View style={styles.rowWrapper}>
          <IconTime />
          <Text inverted colorPalette="uiDark" colorShade="main" style={styles.marginLeft} textClass="pXSmall">
            {props.study.commitment}
          </Text>
        </View>
        <View style={styles.rowWrapper}>
          <IconArrowRight />
          <Text inverted colorPalette="uiDark" colorShade="main" style={styles.marginLeft} textClass="pXSmall">
            {i18n.t('more-details')}
          </Text>
        </View>
        <View style={styles.lineHorizontal} />
        <RowInterested
          enableOnboardingOverlay={props.enableOnboardingOverlay}
          study={props.study}
          style={styles.rowInterested}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  innerWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: sizes.m,
    overflow: 'hidden',
    paddingHorizontal: sizes.m,
    paddingTop: sizes.m,
  },
  lineColor: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 6,
  },
  lineHorizontal: {
    backgroundColor: colors.hrColor,
    height: 1,
  },
  lineVertical: {
    backgroundColor: colors.hrColor,
    height: 24,
    marginHorizontal: sizes.m,
    marginVertical: sizes.xs,
    width: 1,
  },
  marginBottom: {
    marginBottom: sizes.xs,
  },
  marginHorizontal: {
    marginHorizontal: sizes.xxs,
  },
  marginLeft: {
    marginLeft: sizes.xs,
  },
  marginRight: {
    marginRight: sizes.xs,
  },
  outerWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: sizes.m,
  },
  rowInterested: {
    justifyContent: 'flex-end',
    paddingVertical: sizes.xs,
  },
  rowWrapper: {
    flexDirection: 'row',
    marginBottom: sizes.xs,
  },
});
