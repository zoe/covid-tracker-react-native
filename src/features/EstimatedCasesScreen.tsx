import { BackButton } from '@covid/components/PatientHeader';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { loadEstimatedCasesCartoMap } from '@covid/utils/files';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList>;
}

export function EstimatedCasesScreen({ navigation }: IProps) {
  const [html, setHtml] = React.useState<string>('');

  React.useEffect(() => {
    let isMounted = true;
    const runAsync = async () => {
      try {
        setHtml(await loadEstimatedCasesCartoMap());
      } catch (_) {}
    };
    if (isMounted) {
      runAsync();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={{ backgroundColor: 'white', flex: 1, marginBottom: 0 }}>
      <View
        style={{
          display: 'flex',
          left: 20,
          position: 'absolute',
          top: 48,
          zIndex: 100,
        }}
      >
        <BackButton navigation={navigation} />
      </View>
      <WebView originWhitelist={['*']} source={{ html }} style={styles.webview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    marginBottom: 0,
  },
  webview: {},
});
