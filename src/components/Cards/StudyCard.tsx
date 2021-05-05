import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { RoundIconButton, Tag, Text } from '@covid/components';
import { QuoteMarks } from '@assets';
import { TStyleObject } from '@covid/utils/types';
import { COLORS, SIZES, STYLING } from '@covid/constants';

interface IProps {
  doctorLocation: string;
  doctorName: string;
  doctorTitle: string;
  imageNode?: React.ReactNode;
  onPress: () => void;
  showQuotes?: boolean;
  style?: TStyleObject;
  tagColor: string;
  title: string;
}

function DietStudyCard(props: IProps) {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.touchable, props.style]}>
      <View style={styles.containerUpper}>
        <View style={styles.containerTitle}>
          {props.showQuotes ? <QuoteMarks style={STYLING.marginBottomSmall} /> : null}
          <Text textClass="h5Regular">{props.title}</Text>
        </View>
        <View style={STYLING.itemsEnd}>
          {props.imageNode}
          <Text>{props.doctorName}</Text>
          <Text textClass="pSmall" style={styles.grayText}>
            {props.doctorTitle}
          </Text>
          <Text textClass="pSmall" style={styles.grayText}>
            {props.doctorLocation}
          </Text>
        </View>
      </View>
      <View style={styles.containerLower}>
        <Tag color={props.tagColor} text={i18n.t('navigation.insights').toUpperCase()} />
        <RoundIconButton
          iconName="arrow_forward_ios"
          onPress={props.onPress}
          style={[STYLING.shadow, STYLING.backgroundWhite]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerUpper: {
    flexDirection: 'row',
    marginBottom: SIZES.spacing,
  },
  containerLower: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerTitle: {
    paddingRight: SIZES.spacingSmall,
    flex: 1,
  },
  grayText: {
    color: COLORS.gray,
  },
  touchable: {
    borderWidth: SIZES.border,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadiusBig,
    paddingHorizontal: SIZES.spacing,
    paddingVertical: SIZES.spacingBig,
  },
});

export default DietStudyCard;
