import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { QuoteMarks } from '@assets';
import { useTheme } from '@covid/themes';

interface IProps {
  children: ReactNode;
}

function SpeechCard({ children }: IProps) {
  const { grid } = useTheme();
  return (
    <View style={[styles.wrapper, { padding: grid.gutter }]}>
      <View style={[styles.arrow, styles.shadow]} />
      <View style={[styles.container, styles.shadow, { paddingHorizontal: grid.gutter, paddingVertical: grid.xxl }]}>
        <View style={{ marginBottom: grid.l }}>
          <View style={{ marginBottom: grid.l }}>
            <QuoteMarks />
          </View>
          <View>{children}</View>
        </View>
        <View />
      </View>
      <View style={styles.arrow} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
  },
  arrow: {
    position: 'absolute',
    backgroundColor: 'white',
    height: 16,
    top: 8,
    left: 48,
    transform: [{ rotate: '45deg' }],
    width: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
});

export default SpeechCard;
