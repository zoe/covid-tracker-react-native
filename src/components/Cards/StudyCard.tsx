import React from 'react';
import { StyleSheet, TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';

import i18n from '@covid/locale/i18n';
import { RoundIconButton, Tag, Text } from '@covid/components';
import { QuoteMarks } from '@assets';
import { colors, sizes, styling } from '@covid/themes';

interface IProps {
  doctorLocation: string;
  doctorName: string;
  doctorTitle: string;
  imageNode?: React.ReactNode;
  onPress: () => void;
  showQuotes?: boolean;
  style?: StyleProp<ViewStyle>;
  tagColor: string;
  title: string;
}

function DietStudyCard(props: IProps) {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.touchable, props.style]}>
      <View style={styles.containerUpper}>
        <View style={styles.containerTitle}>
          {props.showQuotes ? <QuoteMarks style={styling.marginBottomSmall} /> : null}
          <Text textClass="h5Regular">{props.title}</Text>
        </View>
        <View style={styling.itemsEnd}>
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
          style={[styling.shadow, styling.backgroundWhite]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerUpper: {
    flexDirection: 'row',
    marginBottom: sizes.spacing,
  },
  containerLower: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerTitle: {
    paddingRight: sizes.spacingSmall,
    flex: 1,
  },
  grayText: {
    color: colors.gray.main.bgColor,
  },
  touchable: {
    borderWidth: sizes.border,
    borderColor: colors.gray.light.bgColor,
    backgroundColor: 'white',
    borderRadius: sizes.borderRadiusBig,
    paddingHorizontal: sizes.spacing,
    paddingVertical: sizes.spacingBig,
  },
});

export default DietStudyCard;
