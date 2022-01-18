import { BrandedButton, ShareButton } from '@covid/components/buttons';
import { BASELINE_COLOR, CURRENT_COLOR, NewlySymptomaticChart } from '@covid/components/charts/NewlySymptomaticChart';
import { ESharable } from '@covid/components/screens/share/types';
import { Text, TextWithHighlight } from '@covid/components/typography';
import Analytics, { events } from '@covid/core/Analytics';
import { selectContent, updateSelectedRegionItem } from '@covid/core/state';
import { TRegionItem } from '@covid/core/state/content/types';
import {
  ChangeRegionNewlySymptomaticModal,
  LONDON_ITEM,
} from '@covid/features/dashboard/modals/ChangeRegionNewlySymptomaticModal';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

type TProps = {
  isSharing?: boolean;
};

export function NewlySymptomaticCard(props: TProps) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const content = useSelector(selectContent);
  const [modalVisible, setModalVisible] = React.useState(false);

  const selectedRegionItem = content.selectedRegionItem || LONDON_ITEM;

  const onPressShare = React.useCallback(() => {
    Analytics.track(events.NEWLY_SYMPTOMATIC_SHARE_CLICKED);
    navigation.navigate('Share', { sharable: ESharable.NEWLY_SYMPTOMATIC });
  }, []);

  const openModal = React.useCallback(() => {
    setModalVisible(true);
  }, []);

  const onChangeItem = React.useCallback((item: TRegionItem) => {
    Analytics.track(events.NEWLY_SYMPTOMATIC_REGION_CHANGED, { region: item.key });
    dispatch(updateSelectedRegionItem(item));
    setModalVisible(false);
  }, []);

  const onRequestClose = React.useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <View style={[styles.view, props.isSharing ? styles.minimisePadding : null]}>
      <TextWithHighlight
        color={colors.purple}
        query={selectedRegionItem.label}
        rhythm={8}
        textClass={props.isSharing ? 'h5' : 'h4'}
      >
        {i18n.t('newly-symptomatic.active-covid-cases', { location: selectedRegionItem.label })}
      </TextWithHighlight>
      <Text
        inverted
        colorPalette="uiDark"
        colorShade="dark"
        style={styles.marginBottom}
        textClass={props.isSharing ? 'pXSmall' : 'pSmallLight'}
      >
        {i18n.t('newly-symptomatic.active-covid-cases-subheader')}
      </Text>

      <NewlySymptomaticChart height={props.isSharing ? 150 : 200} region={selectedRegionItem.key} />

      <View style={[styles.explanationWrapperTop, props.isSharing ? styles.minimiseMargin : null]}>
        <View style={styles.thickLineCurrent} />
        <Text inverted colorPalette="uiDark" colorShade="dark" textClass={props.isSharing ? 'pXSmall' : 'pSmallLight'}>
          {i18n.t('newly-symptomatic.current-explanation', { location: selectedRegionItem.label })}
        </Text>
      </View>

      <View style={[styles.explanationWrapperBottom, props.isSharing ? styles.minimiseMargin : null]}>
        <View style={styles.thickLineBaseline} />
        <Text inverted colorPalette="uiDark" colorShade="dark" textClass={props.isSharing ? 'pXSmall' : 'pSmallLight'}>
          {i18n.t('newly-symptomatic.baseline-explanation')}
        </Text>
      </View>

      {!props.isSharing ? (
        <BrandedButton onPress={openModal} style={styles.marginTop}>
          {i18n.t('newly-symptomatic.change-region')}
        </BrandedButton>
      ) : null}

      {!props.isSharing ? (
        <ChangeRegionNewlySymptomaticModal
          onChangeItem={onChangeItem}
          onRequestClose={onRequestClose}
          selectedItem={selectedRegionItem}
          visible={modalVisible}
        />
      ) : null}

      {!props.isSharing ? (
        <ShareButton label={i18n.t('dashboard.trendline-card.share-cta')} onPress={onPressShare} />
      ) : null}
    </View>
  );
}

const thickLineStyle: ViewStyle = {
  borderRadius: 4,
  height: 6,
  marginRight: sizes.xs,
  // Can't use the sizes util as this doesn't contain the value 6
  marginTop: 6,
  width: 16,
};

const explanationWrapper: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: sizes.l,
};

const styles = StyleSheet.create({
  explanationWrapperBottom: {
    ...explanationWrapper,
    marginTop: sizes.s,
  },
  explanationWrapperTop: {
    ...explanationWrapper,
    marginTop: sizes.l,
  },
  marginBottom: {
    marginBottom: sizes.m,
  },
  marginTop: {
    marginTop: sizes.l,
  },
  minimiseMargin: {
    marginTop: sizes.xs,
  },
  minimisePadding: {
    paddingTop: sizes.xxs,
  },
  thickLineBaseline: {
    ...thickLineStyle,
    backgroundColor: BASELINE_COLOR,
  },
  thickLineCurrent: {
    ...thickLineStyle,
    backgroundColor: CURRENT_COLOR,
  },
  view: {
    backgroundColor: colors.white,
    borderRadius: sizes.m,
    marginVertical: sizes.xs,
    paddingHorizontal: sizes.m,
    paddingTop: sizes.l,
  },
});
