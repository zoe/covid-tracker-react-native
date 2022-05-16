import { usualSelfIntro0, usualSelfIntro1, usualSelfIntro2, usualSelfIntro3 } from '@assets/v2/png';
import i18n from '@covid/locale/i18n';
import { storiesOf } from '@storybook/react-native';
import FlowFeatureIntro, { IFlowFeatureIntroProps } from '@tracer/components/templates/FeatureIntroFlow';
import React from 'react';

import { CenterView } from '../CenterView';

const feature = 'new daily reporting';

const featureIntroProps: IFlowFeatureIntroProps = {
  entry: {
    imageSource: usualSelfIntro0,
    textButton: i18n.t('usual-self.flow-entry.cta'),
    title: i18n.t('usual-self.flow-entry.title'),
  },
  intro: [
    {
      content: i18n.t('usual-self.flow-into-1.description'),
      // eslint-disable-next-line object-shorthand
      feature: feature,
      imageSource: usualSelfIntro1,
      introPageIndex: 1,
      introPageLength: 3,
      textButton: i18n.t('usual-self.flow-into-1.cta'),
      title: i18n.t('usual-self.flow-into-1.title'),
    },
    {
      content: i18n.t('usual-self.flow-into-2.description'),
      // eslint-disable-next-line object-shorthand
      feature: feature,
      imageSource: usualSelfIntro2,
      introPageIndex: 2,
      introPageLength: 3,
      textButton: i18n.t('usual-self.flow-into-2.cta'),
      title: i18n.t('usual-self.flow-into-2.title'),
    },
    {
      content: i18n.t('usual-self.flow-into-3.description'),
      // eslint-disable-next-line object-shorthand
      feature: feature,
      imageSource: usualSelfIntro3,
      introPageIndex: 3,
      introPageLength: 3,
      textButton: i18n.t('usual-self.flow-into-3.cta'),
      title: i18n.t('usual-self.flow-into-1.title'),
    },
  ],
};

storiesOf('Templates/Flows/FeatureIntro', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('index', () => <FlowFeatureIntro {...featureIntroProps} />);
