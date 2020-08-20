import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import moment from 'moment';

import { colors } from '@theme';
import { Header3Text, RegularText, BrandedButton, CaptionText } from '@covid/components/Text';
import { covidIcon } from '@assets';
import i18n from '@covid/locale/i18n';
import Analytics, { events } from '@covid/core/Analytics';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { IContentService } from '@covid/core/content/ContentService';

interface Props {
  reportedCount?: string;
  reportOnPress: VoidFunction;
}

enum HeaderType {
  Compact = 'compact',
  Expanded = 'expanded',
}

export const Header: React.FC<Props> = ({ reportedCount, reportOnPress }) => {
  const todaysDate = (): string => moment().format('dddd Do MMMM');

  const contentService = useInjection<IContentService>(Services.Content);
  const [contributors, setContributors] = useState<string | null>(null);

  const prettyContributorsValue = i18n.toNumber(contributors ? parseInt(contributors) : 0, {
    precision: 0,
    delimiter: ',',
  });

  useEffect(() => {
    (async () => {
      try {
        setContributors(await contentService.getUserCount());
      } catch (_) {}
    })();
  }, []);

  const onReport = () => {
    Analytics.track(events.REPORT_NOW_CLICKED, { headerType: HeaderType.Expanded });
    reportOnPress();
  };

  return (
    <View style={styles.root}>
      <Image source={covidIcon} style={styles.logo} />

      <View style={styles.reportCard}>
        <Header3Text style={styles.dateLabel}>{todaysDate()}</Header3Text>
        <BrandedButton style={[styles.reportButton, styles.reportButtonExpanded]} onPress={onReport}>
          {i18n.t('dashboard.report-today')}
        </BrandedButton>
        {reportedCount && (
          <CaptionText style={styles.reportedCount}>
            {i18n.t('dashboard.you-have-reported-x-times', { count: reportedCount })}
          </CaptionText>
        )}
      </View>

      {contributors && (
        <>
          <RegularText style={styles.contributorsLabel}>{i18n.t('dashboard.contributors-so-far')}</RegularText>
          <Header3Text style={styles.contributorsCount}>{prettyContributorsValue}</Header3Text>
        </>
      )}
    </View>
  );
};

export const CompactHeader: React.FC<Props> = ({ reportOnPress }) => {
  const onReport = () => {
    Analytics.track(events.REPORT_NOW_CLICKED, { headerType: HeaderType.Compact });
    reportOnPress();
  };

  return (
    <View style={styles.root}>
      <Image source={covidIcon} style={[styles.logo, styles.compactHeaderLogo]} />
      <BrandedButton style={[styles.reportButton, styles.reportButtonCompact]} onPress={onReport}>
        {i18n.t('dashboard.report-now')}
      </BrandedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.predict,
    alignItems: 'center',
    width: '100%',
    paddingTop: 40,
    paddingBottom: 24,
  },

  logo: {
    width: 54,
    height: 54,
    resizeMode: 'contain',
    margin: 8,
  },

  compactHeaderLogo: {
    position: 'absolute',
    left: 16,
    bottom: 22,
  },

  reportCard: {
    width: '85%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 20,
    marginVertical: 16,
  },

  dateLabel: {
    fontWeight: '500',
    color: 'white',
  },

  reportButton: {
    textAlign: 'center',
    backgroundColor: colors.purple,
    alignSelf: 'center',
    elevation: 0,
    height: 48,
    marginTop: 16,
    marginBottom: 8,
  },

  reportButtonExpanded: {
    paddingHorizontal: 32,
  },

  reportButtonCompact: {
    paddingHorizontal: 52,
  },

  reportedCount: {
    margin: 4,
    textAlign: 'center',
    color: colors.backgroundFour,
  },

  contributorsLabel: {
    color: colors.white,
  },

  contributorsCount: {
    fontWeight: '500',
    color: colors.white,
  },
});
