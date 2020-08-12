import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { StackNavigationProp } from '@react-navigation/stack';

import { colors } from '@theme';

import { BackButton } from '../components/PatientHeader';

import { ScreenParamList } from './ScreenParamList';

interface Props {
  navigation: StackNavigationProp<ScreenParamList>;
}

export const EstimatedCasesScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, marginBottom: 0, backgroundColor: 'white' }}>
      <View
        style={{
          position: 'absolute',
          zIndex: 100,
          display: 'flex',
          top: 48,
          left: 20,
        }}>
        <BackButton navigation={navigation} />
      </View>
      <WebView originWhitelist={['*']} source={require('@assets/carto/estimated-cases.html')} style={styles.webview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
    backgroundColor: colors.white,
  },
  webview: {},
});
