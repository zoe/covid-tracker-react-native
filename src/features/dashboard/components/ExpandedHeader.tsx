import { CovidAppByZOE } from '@assets/logos/CovidAppByZOE';
import InAppHeaderIcon from '@assets/v2/in-app-header-icon';
import { CaptionText, Header3Text, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import { TStateApp } from '@covid/core/state/app/types';
import { TStateContent } from '@covid/core/state/content/slice';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { EHeaderType } from '@covid/features/dashboard/types';
import i18n from '@covid/locale/i18n';
import { cleanIntegerVal } from '@covid/utils/number';
import Button from '@tracer/components/atoms/Button';
import * as React from 'react';
import { PixelRatio, View } from 'react-native';
import { useSelector } from 'react-redux';

import { covidStyles, healthStudyStyle, TExpandedHeaderStyle } from './ExpandedHeaderStyles';

interface IProps {
  reportedCount?: string;
  onPress: VoidFunction;
}

export function ExpandedHeader(props: IProps) {
  const app = useSelector<TRootState, TStateApp>((state) => state.app);
  const content = useSelector<TRootState, TStateContent>((state) => state.content);
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

  const styles: TExpandedHeaderStyle = app.toggleReBrand ? healthStudyStyle : covidStyles;
  return (
    <View style={styles.root}>
      <View style={styles.logoWrapper}>{app.toggleReBrand ? <InAppHeaderIcon /> : <CovidAppByZOE />}</View>

      <View style={styles.card}>
        {PixelRatio.getFontScale() < 2.5 ? (
          <Header3Text style={styles.textToday}>{content.todayDate}</Header3Text>
        ) : null}

        <Button
          onPress={onReport}
          style={styles.button}
          testID="button-report-today"
          text={
            PixelRatio.getFontScale() < 1.1
              ? i18n.t('dashboard.report-today')
              : i18n.t('dashboard.report-today-large-font')
          }
        />

        {props.reportedCount ? (
          <CaptionText style={styles.textCount}>
            {i18n.t('dashboard.you-have-reported-x-times', { count: props.reportedCount })}
          </CaptionText>
        ) : null}
      </View>

      {contributors && PixelRatio.getFontScale() < 1.5 ? (
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
