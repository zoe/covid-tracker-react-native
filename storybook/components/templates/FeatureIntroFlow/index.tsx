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
   * Controls in which direction the Screen should scroll
   */
  flow?: TFlowType;
}

export default function FlowFeatureIntro({ entry, intro, flow = 'horizontal' }: IFlowFeatureIntroProps) {
  const flowScrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();

  const onUpdatePage = (page: number) => {
    if (flowScrollRef) flowScrollRef.current?.scrollTo({ x: width * page });
  };

  return (
    <ScreenFlow flow={flow} props={{ showsHorizontalScrollIndicator: false }} scrollRef={flowScrollRef}>
      <FeatureIntroEntryScreen {...entry} onPress={() => onUpdatePage(1)} />
      {intro
        ? intro.map((screen, index) => (
            <FeatureIntroScreen key={`feature-intro-screen-${index + 1}`} {...screen} onPress={onUpdatePage} />
          ))
        : null}
    </ScreenFlow>
  );
}
