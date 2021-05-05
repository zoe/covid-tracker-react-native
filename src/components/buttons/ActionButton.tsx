import React, { ReactNode } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { Button } from 'native-base';

import { RegularText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';

interface IProps {
  buttonProps?: any;
  children: ReactNode;
  error?: boolean;
  icon: ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textProps?: any;
}

function ActionButton({ buttonProps, children, error = false, icon, onPress, style = {}, textProps }: IProps) {
  const backgroundColor = colors.backgroundTertiary;
  const btnStyle = [
    styles.button,
    { backgroundColor, borderColor: error ? colors.feedbackBad : 'transparent', borderWidth: 1 },
    style,
  ];
  return (
    <Button style={btnStyle} onPress={onPress} {...buttonProps}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <RegularText style={[fontStyles.bodyLight, styles.label, { color: colors.primary }]} {...textProps}>
            {children}
          </RegularText>
        </View>
        <View>{icon}</View>
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 48,
    elevation: 0,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  label: {
    textAlign: 'left',
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
  },
});

export default ActionButton;
