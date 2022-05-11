import { usualSelfIntro0, usualSelfIntro1, usualSelfIntro2, usualSelfIntro3 } from '@assets/v2/png';
import { storiesOf } from '@storybook/react-native';
import FlowFeatureIntro, { IFlowFeatureIntroProps } from '@tracer/components/templates/FeatureIntroFlow';
import React from 'react';

import { CenterView } from '../CenterView';

const feature = 'new daily reporting';

const featureIntroProps: IFlowFeatureIntroProps = {
  entry: {
    imageSource: usualSelfIntro0,
    textButton: 'Get Started',
    title: 'Introducing your new Daily Reporting',
  },
  intro: [
    {
      content:
        'As well as contributing to COVID-19 knowledge, every report now supports research in major health issues, such as cancer and dementia.\n\nLogging daily adds huge value to a range of new studies.',
      // eslint-disable-next-line object-shorthand
      feature: feature,
      imageSource: usualSelfIntro1,
      introPageIndex: 1,
      introPageLength: 3,
      textButton: 'Next',
      title: 'Your health reports are now even more powerful',
    },
    {
      content:
        'Your reports are now personalised to your unique health, even if you’re managing a chronic health condition.\n\nThe new report simply asks whether you feel different (e.g. worse or better) from how you usually feel.',
      // eslint-disable-next-line object-shorthand
      feature: feature,
      imageSource: usualSelfIntro2,
      introPageIndex: 2,
      introPageLength: 3,
      textButton: 'Next',
      title: 'Most reports can be done in a single tap',
    },
    {
      content:
        'To get started, we need to understand how you usually feel. We call this your Usual Self - think of this as your baseline health.\n\nOnce set up, your new personalised reports will be ready! ',
      // eslint-disable-next-line object-shorthand
      feature: feature,
      imageSource: usualSelfIntro3,
      introPageIndex: 3,
      introPageLength: 3,
      textButton: 'Set up your Usual Self',
      title: 'Let’s get to know your symptoms better',
    },
  ],
};

storiesOf('Templates/Flows/FeatureIntro', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('index', () => <FlowFeatureIntro {...featureIntroProps} />);
