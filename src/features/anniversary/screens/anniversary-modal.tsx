import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SafeLayout, Text } from '@covid/components';
import { timelineModalCard } from '@assets';

import appCoordinator from '../../AppCoordinator';

function AnniversaryModal() {
  const { goBack } = useNavigation();
  return (
    <SafeLayout>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.feature}>
              <Text textClass="pXSmall" style={{ color: 'white' }}>
                NEW FEATURE
              </Text>
            </View>
          </View>
          <Text textClass="h3" textAlign="center" rhythm={24}>
            Your personal contribution to science!
          </Text>
          <Text textClass="pLight" textAlign="center">
            Thank you for reporting with us since
          </Text>
          <Text textAlign="center">[Dynamic date here]</Text>
          <View style={{ marginBottom: 12 }}>
            <Image
              source={timelineModalCard}
              style={{
                aspectRatio: 1.55,
                resizeMode: 'contain',
                height: undefined,
                width: '100%',
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#0165B5' }]}
              onPress={() => appCoordinator.goToAnniversary()}>
              <Text textClass="pSmallLight" style={{ color: 'white' }}>
                Discover your timeline
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: 'white' }]} onPress={() => goBack()}>
              <Text textClass="pSmallLight">Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 24,
    marginTop: 24,
    padding: 24,
  },
  feature: {
    backgroundColor: '#FA7268',
    borderRadius: 4,
    marginBottom: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  button: {
    alignItems: 'center',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    marginBottom: 8,
    width: '100%',
  },
});

export default AnniversaryModal;
