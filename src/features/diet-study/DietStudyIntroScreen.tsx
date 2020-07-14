import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { StickyBottomButton } from '@covid/components/Screen';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { TextInfoScreen } from '@covid/components/Screens/TextInfoScreen';
import i18n from '@covid/locale/i18n';
import { events } from '@covid/core/Analytics';
import dietStudyCoordinator from '@covid/core/diet-study/DietStudyCoordinator';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyIntro'>;
  route: RouteProp<ScreenParamList, 'DietStudyIntro'>;
};

const DietStudyIntroScreen: React.FC<Props> = ({ route, navigation }) => {
  const { currentPatient } = route.params.dietStudyData;

  const accept = () => {
    dietStudyCoordinator.dietStudyResponse(events.ACCEPT_DIET_STUDY);
  };

  const defer = () => {
    dietStudyCoordinator.dietStudyResponse(events.DEFER_DIET_STUDY);
  };

  const skip = () => {
    dietStudyCoordinator.dietStudyResponse(events.DECLINE_DIET_STUDY);
  };

  return (
    <TextInfoScreen
      profile={currentPatient.profile}
      navigation={navigation}
      headerLabel={i18n.t('diet-study.intro.title')}
      primaryLabel={i18n.t('diet-study.intro.description-1')}
      secondaryLabel={i18n.t('diet-study.intro.description-2')}
      primaryButtonLabel={i18n.t('diet-study.intro.cta-yes')}
      secondaryButtonLabel={i18n.t('diet-study.intro.cta-no-later')}
      primaryButtonAction={accept}
      secondaryButtonAction={defer}
      bottomView={<StickyBottomButton label={i18n.t('diet-study.intro.cta-no-never')} onPress={skip} />}
    />
  );
};

export default DietStudyIntroScreen;
