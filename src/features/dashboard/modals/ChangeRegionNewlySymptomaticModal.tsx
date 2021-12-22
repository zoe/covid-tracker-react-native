import { HeaderText, Modal } from '@covid/components';
import { Text } from '@covid/components/typography';
import { ENewlySymptomaticRegion } from '@covid/core/content/dto/ContentAPIContracts';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type TProps = {
  onChangeItem: (item: TRegionItem) => void;
  onRequestClose: () => void;
  selectedItem: TRegionItem;
  visible: boolean;
};

export type TRegionItem = { label: string; key: ENewlySymptomaticRegion };

export const LONDON_ITEM = {
  key: ENewlySymptomaticRegion.LONDON,
  label: 'London',
};

export const REGION_ITEMS: TRegionItem[] = [
  LONDON_ITEM,
  {
    key: ENewlySymptomaticRegion.EAST_MIDLANDS,
    label: 'East Midlands',
  },
  {
    key: ENewlySymptomaticRegion.EAST_OF_ENGLAND,
    label: 'East of England',
  },
  {
    key: ENewlySymptomaticRegion.WALES,
    label: 'Wales',
  },
  {
    key: ENewlySymptomaticRegion.WEST_MIDLANDS,
    label: 'West Midlands',
  },
  {
    key: ENewlySymptomaticRegion.NORTH_WEST,
    label: 'North West',
  },
  {
    key: ENewlySymptomaticRegion.NORTH_EAST,
    label: 'North East',
  },
  {
    key: ENewlySymptomaticRegion.SCOTLAND,
    label: 'Scotland',
  },
  {
    key: ENewlySymptomaticRegion.SOUTH_EAST,
    label: 'South East',
  },
  {
    key: ENewlySymptomaticRegion.SOUTH_WEST,
    label: 'South West',
  },
  {
    key: ENewlySymptomaticRegion.YORKSHIRE_AND_THE_HUMBER,
    label: 'Yorkshire and The Humber',
  },
];

export const ChangeRegionNewlySymptomaticModal = (props: TProps) => (
  <Modal
    enableBackdropDismiss
    showsVerticalScrollIndicator
    modalName="CovidTestAntibodyInfo"
    onPressClose={props.onRequestClose}
    onRequestClose={props.onRequestClose}
    testID="covid-test-antibody-info-modal"
    visible={props.visible}
  >
    <View style={styles.fullWidth} />
    <HeaderText style={styles.marginBottom}>{i18n.t('newly-symptomatic.change-region')}</HeaderText>
    {REGION_ITEMS.map((item: TRegionItem) => (
      <TouchableOpacity onPress={() => props.onChangeItem(item)} style={styles.touchable}>
        {item.key === props.selectedItem.key ? (
          <Text inverted colorPalette="actionSecondary" colorShade="main" textClass="h4">
            {item.label}
          </Text>
        ) : (
          <Text inverted colorPalette="uiDark" colorShade="dark" textClass="h4">
            {item.label}
          </Text>
        )}
      </TouchableOpacity>
    ))}
  </Modal>
);

const styles = StyleSheet.create({
  fullWidth: {
    width: 1000,
  },
  marginBottom: {
    marginBottom: sizes.s,
  },
  touchable: {
    paddingVertical: sizes.s,
  },
});
