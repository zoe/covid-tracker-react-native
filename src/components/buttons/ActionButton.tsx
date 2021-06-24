import { RegularText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import { Button } from 'native-base';
import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  children: React.ReactNode;
  error?: boolean;
  icon: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function ActionButton({ children, error = false, icon, onPress, style = {} }: IProps) {
  const backgroundColor = colors.backgroundTertiary;
  const btnStyle = [
    styles.button,
    { backgroundColor, borderColor: error ? colors.feedbackBad : 'transparent', borderWidth: 1 },
    style,
  ];
  return (
    <Button onPress={onPress} style={btnStyle}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <RegularText style={[fontStyles.bodyLight, styles.label, { color: colors.primary }]}>{children}</RegularText>
        </View>
        <View>{icon}</View>
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    elevation: 0,
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  label: {
    lineHeight: 20,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
  },
});
