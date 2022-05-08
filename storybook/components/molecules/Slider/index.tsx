import MultiSlider from '@ozziedave/react-native-multi-slider';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';

import SliderLabels from './labels';
import SliderTitle from './title';

interface SliderOption {
  label: string;
  value: string | number;
}

interface SliderProps {
  name: string;
  title?: string;
  titleStyle?: StyleProp<ViewStyle>;
  onSelect: (value: string | number) => void;
  options: SliderOption[];
  sliderWidth?: number;
  showLabels?: boolean;
}

const INVALID_SLIDER_WIDTH = -1;

const Slider = ({ name, title, options, showLabels, onSelect, sliderWidth = INVALID_SLIDER_WIDTH }: SliderProps) => {
  const window = useWindowDimensions();
  const width = sliderWidth > -1 ? sliderWidth : window.width;
  const [field, setValue] = useState<number | string>(name);

  const valueChange = (values: number[]) => {
    if (values.length > 0) {
      const selectedOption = options[values[0]];
      setValue(selectedOption.value);
      onSelect(selectedOption.value);
    }
  };

  const currentStep = options.find(({ value }) => value === field);
  const isActiveValueSelected = currentStep && currentStep.value !== 'NO ANSWER';

  const sliderWidthStyle = StyleSheet.create({ sliderWidth: { width } });
  return (
    <>
      {title ? <SliderTitle title={title} /> : null}
      <View>
        <View>
          {/* @ts-ignore */}
          <MultiSlider
            enableTapSteps
            snapped
            activeTappableStepStyle={sliderStyles.activeTappableStepStyle}
            markerStyle={isActiveValueSelected ? sliderStyles.activeMarkerStyle : sliderStyles.markerStyle}
            max={options.length - 1}
            min={0}
            onValuesChange={valueChange}
            pressedMarkerStyle={sliderStyles.pressedMarkerStyle}
            selectedStyle={sliderStyles.selectedStyle}
            sliderLength={width - 64}
            stepHitSlop={35}
            tappableStepStyle={sliderStyles.tappableStepStyle}
            trackStyle={sliderStyles.trackStyle}
          />
        </View>
      </View>
      {showLabels ? (
        <SliderLabels labels={options.map((option) => option.label)} parentWidth={sliderWidthStyle.sliderWidth.width} />
      ) : null}
    </>
  );
};

const sliderStyles = StyleSheet.create({
  activeMarkerStyle: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    height: grid.g16,
    width: grid.g16,
  },
  activeTappableStepStyle: {
    backgroundColor: colors.primary,
  },
  markerStyle: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    height: grid.g16,
    width: grid.g16,
  },
  pressedMarkerStyle: {
    height: grid.g24,
    width: grid.g24,
  },
  selectedStyle: {
    backgroundColor: colors.primary,
  },
  tappableStepStyle: {
    backgroundColor: colors.surface.interactive,
    borderRadius: grid.g48,
    height: grid.g8,
    width: grid.g8,
  },
  trackStyle: {
    backgroundColor: colors.surface.interactive,
    height: 1,
  },
});

export default Slider;
