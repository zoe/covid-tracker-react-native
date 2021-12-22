import { BrandedButton } from '@covid/components';
import { BASELINE_COLOR, CURRENT_COLOR, NewlySymptomaticChart } from '@covid/components/charts/NewlySymptomaticChart';
import { Text, TextWithHighlight } from '@covid/components/typography';
import {
  ChangeRegionNewlySymptomaticModal,
  LONDON_ITEM,
  TRegionItem,
} from '@covid/features/dashboard/modals/ChangeRegionNewlySymptomaticModal';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export function NewlySymptomaticCard() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<TRegionItem>(LONDON_ITEM);

  const openModal = React.useCallback(() => {
    // Analytics.track(events.TRENDLINE_MORE_DETAILS_CLICKED);
    setModalVisible(true);
  }, []);

  const onChangeItem = React.useCallback((region: TRegionItem) => {
    // Analytics.track(events.TRENDLINE_MORE_DETAILS_CLICKED);
    setSelectedItem(region);
    setModalVisible(false);
  }, []);

  const onRequestClose = React.useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <View style={styles.view}>
      <TextWithHighlight color={colors.purple} query={selectedItem.label} rhythm={8} textClass="h4">
        {i18n.t('newly-symptomatic.active-covid-cases', { location: selectedItem.label })}
      </TextWithHighlight>
      <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.marginBottom} textClass="pSmallLight">
        {i18n.t('newly-symptomatic.active-covid-cases-subheader')}
      </Text>

      <NewlySymptomaticChart height={200} region={selectedItem.key} />

      <View style={styles.explanationWrapperTop}>
        <View style={styles.thickLineCurrent} />
        <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pSmallLight">
          {i18n.t('newly-symptomatic.current-explanation', { location: selectedItem.label })}
        </Text>
      </View>

      <View style={styles.explanationWrapperBottom}>
        <View style={styles.thickLineBaseline} />
        <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pSmallLight">
          {i18n.t('newly-symptomatic.baseline-explanation')}
        </Text>
      </View>

      <BrandedButton onPress={openModal} style={styles.margin}>
        {i18n.t('newly-symptomatic.change-region')}
      </BrandedButton>

      <ChangeRegionNewlySymptomaticModal
        onChangeItem={onChangeItem}
        onRequestClose={onRequestClose}
        selectedItem={selectedItem}
        visible={modalVisible}
      />
    </View>
  );
}

const thickLineStyle: ViewStyle = {
  borderRadius: 4,
  height: 6,
  marginRight: sizes.xs,
  width: 16,
};

const explanationWrapper: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  paddingHorizontal: sizes.l,
};

const styles = StyleSheet.create({
  alignCenter: {
    alignSelf: 'center',
  },
  antibodyTitle: {
    flex: 1,
    flexWrap: 'wrap',
    marginBottom: sizes.xs,
  },
  deltaTag: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  explanationWrapperBottom: {
    ...explanationWrapper,
    marginTop: sizes.s,
  },
  explanationWrapperTop: {
    ...explanationWrapper,
    marginTop: sizes.l,
  },
  flex: {
    flex: 1,
  },
  margin: {
    margin: sizes.l,
  },
  marginBottom: {
    marginBottom: sizes.m,
  },
  marginRight: {
    marginRight: sizes.s,
  },
  marginTop: {
    marginTop: sizes.l,
  },
  thickLineBaseline: {
    ...thickLineStyle,
    backgroundColor: BASELINE_COLOR,
  },
  thickLineCurrent: {
    ...thickLineStyle,
    backgroundColor: CURRENT_COLOR,
  },
  touchableChart: {
    marginTop: sizes.m,
    width: '100%',
  },
  touchableText: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: sizes.m,
  },
  view: {
    backgroundColor: colors.white,
    borderRadius: sizes.m,
    marginVertical: sizes.xs,
    paddingHorizontal: sizes.m,
    paddingTop: sizes.l,
  },
});
