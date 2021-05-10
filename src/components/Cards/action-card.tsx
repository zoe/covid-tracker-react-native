import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@covid/themes';

import { Text } from '../typography';

interface IProps {
  actionTitle: string;
  buttonColor?: string;
  children: ReactNode;
  onPress: () => void;
  outline?: boolean;
  textColor?: string;
}

function ActionCard({ actionTitle, buttonColor, children, onPress, outline, textColor }: IProps) {
  const { colors, grid } = useTheme();
  const bColor = buttonColor ? buttonColor : colors.blue.main.bgColor;
  const tColor = textColor ? textColor : 'white';
  return (
    <View style={[styles.wrapper, { padding: grid.gutter }]}>
      <TouchableOpacity
        accessible
        accessibilityRole="button"
        onPress={onPress}
        style={[styles.container, styles.shadow, { paddingHorizontal: grid.gutter, paddingVertical: grid.xxl }]}
      >
        <View style={{ marginBottom: grid.l }}>
          <View>{children}</View>
        </View>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: outline ? 'transparent' : bColor,
            borderWidth: 1,
            borderColor: bColor,
            borderRadius: grid.xxl,
            height: grid.xxxxl,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: outline ? bColor : tColor }}>{actionTitle}</Text>
        </View>
        <View />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
  },
  container: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  button: {
    height: 40,
  },
});

export default ActionCard;
