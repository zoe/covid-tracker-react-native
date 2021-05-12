import { RegularText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import { Button } from 'native-base';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

type TStyleObject = { [key: string]: string | number };

interface IProps {
  buttonProps?: any;
  children: ReactNode;
  error?: boolean;
  icon: ReactNode;
  onPress: () => void;
  style?: TStyleObject;
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
    <Button onPress={onPress} style={btnStyle} {...buttonProps}>
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

export default ActionButton;
