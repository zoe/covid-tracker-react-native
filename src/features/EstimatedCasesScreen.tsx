import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { StackNavigationProp } from '@react-navigation/stack';

import { BackButton } from '@covid/components/PatientHeader';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { loadEstimatedCasesCartoMap } from '@covid/utils/files';
import { colors } from '@theme';

interface Props {
  navigation: StackNavigationProp<ScreenParamList>;
}

export const EstimatedCasesScreen: React.FC<Props> = ({ navigation }) => {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const runAsync = async () => {
      try {
        setHtml(await loadEstimatedCasesCartoMap());
      } catch (_) {}
    };
    if (isMounted) {
      runAsync();
    }
    return function () {
      isMounted = false;
    };
  }, []);

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
      <WebView originWhitelist={['*']} source={{ html }} style={styles.webview} />
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
