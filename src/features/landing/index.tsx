import React from 'react';
import { Dimensions, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { useScrollHandler } from 'react-native-redash';

import { Text, Pagination } from '@covid/components';
import NavigationService from '@covid/NavigatorService';

const { width } = Dimensions.get('window');

function Landing() {
  const { scrollHandler, x } = useScrollHandler();

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <Animated.ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          {...scrollHandler}>
          <View style={styles.slide}>
            <Text textClass="h3Bold" style={{ color: 'pink' }}>
              Benefit Screen 1
            </Text>
          </View>
          <View style={styles.slide}>
            <Text textClass="h3Bold" style={{ color: 'pink' }}>
              Benefit Screen 2
            </Text>
          </View>
          <View style={styles.slide}>
            <Text textClass="h3Bold" style={{ color: 'pink' }}>
              Benefit Screen 3
            </Text>
          </View>
        </Animated.ScrollView>
        <View style={styles.pagination}>
          <Pagination dotColor="#fff" pages={3} x={x} width={width} />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => null} style={[styles.button, { backgroundColor: '#A10056' }]}>
          <Text style={{ color: 'white' }}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigationService.navigate('Login')} style={styles.button}>
          <Text style={{ color: 'white' }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#082A5D',
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  pagination: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 32,
    position: 'absolute',
    width: '100%',
  },
  slide: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width,
  },
  footer: {
    padding: 16,
  },
  button: {
    alignItems: 'center',
    borderRadius: 24,
    justifyContent: 'center',
    padding: 16,
  },
});

export default Landing;
