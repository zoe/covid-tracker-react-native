import { covidIcon } from '@assets';
import InAppCompactIcon from '@assets/v2/svg/in-app-compact-icon';
import { EHeaderType } from '@covid/features/dashboard/types';
import i18n from '@covid/locale/i18n';
import Analytics, { events } from '@health-study/analytics';
import { useToggleRebrand } from '@health-study/redux/app/selectors';
import Button from '@tracer/components/atoms/Button';
import React from 'react';
import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';

import { covidStyles, healthStudyStyles } from './CompactHeaderStyles';

interface ICompactHeaderProps {
  onPress: () => void;
}

export function CompactHeader(props: ICompactHeaderProps) {
  const toggleReBrand = useSelector(useToggleRebrand);
  const onReport = React.useCallback(() => {
    Analytics.track(events.REPORT_NOW_CLICKED, { headerType: EHeaderType.Compact });
    props.onPress();
  }, [props.onPress]);

  const styles = toggleReBrand ? healthStudyStyles : covidStyles;
  return (
    <View style={styles.root}>
      <View style={styles.flex}>
        {toggleReBrand ? <InAppCompactIcon /> : <Image source={covidIcon} style={styles.logo} />}
      </View>
      <View style={styles.flex2}>
        <Button buttonType="accent" onPress={onReport} style={styles.button} text={i18n.t('dashboard.report-now')} />
      </View>
      <View style={styles.flex} />
    </View>
  );
}
