import { RightArrow } from '@assets';
import { Tag } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import { Text } from '@covid/components/typography';
import ImageTimSpector from '@covid/features/health-profile/components/ImageTimSpector';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { colors, sizes } from '@covid/themes';
import Analytics, { events } from '@health-study/analytics';
import { colors as brandColors } from '@theme';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HealthProfileStartCard() {
  const onPress = () => {
    Analytics.track(events.HEALTH_PROFILE_DASHBOARD_START_CARD_CLICKED);
    NavigatorService.navigate('HPAboutYou');
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.touchable} testID="health-profile-start-card">
      <View style={styles.backgroundImage}>
        <ImageTimSpector hideTitle imageHeight={172} imageWidth={172} />
      </View>
      <Tag color={brandColors.purple} style={styles.tag} text={i18n.t('health-profile.start-card.tag')} />
      <Text textClass="h4">{i18n.t('health-profile.start-card.title')}</Text>
      <View style={[styles.row, styles.completion]}>
        <Text inverted colorPalette="actionPrimary" colorShade="main" textClass="h1Medium">
          {i18n.t('health-profile.start-card.completion-percent')}
        </Text>
        <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.done}>
          {i18n.t('done')}
        </Text>
      </View>
      <ProgressStatus
        borderRadius={sizes.xs}
        color={brandColors.brand}
        currentStep={0}
        height={12}
        maxSteps={16}
        style={styles.progress}
      />
      <View style={[styles.continue, styles.row]}>
        <RightArrow />
        <Text inverted colorPalette="actionSecondary" colorShade="main" style={styles.marginLeft} textClass="pMedium">
          {i18n.t('health-profile.start')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    bottom: 0,
    height: 148,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    width: 148,
  },
  completion: {
    marginTop: sizes.m,
  },
  continue: {
    marginTop: sizes.l,
  },
  done: {
    marginLeft: sizes.xs,
    marginTop: sizes.xs,
  },
  marginLeft: {
    marginLeft: sizes.xs,
  },
  progress: {
    width: 105,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  tag: {
    alignSelf: 'flex-start',
    marginBottom: sizes.m,
  },
  touchable: {
    backgroundColor: 'white',
    borderColor: colors.gray.light.bgColor,
    borderRadius: sizes.m,
    borderWidth: sizes.border,
    paddingHorizontal: sizes.m,
    paddingVertical: sizes.l,
  },
});
