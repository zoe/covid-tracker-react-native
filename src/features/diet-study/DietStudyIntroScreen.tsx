import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { StickyBottomButton } from '@covid/components/Screen';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { TextInfoScreen } from '@covid/components/Screens/TextInfoScreen';
import i18n from '@covid/locale/i18n';
import Analytics, { events } from '@covid/core/Analytics';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyIntro'>;
  route: RouteProp<ScreenParamList, 'DietStudyIntro'>;
};

export default class DietStudyIntroScreen extends Component<Props> {
  constructor(props: Props) {
    super(props);
    AssessmentCoordinator.resetNavigation(props.navigation);
  }

  private accept = () => {
    Analytics.track(events.ACCEPT_DIET_STUDY);
  };

  private defer = () => {
    Analytics.track(events.DEFER_DIET_STUDY);
  };

  private skip = () => {
    Analytics.track(events.DECLINE_DIET_STUDY);
  };

  render() {
    const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;
    return (
      <TextInfoScreen
        profile={currentPatient.profile}
        navigation={this.props.navigation}
        headerLabel={i18n.t('diet-study.intro.title')}
        primaryLabel={i18n.t('diet-study.intro.description-1')}
        secondaryLabel={i18n.t('diet-study.intro.description-2')}
        primaryButtonLabel={i18n.t('diet-study.intro.cta-yes')}
        secondaryButtonLabel={i18n.t('diet-study.intro.cta-no-later')}
        primaryButtonAction={this.accept}
        secondaryButtonAction={this.skip}
        bottomView={<StickyBottomButton label={i18n.t('diet-study.intro.cta-never')} onPress={this.skip} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  primaryLabel: {
    textAlign: 'center',
    marginBottom: 24,
  },
  secondaryLabel: {
    textAlign: 'center',
    marginBottom: 24,
  },
});
