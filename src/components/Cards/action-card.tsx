import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@covid/themes';

import { Text } from '../typography';

interface IProps {
  actionTitle: string;
  children: ReactNode;
  onPress: () => void;
}

function ActionCard({ actionTitle, children, onPress }: IProps) {
  const { colors, grid } = useTheme();
  return (
    <View style={[styles.wrapper, { padding: grid.gutter }]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, styles.shadow, { paddingHorizontal: grid.gutter, paddingVertical: grid.xxl }]}>
        <View style={{ marginBottom: grid.l }}>
          <View>{children}</View>
        </View>
        <View
          style={{
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.burgundy.dark.bgColor,
            borderRadius: grid.xxl,
            height: grid.xxxxl,
            justifyContent: 'center',
          }}>
          <Text colorPalette="burgundy" colorShade="main" inverted>
            {actionTitle}
          </Text>
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
