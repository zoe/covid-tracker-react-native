import ScreenFlow from '@tracer/components/organisms/Screen/flow';
import React, { useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import FeatureIntroScreen, { IFeatureIntroScreenProps } from '../FeatureIntro';
import FeatureIntroEntryScreen, { IFeatureIntroEntryScreenProps } from '../FeatureIntro/entry';

type TFlowType = 'horizontal' | 'vertical';

export interface IFlowFeatureIntroProps {
  intro?: IFeatureIntroScreenProps[];
  entry: IFeatureIntroEntryScreenProps;
  /**
   * Controls the screen the user should be taken to
   * at the end of the flow. Triggered upon clicking the
   * last CTA.
   */
  onExitNavigation?: Function;
  onBackNavigation?: Function;
  /**
   * Controls in which direction the Screen should scroll
   */
  flow?: TFlowType;
}

export default function FlowFeatureIntro({
  entry,
  intro,
  onExitNavigation,
  onBackNavigation,
  flow = 'horizontal',
}: IFlowFeatureIntroProps) {
  const flowScrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();

  const onUpdatePage = (page: number) => {
    if (onExitNavigation && intro && page > intro.length) onExitNavigation();
    if (onExitNavigation && !intro && page > 0) onExitNavigation();
    // scroll to next page
    if (flowScrollRef) flowScrollRef.current?.scrollTo({ x: width * page });
  };

  return (
    <ScreenFlow flow={flow} props={{ showsHorizontalScrollIndicator: false }} scrollRef={flowScrollRef}>
      <FeatureIntroEntryScreen {...entry} onPress={() => onUpdatePage(1)} onPressBack={onBackNavigation} />
      {intro
        ? intro.map((screen, index) => (
            <FeatureIntroScreen key={`feature-intro-screen-${index + 1}`} {...screen} onPress={onUpdatePage} />
          ))
        : null}
    </ScreenFlow>
  );
}
