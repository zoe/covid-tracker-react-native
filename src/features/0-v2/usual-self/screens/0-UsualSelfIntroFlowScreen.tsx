import { usualSelfIntro0, usualSelfIntro1, usualSelfIntro2, usualSelfIntro3 } from '@assets/v2/png';
import { appActions, appSelectors } from '@covid/core/state/app/slice';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { RouteProp } from '@react-navigation/native';
import FlowFeatureIntro, { IFlowFeatureIntroProps } from '@tracer/components/templates/FeatureIntroFlow';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const USUAL_SELF_INTRO_TAG = i18n.t('usual-self.tag');

const makeFeatureIntroProps = (useSecondaryIntro?: boolean, secondaryOnPress?: () => void): IFlowFeatureIntroProps => ({
  entry: {
    imageSource: usualSelfIntro0,
    onPressBack: NavigatorService.goBack,
    secondaryButtonOnPress: secondaryOnPress,
    secondaryButtonText: useSecondaryIntro ? i18n.t('usual-self.flow-entry-secondary.secondary-cta') : undefined,
    textButton: useSecondaryIntro ? i18n.t('usual-self.flow-entry-secondary.cta') : i18n.t('usual-self.flow-entry.cta'),
    title: useSecondaryIntro ? i18n.t('usual-self.flow-entry-secondary.title') : i18n.t('usual-self.flow-entry.title'),
  },
  intro: [
    {
      content: i18n.t('usual-self.flow-intro-1.description'),
      // eslint-disable-next-line object-shorthand
      feature: USUAL_SELF_INTRO_TAG,
      imageSource: usualSelfIntro1,
      introPageIndex: 1,
      introPageLength: 3,
      textButton: i18n.t('usual-self.flow-intro-1.cta'),
      title: i18n.t('usual-self.flow-intro-1.title'),
    },
    {
      content: i18n.t('usual-self.flow-intro-2.description'),
      // eslint-disable-next-line object-shorthand
      feature: USUAL_SELF_INTRO_TAG,
      imageSource: usualSelfIntro2,
      introPageIndex: 2,
      introPageLength: 3,
      textButton: i18n.t('usual-self.flow-intro-2.cta'),
      title: i18n.t('usual-self.flow-intro-2.title'),
    },
    {
      content: i18n.t('usual-self.flow-intro-3.description'),
      // eslint-disable-next-line object-shorthand
      feature: USUAL_SELF_INTRO_TAG,
      imageSource: usualSelfIntro3,
      introPageIndex: 3,
      introPageLength: 3,
      textButton: i18n.t('usual-self.flow-intro-3.cta'),
      title: i18n.t('usual-self.flow-intro-3.title'),
    },
  ],
});

function UsualSelfIntroFlowScreen({ route }: { route: RouteProp<TScreenParamList, 'UsualSelfIntroScreen'> }) {
  const useSecondaryIntro = useSelector(appSelectors.useShowSecondaryUsualSelfIntro);
  console.log('useSecondaryIntro', useSecondaryIntro);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // console.log('Dispatching');
    return () => dispatch(appActions.setShowSecondaryUsualSelfIntro(true));
  }, []);

  const { secondaryOnPress } = route?.params || {};
  const introProps = makeFeatureIntroProps(useSecondaryIntro, secondaryOnPress);
  return (
    <FlowFeatureIntro
      {...introProps}
      onBackNavigation={NavigatorService.goBack}
      onExitNavigation={() => NavigatorService.navigate('UsualSelfFormScreen')}
    />
  );
}

export default React.memo(UsualSelfIntroFlowScreen);
