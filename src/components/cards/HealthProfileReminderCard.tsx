import { RightArrow } from '@assets';
import { Tag } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import { Text } from '@covid/components/typography';
import Analytics, { events } from '@covid/core/Analytics';
import { THealthProfileScreenNames } from '@covid/core/state/health-profile/slice';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { colors, sizes } from '@covid/themes';
import { colors as brandColors } from '@theme';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

const HealthProfileReminderIllustration = () => {
  return (
    <Svg fill="none" height="207" viewBox="0 0 149 207" width="149">
      <G opacity="0.7">
        <G opacity="0.4">
          <Path
            d="M161.073 214.679C129.862 207.42 96.4737 207.42 65.263 214.679C49.2947 214.679 35.5039 203.065 35.5039 187.823V166.774C35.5039 128.305 70.3438 97.094 113.168 97.094C155.992 97.094 190.832 128.305 190.832 166.774V187.823C190.106 203.065 177.041 214.679 161.073 214.679Z"
            fill="#94B7D8"
            stroke="#3C70CB"
            strokeOpacity="0.8"
            strokeWidth="5.43357"
          />
          <Path
            d="M113.894 78.4864C134.739 78.4864 151.637 61.5882 151.637 40.7432C151.637 19.8982 134.739 3 113.894 3C93.0486 3 76.1504 19.8982 76.1504 40.7432C76.1504 61.5882 93.0486 78.4864 113.894 78.4864Z"
            fill="#94B7D8"
            stroke="#3C70CB"
            strokeOpacity="0.8"
            strokeWidth="5.43357"
          />
        </G>
        <Rect fill="#569BD2" height="110.948" rx="7.07545" width="14.1509" y="117.052" />
        <Rect fill="#569BD2" height="70.7545" rx="7.07545" width="14.1509" x="70.7549" y="157.245" />
        <Rect fill="#569BD2" height="59.4338" rx="7.07545" width="14.1509" x="141.509" y="168.565" />
        <Rect fill="#569BD2" height="116.037" rx="7.07545" width="14.1509" x="106.132" y="111.962" />
        <Rect fill="#569BD2" height="41.0509" width="13.3138" x="101.269" y="130.272" />
        <Path
          d="M66.5088 147.34C66.5088 141.088 71.5773 136.019 77.8295 136.019C84.0818 136.019 89.1502 141.088 89.1502 147.34V184.132H66.5088V147.34Z"
          fill="#3389CE"
        />
        <Circle
          cx="76.5545"
          cy="150.242"
          fill={brandColors.purple}
          fillOpacity="0.4"
          r="35.0057"
          stroke={brandColors.purple}
          strokeWidth="5.43357"
        />
        <Path
          d="M54.9049 145.804C54.9049 145.804 51.6514 153.571 57.1382 161.337C62.6251 169.104 71.0068 169.104 71.0068 169.104"
          stroke={brandColors.purple}
          strokeWidth="2.32867"
        />
        <Path
          d="M115.928 218.36C116.783 219.593 118.476 219.899 119.709 219.044C120.942 218.189 121.248 216.496 120.393 215.263L115.928 218.36ZM92.0742 183.966L115.928 218.36L120.393 215.263L96.5391 180.869L92.0742 183.966Z"
          fill={brandColors.purple}
        />
        <Rect fill="#569BD2" height="127.358" rx="7.07545" width="14.1509" x="35.377" y="100.641" />
      </G>
    </Svg>
  );
};

interface IProps {
  maxSteps: number;
  progressPercent: number;
  screenToReturnTo: THealthProfileScreenNames;
  stepsCompleted: number;
}

export default function HealthProfileReminderCard(props: IProps) {
  const onPress = () => {
    Analytics.track(events.HEALTH_PROFILE_DASHBOARD_REMINDER_CARD_CLICKED);
    if (props.screenToReturnTo === 'HPAboutYou') {
      NavigatorService.navigate('HPAboutYou');
    } else {
      NavigatorService.navigate('HPFormScreen', { screenName: props.screenToReturnTo });
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.touchable}>
      <View style={styles.backgroundImage}>
        <HealthProfileReminderIllustration />
      </View>
      <Tag color={brandColors.purple} style={styles.tag} text={i18n.t('health-profile.reminder-card.tag')} />
      <Text textClass="h4">{i18n.t('health-profile.reminder-card.title')}</Text>
      <View style={[styles.row, styles.completion]}>
        <Text inverted colorPalette="actionPrimary" colorShade="main" textClass="h1Medium">
          {i18n.t('health-profile.reminder-card.completion-percent', { percent: props.progressPercent })}
        </Text>
        <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.done}>
          {i18n.t('done')}
        </Text>
      </View>
      <ProgressStatus
        borderRadius={sizes.xs}
        color={brandColors.brand}
        currentStep={props.stepsCompleted}
        height={12}
        maxSteps={props.maxSteps}
        style={styles.progress}
      />
      <View style={[styles.continue, styles.row]}>
        <RightArrow />
        <Text inverted colorPalette="actionSecondary" colorShade="main" style={styles.marginLeft} textClass="pMedium">
          {i18n.t('health-profile.reminder-card.continue')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    bottom: 0,
    position: 'absolute',
    right: 0,
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
