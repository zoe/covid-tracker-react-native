import { Text } from '@covid/components';
import { grid } from '@covid/themes';
import { colors } from '@theme/colors';
import * as React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  name: string;
  iconName: React.ElementType;
  description: string;
  onPressHandler: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function DiseaseCard(props: IProps) {
  const [active, setActive] = React.useState<boolean>(false);
  const onPress = () => {
    setActive((currentState) => !currentState);
    props.onPressHandler();
  };

  // TODO: Vertical align description??
  // confused about light font weight? go by name or actual prop in Figma?

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
          <Text style={[styles.name, active ? styles.activeName : null]} textClass="pSmall">
            {props.name}
          </Text>
          <Text
            style={[styles.description, active ? styles.activeDescription : styles.inactiveDescription]}
            textClass="pXSmall"
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
    paddingRight: grid.gutter,
  },
  inactiveDescription: {
    color: colors.secondary,
  },
  name: {
    color: colors.darkblue,
    marginBottom: grid.xxs,
    paddingRight: grid.gutter,
  },
  pressable: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: grid.gutter,
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
    paddingRight: grid.gutter,
  },
});
