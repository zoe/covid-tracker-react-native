import { ShareAppCardViral } from '@covid/components/Cards/ShareAppViral';
import { ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features';
import { AppRating, shouldAskForRating } from '@covid/features/thank-you/components/AppRating';
import i18n from '@covid/locale/i18n';
import { openWebLink } from '@covid/utils/links';
import { AntDesign } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import I18n from 'i18n-js';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'ThankYouUS'>;
  route: RouteProp<ScreenParamList, 'ThankYouUS'>;
};

type State = {
  askForRating: boolean;
};

const initialState: State = {
  askForRating: false,
};

export default class ThankYouUSScreen extends Component<Props, State> {
  state = { ...initialState };

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
              <AntDesign name="checkcircle" size={32} style={styles.checkIcon} />
              <HeaderText style={{ marginTop: 24, textAlign: 'center' }}>
                {i18n.t('thank-you.report-tomorrow')}
              </HeaderText>
              <Text style={styles.thankYou}>{i18n.t('thank-you.numbers')}</Text>

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
                style={styles.done}
              >
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
  checkIcon: {
    alignSelf: 'center',
    color: colors.feedbackExcellent,
  },

  done: {
    alignSelf: 'center',
    color: colors.brand,
    fontSize: 24,
    margin: 40,
  },

  partner: {
    fontFamily: 'SofiaPro-Bold',
    lineHeight: 24,
  },

  partnerContainer: {
    lineHeight: 24,
    marginHorizontal: 16,
    marginTop: 40,
    textAlign: 'center',
  },

  rootContainer: {
    marginTop: 16,
    padding: 16,
  },

  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  thankYou: {
    color: colors.primary,
    fontFamily: 'SofiaPro-Light',
    fontSize: 16,
    lineHeight: 24,
    padding: 16,
    textAlign: 'center',
  },

  visitWebsite: {
    marginTop: 24,
    textAlign: 'center',
  },
});
