import { CovidAppByZOE } from '@assets/logos/CovidAppByZOE';
import { BrandedButton } from '@covid/components';
import { CaptionText, Header3Text, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import { TContentState } from '@covid/core/state/contentSlice';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { EHeaderType } from '@covid/features/dashboard/types';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { cleanIntegerVal } from '@covid/utils/number';
import { colors } from '@theme';
import * as React from 'react';
import { PixelRatio, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

interface IProps {
  reportedCount?: string;
  onPress: VoidFunction;
}

export function ExpandedHeader(props: IProps) {
  const content = useSelector<TRootState, TContentState>((state) => state.content);
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);
  const [contributors, setContributors] = React.useState<string | null>(null);

  const prettyContributorsValue = i18n.toNumber(contributors ? cleanIntegerVal(contributors) : 0, {
    delimiter: ',',
    precision: 0,
  });

  React.useEffect(() => {
    setContributors(startupInfo?.users_count.toString() ?? null);
  }, [startupInfo]);

  const onReport = React.useCallback(() => {
    Analytics.track(events.REPORT_NOW_CLICKED, { headerType: EHeaderType.Expanded });
    props.onPress();
  }, [props.onPress]);

  return (
    <View style={styles.root}>
      <View style={styles.logoWrapper}>
        <CovidAppByZOE />
      </View>

      <View style={styles.card}>
        <Header3Text style={styles.textToday}>{content.todayDate}</Header3Text>

        <BrandedButton onPress={onReport} style={styles.button} testID="button-report-today">
          {PixelRatio.getFontScale() < 1.1
            ? i18n.t('dashboard.report-today')
            : i18n.t('dashboard.report-today-large-font')}
        </BrandedButton>

        {props.reportedCount ? (
          <CaptionText style={styles.textCount}>
            {i18n.t('dashboard.you-have-reported-x-times', { count: props.reportedCount })}
          </CaptionText>
        ) : null}
      </View>

      {contributors ? (
        <View style={styles.contributorsWrapper}>
          <RegularText style={[styles.textContributors, styles.marginBottom]}>
            {i18n.t('dashboard.contributors-so-far')}
          </RegularText>
          <Header3Text style={styles.textContributors}>{prettyContributorsValue}</Header3Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: colors.purple,
    elevation: 0,
    height: 48,
    marginTop: sizes.m,
    paddingHorizontal: sizes.xl,
  },
  card: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: sizes.m,
    marginHorizontal: sizes.m,
    paddingVertical: sizes.l,
  },
  contributorsWrapper: {
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  logoWrapper: {
    height: sizes.headerCompactHeight,
    justifyContent: 'center',
    paddingLeft: sizes.m,
    width: '100%',
  },
  marginBottom: {
    marginBottom: sizes.xxs,
  },
  root: {
    alignItems: 'center',
    backgroundColor: colors.predict,
    height: sizes.headerExpandedHeight,
  },
  textContributors: {
    color: colors.white,
    textAlign: 'center',
  },
  textCount: {
    color: colors.backgroundFour,
    marginTop: sizes.m,
    textAlign: 'center',
  },
  textToday: {
    color: 'white',
    textAlign: 'center',
    width: '100%',
  },
});
