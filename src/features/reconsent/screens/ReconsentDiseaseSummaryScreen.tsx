import { Text } from '@covid/components';
import { selectDiseasesActivated } from '@covid/core/state/reconsent';
import { TRootState } from '@covid/core/state/root';
import GIF from '@covid/features/reconsent/components/GIF';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';

const GIF_RATIO = 750 / 550;

export default function ReconsentDiseaseSummaryScreen() {
  const windowDimensions = useWindowDimensions();
  const diseasesActived = useSelector((state: TRootState) => selectDiseasesActivated(state.reconsent));

  const handAnimation = React.useMemo(() => require('@covid/features/reconsent/data/hand-animation.gif'), []);

  const gifWidth = Math.min(sizes.maxScreenWidth, windowDimensions.width) - 32;
  const gifHeight = gifWidth / GIF_RATIO;

  let diseasesTitle = '';
  if (diseasesActived.length === 0) {
    diseasesTitle = i18n.t('reconsent.disease-summary.various-diseases');
  } else if (diseasesActived.length === 1) {
    diseasesTitle = i18n.t(`disease-cards.${diseasesActived[0]}.name`);
  } else if (diseasesActived.length === 2) {
    diseasesTitle =
      i18n.t(`disease-cards.${diseasesActived[0]}.name`) +
      ' ' +
      i18n.t('and') +
      ' ' +
      i18n.t(`disease-cards.${diseasesActived[1]}.name`);
  } else if (diseasesActived.length > 2) {
    diseasesTitle =
      i18n.t(`disease-cards.${diseasesActived[0]}.name`) +
      ', ' +
      i18n.t(`disease-cards.${diseasesActived[1]}.name`) +
      ' ' +
      i18n.t('and') +
      ' ' +
      i18n.t('more').toLowerCase();
  }

  return (
    <ReconsentScreen
      activeDot={2}
      buttonOnPress={() => NavigatorService.navigate('ReconsentRequestConsent')}
      buttonTitle={i18n.t('reconsent.disease-summary.button')}
      testID="reconsent-disease-summary-screen"
    >
      <Text textAlign="center" textClass="h2Light">
        {i18n.t('reconsent.disease-summary.title')}
      </Text>
      {diseasesActived.length === 0 ? (
        <Text textAlign="center" textClass="h2Light">
          {diseasesTitle}
        </Text>
      ) : (
        <Text inverted colorPalette="actionSecondary" colorShade="main" textAlign="center" textClass="h2">
          {diseasesTitle}
        </Text>
      )}
      <GIF height={gifHeight} source={handAnimation} style={styles.gif} width={gifWidth} />
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  gif: {
    alignSelf: 'center',
    marginTop: 'auto',
  },
});
