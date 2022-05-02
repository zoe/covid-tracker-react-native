import { covidIcon } from '@assets';
import InAppCompactIcon from '@assets/v2/in-app-compact-icon';
import Analytics, { events } from '@covid/core/Analytics';
import { TStateApp } from '@covid/core/state/app/types';
import { TRootState } from '@covid/core/state/root';
import { EHeaderType } from '@covid/features/dashboard/types';
import i18n from '@covid/locale/i18n';
import Button from '@tracer/components/atoms/Button';
import React from 'react';
import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';

import { covidStyles, healthStudyStyles } from './CompactHeaderStyles';

interface ICompactHeaderProps {
  onPress: () => void;
}

export function CompactHeader(props: ICompactHeaderProps) {
  const app = useSelector<TRootState, TStateApp>((state) => state.app);
  const onReport = React.useCallback(() => {
    Analytics.track(events.REPORT_NOW_CLICKED, { headerType: EHeaderType.Compact });
    props.onPress();
  }, [props.onPress]);

  const styles = app.toggleReBrand ? healthStudyStyles : covidStyles;
  return (
    <View style={styles.root}>
      <View style={styles.flex}>
        {app.toggleReBrand ? <InAppCompactIcon /> : <Image source={covidIcon} style={styles.logo} />}
      </View>
      <View style={styles.flex2}>
        <Button buttonType="accent" onPress={onReport} style={styles.button} text={i18n.t('dashboard.report-now')} />
      </View>
      <View style={styles.flex} />
    </View>
  );
}
