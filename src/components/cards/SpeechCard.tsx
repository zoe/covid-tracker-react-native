import { QuoteMarks } from '@assets';
import { useTheme } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  children: React.ReactNode;
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
  arrow: {
    backgroundColor: 'white',
    height: 16,
    left: 48,
    position: 'absolute',
    top: 8,
    transform: [{ rotate: '45deg' }],
    width: 16,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
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

export default SpeechCard;
