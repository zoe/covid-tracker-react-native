import { usualSelfIntro0, usualSelfIntro1, usualSelfIntro2, usualSelfIntro3 } from '@assets/v2/png';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import FlowFeatureIntro, { IFlowFeatureIntroProps } from '@tracer/components/templates/FeatureIntroFlow';
import React from 'react';

const USUAL_SELF_INTRO_TAG = i18n.t('usual-self.tag');

const makeFeatureIntroProps = (): IFlowFeatureIntroProps => ({
  entry: {
    imageSource: usualSelfIntro0,
    onPressBack: NavigatorService.goBack,
    textButton: i18n.t('usual-self.flow-entry.cta'),
    title: i18n.t('usual-self.flow-entry.title'),
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

export default function UsualSelfIntroFlowScreen() {
  const introProps = makeFeatureIntroProps();
  return (
    <FlowFeatureIntro
      {...introProps}
      onBackNavigation={NavigatorService.goBack}
      onExitNavigation={() => NavigatorService.navigate('UsualSelfFormScreen')}
    />
  );
}
