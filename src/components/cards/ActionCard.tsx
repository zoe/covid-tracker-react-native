import { Text } from '@covid/components/typography';
import { useTheme } from '@covid/themes';
import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

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
  const bColor = buttonColor || colors.blue.main.bgColor;
  const tColor = textColor || 'white';
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
            borderColor: bColor,
            borderRadius: grid.xxl,
            borderWidth: 1,
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
  button: {
    height: 40,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    height: '100%',
    width: '100%',
  },
  shadow: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  wrapper: {
    flex: 1,
    width: '100%',
  },
});

export default ActionCard;
