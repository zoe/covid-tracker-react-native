import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Linking, StyleSheet } from 'react-native';
import { View } from 'native-base';

import { colors } from '@theme';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import Screen, { Header } from '@covid/components/Screen';
import SchoolConnectImage from '@assets/school-network-modules/connect.svg';
import { ClickableText, Header3Text, HeaderText, RegularBoldText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { Button } from '@covid/components/Buttons/Button';
import NavigatorService from '@covid/NavigatorService';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'SchoolNetworkInfo'>;
  route: RouteProp<ScreenParamList, 'SchoolNetworkInfo'>;
};

export const SchoolNetworkInfoScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Screen showBackButton navigation={navigation} style={styles.container}>
        <View style={styles.container}>
          <Header>
            <HeaderText style={styles.header}>{i18n.t('school-networks.info.title')}</HeaderText>
          </Header>

          <View style={styles.description}>
            <RegularText>{i18n.t('school-networks.info.text')}</RegularText>
          </View>

          <View style={styles.ctaContainer}>
            <Header3Text>{i18n.t('school-networks.info.cta-title')}</Header3Text>
            <RegularText style={{ marginTop: 16, marginBottom: 8 }}>
              {i18n.t('school-networks.info.cta-text')}
            </RegularText>
            <HeaderText>
              <ClickableText
                onPress={() => Linking.openURL('https://covid.joinzoe.com/schoolnetworks?utm_source=App')}
                style={{ fontSize: 18 }}>
                {i18n.t('school-networks.info.cta-link')}
              </ClickableText>
            </HeaderText>
          </View>

          <View style={styles.learnMoreContainer}>
            <RegularText style={{ paddingBottom: 8 }}>{i18n.t('school-networks.info.learn-more-title')}</RegularText>

            <ClickableText
              onPress={() => Linking.openURL('https://covid.joinzoe.com/post/covid-school-communities?utm_source=App')}>
              {i18n.t('school-networks.info.learn-more-text')}
            </ClickableText>
          </View>
        </View>
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  header: {
    marginRight: 36,
  },

  description: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  ctaContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.tertiary,
    padding: 16,
    marginVertical: 36,
    marginHorizontal: 8,
  },

  learnMoreContainer: {
    paddingHorizontal: 16,
  },
});
