import { chevronLeft } from '@assets';
import { BrandedButton } from '@covid/components';
import { InfoCard } from '@covid/components/InfoCard';
import { Header } from '@covid/components/Screen';
import { HeaderText, RegularBoldText, RegularText, SecondaryText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features';
import appCoordinator from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'ValidationStudyInfo'>;
  route: RouteProp<ScreenParamList, 'ValidationStudyInfo'>;
};

export default class ValidationStudyInfoScreen extends Component<Props, object> {
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: colors.backgroundSecondary, flex: 1 }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <TouchableOpacity onPress={this.props.navigation.goBack} style={styles.backIcon}>
            <Image source={chevronLeft} />
          </TouchableOpacity>

          <Header>
            <HeaderText style={styles.header}>{i18n.t('validation-study-info.title')}</HeaderText>
          </Header>

          <InfoCard
            backgroundVariant={1}
            body={i18n.t('validation-study-info.para-1')}
            header={i18n.t('validation-study-info.header-1')}
          />
          <InfoCard
            backgroundVariant={2}
            body={i18n.t('validation-study-info.para-2')}
            header={i18n.t('validation-study-info.header-2')}
          />
          <InfoCard
            backgroundVariant={3}
            body={i18n.t('validation-study-info.para-3')}
            header={i18n.t('validation-study-info.header-3')}
          />

          <RegularBoldText style={styles.interestedTitle}>
            {i18n.t('validation-study-info.interested')}
            {'\n'}
          </RegularBoldText>
          <SecondaryText style={styles.interestedTest}>{i18n.t('validation-study-info.visit-next')}</SecondaryText>

          <BrandedButton
            onPress={() => {
              appCoordinator.gotoNextScreen(this.props.route.name);
            }}
            style={styles.mainButton}
          >
            <RegularText style={styles.buttonText}>{i18n.t('validation-study-intro.yes')}</RegularText>
          </BrandedButton>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  backIcon: {
    alignSelf: 'flex-start',
    marginTop: 32,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 32,
  },
  header: {
    marginTop: 24,
    textAlign: 'center',
  },
  interestedTest: {
    textAlign: 'center',
  },
  interestedTitle: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  mainButton: {
    backgroundColor: colors.purple,
    marginBottom: 16,
    marginHorizontal: 16,
    marginTop: 32,
  },
  paragraph: {
    marginVertical: 8,
  },
});
