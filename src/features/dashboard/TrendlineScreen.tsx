import React, { useRef } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { colors, fontStyles } from '@theme';
import { PoweredByZoeSmall } from '@covid/components/Logos/PoweredByZoe';
import Screen, { Header } from '@covid/components/Screen';
import { Header3Text, HeaderText, RegularText, RegularBoldText, MutedText, BrandedButton } from '@covid/components/Text';
import { Button } from '@covid/components/Buttons/Button';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import NavigatorService from '@covid/NavigatorService';
import { WebView } from '@covid/components/WebView';
import { DeltaTag } from '@covid/components/Cards/EstimatedCase/DeltaTag';
import { Tabs } from '@covid/components/Nav/Tabs';
// import i18n from '@covid/locale/i18n';

const html = require('@assets/charts/trendline-explore.html');

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'Trendline'>;
  route: RouteProp<ScreenParamList, 'Trendline'>;
};

export const TrendlineScreen: React.FC<Props> = ({ route, navigation }) => {

  const goNext = () => { };

  const viewRef = useRef<View>(null);
  const webview = useRef<WebView>(null);

  const share = async () => {
    try {
      const uri = await captureRef(viewRef, { format: 'jpg' });
      // https://github.com/expo/expo/issues/6920#issuecomment-580966657
      Sharing.shareAsync('file://' + uri);
    } catch (_) { }
  };

  return (
    <View style={styles.container}>
      <Screen showBackButton navigation={navigation} style={styles.container} >
        <View style={styles.container} ref={viewRef}>

          <Header>
            <RegularText style={{ textAlign: 'center' }}>People with COVID in</RegularText>
            <RegularText style={{ textAlign: 'center', fontWeight: '500', fontSize: 20, marginTop: 8 }}>Harringary</RegularText>
          </Header>

          <Header3Text style={styles.metric}>797</Header3Text>

          <View style={styles.deltaTag}>
            <DeltaTag change={797} from="last week" />
          </View>

          <View style={styles.chartContainer}>
            <WebView
              ref={webview}
              originWhitelist={['*']}
              source={html}
              style={styles.webview}
              scrollEnabled={false}

              onEvent={(type, payload) => {
                console.log('web event', type, payload)

              }} />
          </View>

          {/* <MutedText style={{
            textAlign: 'center',
            fontSize: 12,
            marginTop: 8
          }}>September</MutedText> */}

          <Tabs
            labels={['WEEK', 'MONTH', 'ALL']}
            onSelected={(value, index) => {
              // console.log(webview.current?.call)
              webview.current?.call('updateTimeWindow', { payload: { type: value } })
            }}
            styles={{ justifyContent: 'center', marginVertical: 32 }} />

          <View style={{ maxWidth: '80%', alignSelf: 'center', marginTop: 12 }}>
            <BrandedButton style={styles.detailsButton} onPress={share}>
              <Text style={[fontStyles.bodyLight, styles.detailsButtonLabel]}>Share</Text>
            </BrandedButton>
          </View>


          <View style={styles.zoe}>
        <PoweredByZoeSmall />
      </View>

        </View>
      </Screen>

      {/* <View style={styles.buttonsContainer}>
        <Button onPress={goNext} branded>
          CTA - a
        </Button>
        <Button onPress={() => NavigatorService.navigate('Dashboard')}>CTA 2</Button>
      </View> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  header: {
    marginRight: 72,
  },

  description: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  metric: {
    fontSize: 32,
    lineHeight: 48,
    paddingTop: 8,
    textAlign: 'center',
    color: colors.textDark,
  },

  deltaTag: {
    marginTop: 16,
    marginVertical: 32,
    alignSelf: 'center'
  },

  chartContainer: {
    width: '100%',
    height: 360,
    // paddingHorizontal: 16,
    // backgroundColor: 'red'
  },

  webview: {
    height: '100%',
    width: '100%',
  },

  button: {
    marginVertical: 16,
    marginHorizontal: 24,
    marginBottom: 32,
  },

  buttonsContainer: {
    paddingHorizontal: 8,
    marginBottom: 48,
  },

  detailsButton: {
    paddingHorizontal: 52,
    marginBottom: 24,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.purple,
  },

  detailsButtonLabel: {
    color: colors.purple,
    fontWeight: '300',
    fontSize: 14,
  },

  zoe: {
    marginTop: 16,
  },

});
