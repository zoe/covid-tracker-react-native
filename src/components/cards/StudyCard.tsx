import { QuoteMarks } from '@assets';
import { RoundIconButton, Tag, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { colors, sizes, styling } from '@covid/themes';
import * as React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

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

export default function StudyCard(props: IProps) {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.touchable, props.style]}>
      <View style={styles.containerUpper}>
        <View style={styles.containerTitle}>
          {props.showQuotes ? <QuoteMarks /> : null}
          <Text style={props.showQuotes && styling.marginTopSmall} textClass="h5Regular">
            {props.title}
          </Text>
        </View>
        <View style={styling.itemsEnd}>
          {props.imageNode}
          <Text>{props.doctorName}</Text>
          <Text style={styles.grayText} textClass="pSmall">
            {props.doctorTitle}
          </Text>
          <Text style={styles.grayText} textClass="pSmall">
            {props.doctorLocation}
          </Text>
        </View>
      </View>
      <View style={styles.containerLower}>
        <Tag color={props.tagColor} text={i18n.t('navigation.insights')} />
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
  containerLower: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerTitle: {
    flex: 1,
    paddingRight: sizes.xs,
  },
  containerUpper: {
    flexDirection: 'row',
    marginBottom: sizes.m,
  },
  grayText: {
    color: colors.gray.main.bgColor,
  },
  touchable: {
    backgroundColor: 'white',
    borderColor: colors.gray.light.bgColor,
    borderRadius: sizes.m,
    borderWidth: sizes.border,
    paddingHorizontal: sizes.m,
    paddingVertical: sizes.l,
  },
});
