import { ModalContainer } from '@covid/components/ModalContainer';
import { RegularBoldText, RegularText } from '@covid/components/Text';
import { IContentService } from '@covid/core/content/ContentService';
import { isSECountry, isUSCountry } from '@covid/core/localisation/LocalisationService';
import { IUserService } from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import { container, lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import Constants from '@covid/utils/Constants';
import { colors } from '@theme';
import { Toast } from 'native-base';
import React, { Component } from 'react';
import { Linking, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

type PropsType = object;

type State = {
  isModalOpen: boolean;
  showTakeToStore: boolean;
};

const USiOSLink = `https://apps.apple.com/us/app/covid-symptom-study/id1503529611`;
const UKiOSLink = `https://apps.apple.com/gb/app/covid-symptom-study/id1503529611`;
const SEiOSLink = `https://apps.apple.com/se/app/covid-symptom-study/id1503529611`;
const AndroidLink = `market://details?id=${Constants.expo.android.package}`;

export async function shouldAskForRating(): Promise<boolean> {
  const profile = await container.get<IUserService>(Services.User).getUser();
  const eligibleToAskForRating = profile?.ask_for_rating ?? false;
  const askedToRateStatus = await container.get<IContentService>(Services.Content).getAskedToRateStatus();
  return !askedToRateStatus && eligibleToAskForRating;
}

export class AppRating extends Component<PropsType, State> {
  @lazyInject(Services.Content)
  private readonly contentService: IContentService;

  state = {
    isModalOpen: true,
    showTakeToStore: false,
  };

  decline = () => {
    this.contentService.setAskedToRateStatus('asked');
    this.setState({ isModalOpen: false });
  };

  declineFeedback = () => {
    this.decline();
    Toast.show({
      duration: 3000,
      position: 'top',
      text: i18n.t('rating.thank-you-for-rating'),
      textStyle: { lineHeight: 25, textAlign: 'center' },
    });
  };

  takeToStore = () => {
    this.contentService.setAskedToRateStatus('asked');
    if (Platform.OS !== 'ios') {
      Linking.openURL(AndroidLink);
    } else {
      const storeLink = isUSCountry() ? USiOSLink : isSECountry() ? SEiOSLink : UKiOSLink;
      Linking.openURL(storeLink);
    }
    this.setState({ isModalOpen: false });
  };

  askToRate = (_: any) => {
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
      <TouchableOpacity onPress={noAction} style={styles.ratingButton}>
        <RegularText style={styles.buttonText}>{noLabel}</RegularText>
      </TouchableOpacity>
      <View style={styles.verticalDivider} />
      <TouchableOpacity onPress={yesAction} style={styles.ratingButton}>
        <RegularText style={styles.buttonText}>{yesLabel}</RegularText>
      </TouchableOpacity>
    </View>
  );

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
                this.decline,
              )}
            </>
          ) : (
            <>
              {this.renderHeader(i18n.t('rating.how-are-we-doing'), i18n.t('rating.would-you-recommend'))}
              {this.renderActionButtons(
                i18n.t('rating.cta-yes'),
                this.askToRate,
                i18n.t('rating.cta-no'),
                this.declineFeedback,
              )}
            </>
          )}
        </ModalContainer>
      )
    );
  }
}

const styles = StyleSheet.create({
  actionContainer: {
    borderColor: colors.actionButtonBorder,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.linkBlue,
    textAlign: 'center',
  },
  ratingButton: {
    color: colors.linkBlue,
    height: 60,
    justifyContent: 'center',
    width: '50%',
  },
  ratingHeader: {
    fontSize: 18,
    paddingBottom: 10,
    textAlign: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginHorizontal: 60,
    paddingBottom: 30,
    textAlign: 'center',
  },
  verticalDivider: {
    backgroundColor: colors.actionButtonBorder,
    height: '100%',
    width: 1,
  },
});
