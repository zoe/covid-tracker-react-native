import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'native-base';

import { RegularText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';

type TStyleObject = { [key: string]: string | number };

interface IProps {
  buttonProps?: any;
  children: ReactNode;
  icon: ReactNode;
  onPress: () => void;
  style?: TStyleObject;
  textProps?: any;
}

function ActionButton({ buttonProps, children, icon, onPress, style = {}, textProps }: IProps) {
  const backgroundColor = colors.backgroundTertiary;
  const btnStyle = [styles.button, style, { backgroundColor }];
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
    textAlign: 'center',
    paddingHorizontal: 16,
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
