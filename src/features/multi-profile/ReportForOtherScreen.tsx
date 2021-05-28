import { profilesIcon } from '@assets';
import { BrandedButton } from '@covid/components';
import { Header } from '@covid/components/Screen';
import { ClickableText, HeaderText, RegularBoldText, RegularText, SecondaryText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { profileService } from '@covid/core/profile/ProfileService';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

type RenderProps = {
  navigation: StackNavigationProp<ScreenParamList, 'ReportForOther'>;
  route: RouteProp<ScreenParamList, 'ReportForOther'>;
};

export default class ReportForOtherScreen extends Component<RenderProps, object> {
  handleSkip = async () => {
    await profileService.recordAskedToReportForOther();
    assessmentCoordinator.gotoNextScreen(this.props.route.name);
  };

  render() {
    return (
      <View style={styles.view}>
        <SafeAreaView>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.rootContainer}>
              <Header>
                <HeaderText style={{ marginBottom: 12 }}>{i18n.t('report-for-others-title')}</HeaderText>
                <SecondaryText>{i18n.t('report-for-others-text')}</SecondaryText>
              </Header>

              <View style={styles.shareContainer}>
                <Image source={profilesIcon} style={styles.icon} />

                <View style={styles.innerContainer}>
                  <RegularBoldText style={styles.innerContainerBold}>
                    {i18n.t('report-for-others-add-profiles')}
                  </RegularBoldText>
                  <RegularText style={styles.innerContainer}>{i18n.t('report-for-others-subtext')}</RegularText>
                </View>

                <BrandedButton
                  onPress={() => {
                    assessmentCoordinator.resetToCreateProfile();
                  }}
                >
                  <Text>{i18n.t('report-for-others-add-profiles')}</Text>
                </BrandedButton>
              </View>

              <RegularText style={styles.shareSubtitle}>{i18n.t('report-for-others-not-right-now')}</RegularText>

              <ClickableText onPress={() => this.handleSkip()} style={styles.done}>
                {i18n.t('report-for-others-skip')}
              </ClickableText>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  done: {
    alignSelf: 'center',
    color: colors.primary,
    fontSize: 20,
    margin: 40,
  },

  icon: {
    alignSelf: 'center',
    height: 100,
    resizeMode: 'contain',
    width: 150,
  },

  innerContainer: {
    alignSelf: 'center',
    textAlign: 'center',
  },

  innerContainerBold: {
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },

  rootContainer: {
    padding: 10,
  },

  scrollView: {
    backgroundColor: colors.backgroundSecondary,
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  shareContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    margin: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  shareSubtitle: {
    color: colors.secondary,
    paddingHorizontal: 40,
    paddingVertical: 10,
    textAlign: 'center',
  },

  view: {
    backgroundColor: colors.backgroundSecondary,
  },
});
