import { IIconProps } from '@assets/icons/svgIcons/types';
import { Card, Text } from '@covid/components';
import { sizes } from '@covid/themes';
import { colors } from '@theme/colors';
import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

const maxDimension = 40;

interface IProps {
  IconComponent?: React.ComponentType<IIconProps>;
  description?: string;
  onPress: () => void;
  selected: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  title: string;
}

export default function DiseaseCard(props: IProps) {
  return (
    <Card
      useShadow
      accessibilityLabel={`Select ${props.title}`}
      accessibilityRole="checkbox"
      onPress={props.onPress}
      padding={sizes.s}
      style={[props.selected ? styles.cardSelected : styles.card, props.style]}
      testID={props.testID}
    >
      {props.IconComponent ? (
        <View style={styles.iconWrapper}>
          <props.IconComponent color={props.selected ? colors.white : colors.darkBlue} maxDimension={maxDimension} />
        </View>
      ) : null}
      <View style={styles.flex}>
        <Text style={props.selected ? styles.colorWhite : styles.colorDarkBlue} textClass="pSmallMedium">
          {props.title}
        </Text>
        {props.description ? (
          <Text style={props.selected ? styles.colorWhite : styles.colorSecondary} textClass="pLight">
            {props.description}
          </Text>
        ) : null}
      </View>
    </Card>
  );
}

const cardStyle: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
};

const styles = StyleSheet.create({
  activeCard: {
    backgroundColor: colors.darkBlue,
  },
  card: cardStyle,
  cardSelected: {
    ...cardStyle,
    backgroundColor: colors.darkBlue,
  },
  colorDarkBlue: {
    color: colors.darkBlue,
  },
  colorSecondary: {
    color: colors.secondary,
  },
  colorWhite: {
    color: colors.white,
  },
  flex: {
    flex: 1,
  },
  iconWrapper: {
    alignItems: 'flex-start',
    width: maxDimension + sizes.m,
  },
});
