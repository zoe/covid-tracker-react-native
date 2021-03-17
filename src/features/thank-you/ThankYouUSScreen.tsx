import { AntDesign } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import I18n from 'i18n-js';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { ClickableText, RegularText } from '@covid/components/Text';
import { AppRating, shouldAskForRating } from '@covid/components/AppRating';
import { openWebLink } from '@covid/utils/links';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features';
import { ShareAppCardViral } from '@covid/components/Cards/ShareAppViral';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'ThankYouUS'>;
  route: RouteProp<ScreenParamList, 'ThankYouUS'>;
};

type State = {
  askForRating: boolean;
};

const initalState: State = {
  askForRating: false,
};

export default class ThankYouUSScreen extends Component<Props, State> {
  state = { ...initalState };

  async componentDidMount() {
    if (await shouldAskForRating()) {
      this.setState({ askForRating: true });
    }
  }

  formatNumber = (x: number | undefined) => I18n.toNumber(x ?? 0, { precision: 0 });

  render() {
    return (
      <>
        {this.state.askForRating && <AppRating />}
        <SafeAreaView>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.rootContainer}>
              <AntDesign name="checkcircle" style={styles.checkIcon} size={32} />
              <Text style={styles.thankYou}>{i18n.t('thank-you.report-tomorrow')}</Text>

              <ShareAppCardViral />

              <RegularText style={styles.partnerContainer}>
                {i18n.t('thank-you.thank-you-for-joining')}{' '}
                <Text style={styles.partner}>Massachusetts General Hospital</Text>,{' '}
                <Text style={styles.partner}>Stanford University School of Medicine</Text> &{' '}
                <Text style={styles.partner}>King's College London</Text> {i18n.t('thank-you.to-help-communities')}
              </RegularText>

              <RegularText style={styles.visitWebsite}>
                {i18n.t('thank-you.visit-our')}{' '}
                <ClickableText onPress={() => openWebLink(i18n.t('blog-link'))}>
                  {i18n.t('thank-you.website')}
                </ClickableText>{' '}
                {i18n.t('thank-you.to-see-discoveries')}
              </RegularText>

              <ClickableText
                onPress={() => {
                  assessmentCoordinator.gotoNextScreen(this.props.route.name);
                }}
                style={styles.done}>
                {i18n.t('thank-you.done')}
              </ClickableText>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  rootContainer: {
    padding: 16,
    marginTop: 16,
  },

  checkIcon: {
    color: colors.feedbackExcellent,
    alignSelf: 'center',
  },

  thankYou: {
    marginTop: 16,
    padding: 16,
    fontSize: 20,
    lineHeight: 32,
    fontFamily: 'SofiaPro-Light',
    color: colors.primary,
    textAlign: 'center',
  },

  partnerContainer: {
    marginTop: 40,
    textAlign: 'center',
    marginHorizontal: 16,
    lineHeight: 24,
  },

  partner: {
    fontFamily: 'SofiaPro-Bold',
    lineHeight: 24,
  },

  visitWebsite: {
    marginTop: 24,
    textAlign: 'center',
  },

  done: {
    alignSelf: 'center',
    margin: 40,
    fontSize: 24,
    color: colors.brand,
  },
});
