import { Text } from '@covid/components';
import { grid } from '@covid/themes';
import { colors } from '@theme/colors';
import { useFormikContext } from 'formik';
import * as React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  name: string; // TODO: stricter typing
  iconName: React.ElementType;
  description: string;
  style?: StyleProp<ViewStyle>;
}

export default function DiseaseCard(props: IProps) {
  const formik = useFormikContext();
  const [active, setActive] = React.useState<boolean>(false);
  const onPress = () => {
    setActive((currentState) => !currentState);
    formik.setValues({ [props.name]: true });
  };

  // TODO: Can't get vertical align center on description

  const IconName = props.iconName;
  return (
    <View style={[styles.container, styles.shadow, active ? styles.activeCard : null, props.style]}>
      <Pressable
        accessible
        accessibilityLabel={`Select ${props.name}`}
        accessibilityRole="checkbox"
        onPress={onPress}
        style={styles.pressable}
      >
        <IconName color={active ? colors.white : colors.darkblue} />
        <View style={styles.textSection}>
          <Text rhythm={2} style={[styles.name, active ? styles.activeName : null]} textClass="pSmallMedium">
            {props.name}
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
