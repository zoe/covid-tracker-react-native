import { Text } from '@covid/components';
import { ESharable } from '@covid/components/screens/share/types';
import { sizes } from '@covid/themes';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function TimelineFooter() {
  const { navigate } = useNavigation();
  const label = 'Join the ZOE COVID Symptom Study App today to help science';
  return (
    <View>
      <Text rhythm={32} style={styles.paddingHorizontal} textAlign="center" textClass="p">
        Check in soon to see how your personal timeline evolves!
      </Text>
      <TouchableOpacity
        accessible
        accessibilityRole="button"
        onPress={() => {
          navigate('Share', { label, sharable: ESharable.TIMELINE });
        }}
        style={styles.button}
      >
        <Text style={{ color: 'white' }} textAlign="center" textClass="pLight">
          Share your contribution
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#0165B5',
    borderRadius: sizes.l,
    height: 56,
    justifyContent: 'center',
  },
  paddingHorizontal: {
    paddingHorizontal: sizes.xl,
  },
});
