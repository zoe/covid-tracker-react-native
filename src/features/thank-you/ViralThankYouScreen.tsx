import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Linking } from 'expo';
import I18n from 'i18n-js';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Modal, TouchableOpacity, SafeAreaView } from 'react-native';

import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { AreaStatsResponse } from '@covid/core/user/dto/UserAPIContracts';
import { ICoreService } from '@covid/core/user/UserService';
import { ClickableText, RegularText } from '@covid/components/Text';
import BrandedSpinner from '@covid/components/Spinner';
import { AppRating, shouldAskForRating } from '@covid/components/AppRating';
import { contentService } from '@covid/Services';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { SymtomsCountStats } from '@covid/components/Stats/SymtomsCountStats';
import { ContributionRank } from '@covid/components/Stats/ContributionRank';
import { ShareAppCardViral } from '@covid/components/Cards/ShareAppViral';
import { MoreContribution } from '@covid/components/Stats/MoreContribution';

import { ScreenParamList } from '../ScreenParamList';

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

const initalState: State = {
  modalVisible: false,
  areaStats: null,
  loading: true,
  missingData: false,
  askForRating: false,
};

const Header: React.FC = () => {
  return (
    <>
      <AntDesign name="checkcircle" style={styles.checkIcon} size={32} />
      <Text style={styles.thankYou}>{i18n.t('thank-you.report-tomorrow')}</Text>
    </>
  );
};

const Loader: React.FC = () => {
  return (
    <View>
      <BrandedSpinner />
      <Text style={styles.loading}>{i18n.t('thank-you.loading-data')}</Text>
    </View>
  );
};

const Partners: React.FC = () => {
  return (
    <RegularText style={styles.partnerContainer}>
      {i18n.t('thank-you.thank-you-for-joining')} <Text style={styles.partner}>Massachusetts General Hospital</Text>,{' '}
      <Text style={styles.partner}>Stanford University School of Medicine</Text> &{' '}
      <Text style={styles.partner}>King's College London</Text> {i18n.t('thank-you.to-help-communities')}
    </RegularText>
  );
};

const Footer: React.FC<{ doneOnPress: VoidFunction }> = ({ doneOnPress }) => {
  return (
    <>
      <RegularText style={styles.visitWebsite}>
        {i18n.t('thank-you.visit-our')}{' '}
        <ClickableText onPress={() => Linking.openURL(i18n.t('blog-link'))}>
          {i18n.t('thank-you.website')}
        </ClickableText>{' '}
        {i18n.t('thank-you.to-see-discoveries')}
      </RegularText>

      <ClickableText onPress={doneOnPress} style={styles.done}>
        {i18n.t('thank-you.done')}
      </ClickableText>
    </>
  );
};

const ThankYouModal: React.FC<{
  visible: boolean;
  onClose: VoidFunction;
}> = ({ visible, onClose }) => (
  <Modal animationType="slide" visible={visible}>
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.modalCloseIconContainer} onPress={onClose}>
        <MaterialIcons name="close" size={32} style={styles.modalCloseIcon} />
      </TouchableOpacity>
      <ScrollView style={styles.modalText}>
        <RegularText style={styles.modalTitle}>{i18n.t('thank-you.our-methodology-title')}</RegularText>
        <RegularText style={styles.modalContent}>
          {i18n.t('thank-you.methodology-body-1')}
          <ClickableText
            onPress={() =>
              Linking.openURL('https://covid.joinzoe.com/us-post/loss-of-smell-or-taste-is-a-key-symptom-of-covid-19')
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
          <ClickableText onPress={() => Linking.openURL(i18n.t('blog-link'))}>{i18n.t('thank-you.blog')}</ClickableText>
        </RegularText>
      </ScrollView>
    </View>
  </Modal>
);

export default class ViralThankYouScreen extends Component<Props, State> {
  @lazyInject(Services.User)
  private userService: ICoreService;

  state = { ...initalState };

  async componentDidMount() {
    if (await shouldAskForRating()) {
      this.setState({ askForRating: true });
    }
    this.getAreaStats();
  }

  async getAreaStats() {
    try {
      const profile = await this.userService.getProfile();
      const response = await contentService.getAreaStats(profile.patients[0]);
      this.setState({
        areaStats: {
          ...response,
          area_name: response.area_name + ' County',
        },
        loading: false,
      });
    } catch (error) {
      this.setState({
        missingData: true,
        loading: false,
      });
    }
  }

  formatNumber = (x: number | undefined) => I18n.toNumber(x ?? 0, { precision: 0 });

  render() {
    const area = this.state.areaStats;
    const { loading, missingData } = this.state;
    const displayStats = !loading && !missingData;
    const validArea = !!area?.area_name && !area?.area_name.includes('undefined');

    return (
      <>
        {this.state.askForRating && <AppRating />}
        <SafeAreaView>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.rootContainer}>
              <ThankYouModal
                visible={this.state.modalVisible}
                onClose={() => {
                  this.setState({
                    modalVisible: false,
                  });
                }}
              />

              <Header />

              {loading && <Loader />}

              {displayStats && !area?.locked && validArea && (
                <SymtomsCountStats
                  areaStats={area}
                  onPress={() => {
                    this.setState({ modalVisible: true });
                  }}
                />
              )}

              {displayStats && area?.locked && <MoreContribution areaStats={area} />}

              {displayStats && validArea && <ContributionRank areaStats={area} />}

              <ShareAppCardViral area={area} />

              <Partners />

              <Footer doneOnPress={this.props.navigation.popToTop} />
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

  divider: {
    height: 1,
    backgroundColor: colors.backgroundFour,
    marginVertical: 20,
  },
});
