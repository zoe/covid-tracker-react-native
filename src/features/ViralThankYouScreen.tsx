import { social } from '@assets';
import { CovidRating, shouldAskForRating } from '@covid/components/CovidRating';
import { isAndroid } from '@covid/components/Screen';
import BrandedSpinner from '@covid/components/Spinner';
import { BrandedButton, ClickableText, RegularBoldText, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import UserService from '@covid/core/user/UserService';
import { AreaStatsResponse } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Linking } from 'expo';
import I18n from 'i18n-js';
import moment from 'moment';
import React, { Component } from 'react';
import { Image, ScrollView, Share, StyleSheet, View, Text, Modal, TouchableOpacity, SafeAreaView } from 'react-native';

import { ScreenParamList } from './ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'ViralThankYou'>;
  route: RouteProp<ScreenParamList, 'ViralThankYou'>;
};

type State = {
  modalVisible: boolean;
  areaStats: AreaStatsResponse | null;
  loading: boolean;
  missingData: boolean;
  askForRating: boolean;
};

export default class ViralThankYouScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      areaStats: null,
      loading: true,
      missingData: false,
      askForRating: false,
    };
  }

  async componentDidMount() {
    const userService = new UserService();
    const profile = await userService.getProfile();

    if (await shouldAskForRating()) {
      this.setState({ askForRating: true });
    }

    userService
      .getAreaStats(profile.patients[0]) // todo: multipatient
      .then((response) =>
        this.setState({
          areaStats: {
            ...response.data,
            area_name: response.data.area_name + ' County',
          },
          loading: false,
        })
      )
      .catch(() => {
        this.setState({
          missingData: true,
          loading: false,
        });
      });
  }

  shareUrl = i18n.t('share-this-app.url');

  getShareMessage = () => {
    const area = this.state.areaStats;
    if (!area) return i18n.t('share-this-app.message');

    if (area.locked)
      // Be careful with extra tabs or space, they would appear in the message.
      return i18n.t('thank-you.share-area-locked', {
        missing: area.number_of_missing_contributors,
        area: area.area_name,
      });
    else return i18n.t('thank-you.share-area-unlocked', { cases: area.predicted_cases, area: area.area_name });
  };

  shareApp = async () => {
    const message = this.getShareMessage() + (isAndroid ? ' ' + this.shareUrl : ''); // On Android add link to end of message

    try {
      await Share.share({
        message,
        url: this.shareUrl, // IOS has separate field for URL
      });
      Analytics.track(events.SHARE_THIS_APP);
    } catch (error) {}
  };

  formatNumber = (x: number | undefined) => I18n.toNumber(x ?? 0, { precision: 0 });

  render() {
    const area = this.state.areaStats;
    const date = moment();
    const { loading, missingData } = this.state;
    const displayStats = !loading && !missingData;
    const casePercentage = area?.population ? ((area.predicted_cases / area?.population) * 100).toFixed(1) : 0;

    // todo: different text if no change?
    const sign = area?.rank_delta ?? 0 > 0 ? '+' : '-'; // can't find a one liner to format numbers in TS. Am I stupid?

    const modal = (
      <Modal animationType="slide" visible={this.state.modalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseIconContainer}
            onPress={() => this.setState({ modalVisible: false })}>
            <MaterialIcons name="close" size={32} style={styles.modalCloseIcon} />
          </TouchableOpacity>
          <ScrollView style={styles.modalText}>
            <RegularText style={styles.modalTitle}>{i18n.t('thank-you.our-methodology-title')}</RegularText>
            <RegularText style={styles.modalContent}>
              {i18n.t('thank-you.methodology-body-1')}
              <ClickableText
                onPress={() =>
                  Linking.openURL(
                    'https://covid.joinzoe.com/us-post/loss-of-smell-or-taste-is-a-key-symptom-of-covid-19'
                  )
                }>
                {i18n.t('thank-you.read-more-here')}
              </ClickableText>
              {i18n.t('thank-you.methodology-body-2')}
            </RegularText>

            <View style={styles.divider} />
            <RegularText style={styles.smallPrint}>{i18n.t('thank-you.estimate-exclusions')}</RegularText>
            <View style={styles.divider} />

            <RegularText style={styles.readBlog}>
              {i18n.t('thank-you.read-more-on')}{' '}
              <ClickableText onPress={() => Linking.openURL(i18n.t('blog-link'))}>
                {i18n.t('thank-you.blog')}
              </ClickableText>
            </RegularText>
          </ScrollView>
        </View>
      </Modal>
    );

    const peopleWithSymptoms = (
      <Text style={styles.estimatedCases}>
        {i18n.t('thank-you.people-with-covid-in')}
        <RegularBoldText>{area?.area_name}</RegularBoldText> + {i18n.t('thank-you.today')}
      </Text>
    );

    return (
      <>
        {this.state.askForRating && <CovidRating />}
        <SafeAreaView>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.rootContainer}>
              {modal}

              <AntDesign name="checkcircle" style={styles.checkIcon} size={32} />
              <Text style={styles.thankYou}>{i18n.t('thank-you.report-tomorrow')}</Text>

              {loading && (
                <View>
                  <BrandedSpinner />
                  <Text style={styles.loading}>{i18n.t('thank-you.loading-data')}</Text>
                </View>
              )}

              {displayStats && !area?.locked && (
                <View style={styles.estimatedCaseContainer}>
                  <View style={styles.estimatedCaseFirstRow}>
                    {peopleWithSymptoms}
                    <Text style={styles.estimatedCasesCount}>{this.formatNumber(area?.predicted_cases)}</Text>
                  </View>
                  <View style={styles.estimatedCaseSecondRow}>
                    <View style={styles.estimatedCasesPercentage}>
                      <Text style={styles.estimatedCasesPercentageText}>{casePercentage}%</Text>
                    </View>
                    <Text style={styles.estimatedCasesPopulation}>
                      {i18n.t('thank-you.of-residents', { number: this.formatNumber(area?.population) })}
                    </Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.estimatedCaseSecondRow}>
                    <Text style={styles.estimate}>
                      {i18n.t('thank-you.estimate-for')} {date.format('MMMM D, YYYY')}{' '}
                      <ClickableText style={styles.learnMore} onPress={() => this.setState({ modalVisible: true })}>
                        {i18n.t('thank-you.learn-more')}
                      </ClickableText>
                    </Text>
                  </View>
                </View>
              )}

              {displayStats && area?.locked && (
                <View style={styles.estimatedCaseContainer}>
                  <View style={styles.estimatedCaseFirstRow}>{peopleWithSymptoms}</View>
                  <View style={styles.blurred}>
                    <MaterialIcons name="lock-outline" size={32} style={styles.lockIcon} />
                  </View>
                  <View>
                    <Text style={styles.almostThere}>
                      {i18n.t('thank-you.almost-there')}{' '}
                      <Text style={styles.almostThereCount}>
                        {i18n.t('thank-you.more-people', { number: area?.number_of_missing_contributors })}
                      </Text>{' '}
                      {i18n.t('thank-you.from-your-country')}
                    </Text>

                    <ClickableText onPress={this.shareApp} style={styles.pleaseShare}>
                      {i18n.t('thank-you.please-share')}
                    </ClickableText>
                  </View>
                </View>
              )}

              {displayStats && (
                <View>
                  <RegularText style={styles.countyRank}>
                    <RegularBoldText>{area?.area_name}</RegularBoldText>
                    {i18n.t('thank-you.contribution-rank')}
                  </RegularText>
                  <Text style={styles.dailyDelta}>
                    {sign}
                    {area?.rank_delta} {i18n.t('thank-you.places-since-yesterday')}
                  </Text>

                  <Text style={styles.position}>
                    <Text style={styles.positionBold}>{this.formatNumber(area?.rank)}</Text>{' '}
                    {i18n.t('thank-you.out-of')}{' '}
                    <Text style={styles.positionBold}>{this.formatNumber(area?.number_of_areas)}</Text>{' '}
                    {i18n.t('thank-you.counties')}
                  </Text>
                </View>
              )}

              <View style={styles.shareContainer}>
                <View style={styles.socialIconContainer}>
                  <Image source={social} style={styles.socialIcon} />
                </View>
                <Text style={styles.share}>{i18n.t('thank-you.sharing-is-caring')}</Text>
                <RegularText style={styles.shareSubtitle}>{i18n.t('thank-you.the-more-reports')}</RegularText>
                <BrandedButton onPress={this.shareApp} style={styles.shareButton}>
                  {i18n.t('thank-you.share-this-app')}
                </BrandedButton>
              </View>

              <RegularText style={styles.partnerContainer}>
                {i18n.t('thank-you.thank-you-for-joining')}{' '}
                <Text style={styles.partner}>Massachusetts General Hospital</Text>,{' '}
                <Text style={styles.partner}>Stanford University School of Medicine</Text> &{' '}
                <Text style={styles.partner}>King's College London</Text> {i18n.t('thank-you.to-help-communities')}
              </RegularText>

              <RegularText style={styles.visitWebsite}>
                {i18n.t('thank-you.visit-our')}{' '}
                <ClickableText onPress={() => Linking.openURL(i18n.t('blog-link'))}>
                  {i18n.t('thank-you.website')}
                </ClickableText>{' '}
                {i18n.t('thank-you.to-see-discoveries')}
              </RegularText>

              <ClickableText onPress={this.props.navigation.popToTop} style={styles.done}>
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
    backgroundColor: colors.backgroundFive,
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
    fontWeight: '300',
    color: colors.primary,
    textAlign: 'center',
  },

  loading: {
    padding: 16,
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '300',
    color: colors.primary,
    textAlign: 'center',
  },

  estimatedCaseContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
  },

  estimatedCaseFirstRow: {},

  estimatedCaseSecondRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 8,
  },

  estimatedCases: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.primary,
    textAlign: 'center',
  },

  estimatedCasesCount: {
    marginTop: 10,
    fontSize: 40,
    lineHeight: 48,
    color: colors.primary,
    fontWeight: '500',
    textAlign: 'center',
  },

  estimatedCasesPercentage: {
    backgroundColor: colors.pink,
    width: 48,
    height: 28,
    borderRadius: 5,
    justifyContent: 'center',
  },

  estimatedCasesPercentageText: {
    fontSize: 14,
    lineHeight: 20,
    color: 'white',
    alignSelf: 'center',
  },

  estimatedCasesPopulation: {
    marginTop: 4,
    marginLeft: 4,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '300',
    color: colors.primary,
  },

  estimate: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.secondary,
  },

  learnMore: {
    fontSize: 12,
    lineHeight: 16,
  },

  divider: {
    height: 1,
    backgroundColor: colors.backgroundFour,
    marginVertical: 20,
  },

  countyRank: {
    marginTop: 40,
    color: colors.secondary,
    textAlign: 'center',
  },

  dailyDelta: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '300',
    color: colors.secondary,
    textAlign: 'center',
  },

  position: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '300',
    color: colors.secondary,
    textAlign: 'center',
  },

  positionBold: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '500',
    color: colors.primary,
  },

  blurred: {
    flex: 1,
    height: 120,
    color: 'lightgray',
    justifyContent: 'center',
  },

  almostThere: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '300',
    textAlign: 'center',
    color: colors.primary,
  },

  almostThereCount: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: colors.primary,
  },

  pleaseShare: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },

  lockIcon: {
    color: colors.backgroundFive,
    borderWidth: 1,
    borderRadius: 22,
    padding: 5,
    borderColor: colors.backgroundFive,
    alignSelf: 'center',
    textAlign: 'center',
  },

  shareContainer: {
    marginTop: 40,
    backgroundColor: colors.white,
    borderRadius: 10,
  },

  share: {
    marginTop: 16,
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '500',
    textAlign: 'center',
  },

  socialIconContainer: {
    height: 60,
    marginTop: 32,
    alignSelf: 'center',
  },

  socialIcon: {
    height: 60,
    resizeMode: 'contain',
  },

  shareSubtitle: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    textAlign: 'center',
    color: colors.secondary,
  },

  shareButton: {
    marginVertical: 20,
    width: 240,
    alignSelf: 'center',
  },

  partnerContainer: {
    marginTop: 40,
    textAlign: 'center',
    marginHorizontal: 16,
    lineHeight: 24,
  },

  partner: {
    fontWeight: '700',
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

  modalContainer: {
    flex: 1,
    padding: 16,
    marginTop: 32,
  },

  modalText: {
    marginTop: 48,
  },

  modalTitle: {
    fontSize: 24,
    lineHeight: 38,
    fontWeight: '300',
  },

  modalContent: {
    marginTop: 32,
    color: colors.secondary,
  },

  smallPrint: {
    color: colors.tertiary,
  },

  readBlog: {
    textAlign: 'center',
  },

  modalCloseIconContainer: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    padding: 16,
  },

  modalCloseIcon: {
    color: colors.primary,
  },
});
