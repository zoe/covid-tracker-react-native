import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { chevronLeft } from '@assets';
import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { BrandedButton, HeaderText, RegularBoldText, RegularText, SecondaryText } from '@covid/components/Text';
import { Header } from '@covid/components/Screen';
import { InfoCard } from '@covid/components/InfoCard';
import appCoordinator from '@covid/features/AppCoordinator';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'ValidationStudyInfo'>;
  route: RouteProp<ScreenParamList, 'ValidationStudyInfo'>;
};

export default class ValidationStudyInfoScreen extends Component<Props, object> {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundSecondary }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <TouchableOpacity style={styles.backIcon} onPress={this.props.navigation.goBack}>
            <Image source={chevronLeft} />
          </TouchableOpacity>

          <Header>
            <HeaderText style={styles.header}>{i18n.t('validation-study-info.title')}</HeaderText>
          </Header>

          <InfoCard
            backgroundVariant={1}
            header={i18n.t('validation-study-info.header-1')}
            body={i18n.t('validation-study-info.para-1')}
          />
          <InfoCard
            backgroundVariant={2}
            header={i18n.t('validation-study-info.header-2')}
            body={i18n.t('validation-study-info.para-2')}
          />
          <InfoCard
            backgroundVariant={3}
            header={i18n.t('validation-study-info.header-3')}
            body={i18n.t('validation-study-info.para-3')}
          />

          <RegularBoldText style={styles.interestedTitle}>
            {i18n.t('validation-study-info.interested')}
            {'\n'}
          </RegularBoldText>
          <SecondaryText style={styles.interestedTest}>{i18n.t('validation-study-info.visit-next')}</SecondaryText>

          <View style={styles.buttonContainer}>
            <BrandedButton
              style={styles.mainButton}
              onPress={() => {
                appCoordinator.gotoNextScreen(this.props.route.name);
              }}>
              <RegularText style={styles.buttonText}>{i18n.t('validation-study-intro.yes')}</RegularText>
            </BrandedButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 32,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  backIcon: {
    alignSelf: 'flex-start',
    marginTop: 32,
  },
  header: {
    marginTop: 24,
    textAlign: 'center',
  },
  paragraph: {
    marginVertical: 8,
  },
  mainButton: {
    marginTop: 32,
    marginBottom: 16,
    marginHorizontal: 16,
    backgroundColor: colors.purple,
  },
  buttonText: {
    color: colors.white,
  },
  interestedTitle: {
    marginTop: 20,
    fontSize: 20,
  },
  interestedTest: {
    textAlign: 'center',
  },
});
