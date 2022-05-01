import { BrandedButton } from '@covid/components/buttons';
import { NewlySymptomaticChart } from '@covid/components/charts/NewlySymptomaticChart';
import { ESharable } from '@covid/components/screens/share/types';
import { Text, TextWithHighlight } from '@covid/components/typography';
import { selectContent, updateSelectedRegionItem } from '@covid/core/state';
import { TStateApp } from '@covid/core/state/app/types';
import { TRegionItem } from '@covid/core/state/content/types';
import { TRootState } from '@covid/core/state/root';
import {
  ChangeRegionNewlySymptomaticModal,
  LONDON_ITEM,
} from '@covid/features/dashboard/modals/ChangeRegionNewlySymptomaticModal';
import i18n from '@covid/locale/i18n';
import { useNavigation } from '@react-navigation/native';
import ShareButton from '@tracer/components/molecules/ShareButton';
import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  COVID_SHARE_BTN_COLOR,
  covidStyles,
  HEALTH_STUDY_SHARE_BTN_COLOR,
  healthStudyStyles,
} from './NewlySymptomaticCardStyle';

type TProps = {
  isSharing?: boolean;
};

export function NewlySymptomaticCard(props: TProps) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const app = useSelector<TRootState, TStateApp>((state) => state.app);
  const content = useSelector(selectContent);
  const [modalVisible, setModalVisible] = React.useState(false);

  const selectedRegionItem = content.selectedRegionItem || LONDON_ITEM;

  const onPressShare = React.useCallback(() => {
    navigation.navigate('Share', { sharable: ESharable.NEWLY_SYMPTOMATIC });
  }, []);

  const openModal = React.useCallback(() => {
    setModalVisible(true);
  }, []);

  const onChangeItem = React.useCallback((item: TRegionItem) => {
    dispatch(updateSelectedRegionItem(item));
    setModalVisible(false);
  }, []);

  const onRequestClose = React.useCallback(() => {
    setModalVisible(false);
  }, []);

  const styles = app.toggleReBrand ? healthStudyStyles : covidStyles;
  const shareBtnColor = app.toggleReBrand ? HEALTH_STUDY_SHARE_BTN_COLOR : COVID_SHARE_BTN_COLOR;
  return (
    <View style={[styles.view, props.isSharing ? styles.minimisePadding : null]}>
      <TextWithHighlight
        color={styles.textWithHighlight.color.purple}
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
        <ShareButton
          label={i18n.t('dashboard.trendline-card.share-cta')}
          onPress={onPressShare}
          shareIconStrokeColor={shareBtnColor}
          textStyle={{ color: shareBtnColor }}
        />
      ) : null}
    </View>
  );
}
