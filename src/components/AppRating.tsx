import Constants from 'expo-constants';
import { Toast, View } from 'native-base';
import React, { Component } from 'react';
import { Linking, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { isSECountry, isUSCountry, ICoreService } from '@covid/core/user/UserService';
import { ModalContainer } from '@covid/components/ModalContainer';
import { contentService } from '@covid/Services';
import { container } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';

import { RegularBoldText, RegularText } from './Text';

type PropsType = object;

type State = {
  isModalOpen: boolean;
  showTakeToStore: boolean;
};

const USiOSLink = `https://apps.apple.com/us/app/covid-symptom-study/id1503529611`;
const UKiOSLink = `https://apps.apple.com/gb/app/covid-symptom-study/id1503529611`;
const SEiOSLink = `https://apps.apple.com/se/app/covid-symptom-study/id1503529611`;
const AndroidLink = `market://details?id=${Constants.manifest.android.package}`;

export async function shouldAskForRating(): Promise<boolean> {
  const profile = await container.get<ICoreService>(Services.User).getProfile();
  const eligibleToAskForRating = profile.ask_for_rating;
  const askedToRateStatus = await contentService.getAskedToRateStatus();
  return !askedToRateStatus && eligibleToAskForRating;
}

export class AppRating extends Component<PropsType, State> {
  state = {
    isModalOpen: true,
    showTakeToStore: false,
  };

  decline = () => {
    contentService.setAskedToRateStatus('asked');
    this.setState({ isModalOpen: false });
  };

  declineFeedback = () => {
    this.decline();
    Toast.show({
      text: i18n.t('rating.thank-you-for-rating'),
      duration: 3000,
      position: 'top',
      textStyle: { textAlign: 'center', lineHeight: 25 },
      // style: {paddingVertical: 40}
    });
  };

  takeToStore = () => {
    contentService.setAskedToRateStatus('asked');
    if (Platform.OS != 'ios') {
      Linking.openURL(AndroidLink).catch((err) => {});
    } else {
      const storeLink = isUSCountry() ? USiOSLink : isSECountry() ? SEiOSLink : UKiOSLink;
      Linking.openURL(storeLink).catch((err) => {});
    }
    this.setState({ isModalOpen: false });
  };

  askToRate = (e: any) => {
    this.setState({ showTakeToStore: true });
  };

  renderHeader = (headerText: string, subText: string) => (
    <>
      <RegularBoldText style={styles.ratingHeader}>{headerText}</RegularBoldText>
      <RegularText style={styles.ratingText}>{subText}</RegularText>
    </>
  );

  renderActionButtons = (yesLabel: string, yesAction: any, noLabel: string, noAction: any) => (
    <View style={styles.actionContainer}>
      <TouchableOpacity style={styles.ratingButton} onPress={noAction}>
        <RegularText style={styles.buttonText}>{noLabel}</RegularText>
      </TouchableOpacity>
      <View style={styles.verticalDivider} />
      <TouchableOpacity style={styles.ratingButton} onPress={yesAction}>
        <RegularText style={styles.buttonText}>{yesLabel}</RegularText>
      </TouchableOpacity>
    </View>
  );
  //

  render() {
    return (
      this.state.isModalOpen && (
        <ModalContainer>
          {this.state.showTakeToStore ? (
            <>
              {this.renderHeader(i18n.t('rating.rate-this-app'), i18n.t('rating.explanation'))}
              {this.renderActionButtons(
                i18n.t('rating.cta-rate'),
                this.takeToStore,
                i18n.t('rating.cta-later'),
                this.decline
              )}
            </>
          ) : (
            <>
              {this.renderHeader(i18n.t('rating.how-are-we-doing'), i18n.t('rating.would-you-recommend'))}
              {this.renderActionButtons(
                i18n.t('rating.cta-yes'),
                this.askToRate,
                i18n.t('rating.cta-no'),
                this.declineFeedback
              )}
            </>
          )}
        </ModalContainer>
      )
    );
  }
}

const styles = StyleSheet.create({
  verticalDivider: {
    height: '100%',
    width: 1,
    backgroundColor: colors.actionButtonBorder,
  },
  ratingText: {
    paddingBottom: 30,
    marginHorizontal: 60,
    fontSize: 14,
    textAlign: 'center',
  },
  ratingHeader: {
    paddingBottom: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: colors.actionButtonBorder,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.linkBlue,
  },
  ratingButton: {
    width: '50%',
    height: 60,
    justifyContent: 'center',
    color: colors.linkBlue,
  },
});
