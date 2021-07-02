import { Text } from '@covid/components';
import { TDisease } from '@covid/features/reconsent/types';
import { grid } from '@covid/themes';
import { colors } from '@theme/colors';
import { useFormikContext } from 'formik';
import * as React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  description: string;
  style?: StyleProp<ViewStyle>;
  IconComponent?: React.ComponentType<any>;
  title: string;
  databaseField: TDisease;
}

export default function DiseaseCard(props: IProps) {
  const formik = useFormikContext();
  const [active, setActive] = React.useState<boolean>(false);
  const onPress = async () => {
    setActive((currentState) => !currentState);
    formik.setFieldValue(props.databaseField, !active, true);
  };

  // TODO: Can't get vertical align center on description

  return (
    <View style={[styles.container, styles.shadow, active ? styles.activeCard : null, props.style]}>
      <Pressable
        accessible
        accessibilityLabel={`Select ${props.title}`}
        accessibilityRole="checkbox"
        onPress={onPress}
        style={styles.pressable}
      >
        {props.IconComponent ? <props.IconComponent color={active ? colors.white : colors.darkblue} /> : null}
        <View style={styles.textSection}>
          <Text rhythm={2} style={[styles.name, active ? styles.activeName : null]} textClass="pSmallMedium">
            {props.title}
          </Text>
          <Text
            style={[styles.description, active ? styles.activeDescription : styles.inactiveDescription]}
            textClass="h6Light"
          >
            {props.description}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  activeCard: {
    backgroundColor: colors.darkblue,
  },
  activeDescription: {
    color: colors.white,
  },
  activeName: {
    color: colors.white,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: grid.s,
  },
  description: {
    minHeight: grid.xxxl,
    paddingRight: grid.l,
  },
  inactiveDescription: {
    color: colors.secondary,
  },
  name: {
    color: colors.darkblue,
    paddingRight: grid.l,
  },
  pressable: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: grid.l,
    paddingVertical: grid.s,
  },
  shadow: {
    shadowColor: colors.hrColor,
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 2,
    shadowRadius: 10,
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: grid.xl,
    paddingRight: grid.l,
  },
});
