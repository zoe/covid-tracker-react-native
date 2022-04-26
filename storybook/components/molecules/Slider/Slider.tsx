import { sizes } from '@covid/themes';
import MultiSlider from '@ozziedave/react-native-multi-slider';
import { colors } from '@theme';
import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

interface SliderOption {
  label: string;
  value: string | number;
}

interface SliderProps {
  name: string;
  title?: string;
  options: SliderOption[];
  showLabels?: boolean;
}

const Slider = ({ name, title, options, showLabels }: SliderProps) => {
  const { width } = useWindowDimensions();
  const [field, setValue] = useState<number | string>(name);

  const valueChange = (values: number[]) => {
    if (values.length > 0) {
      const selectedOption = options[values[0]];
      setValue(selectedOption.value);
    }
  };

  const currentStep = options.find(({ value }) => value === field);
  const isActiveValueSelected = currentStep && currentStep.value !== 'NO ANSWER';

  return (
    <View>
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
  );
};

const sliderStyles = StyleSheet.create({
  activeMarkerStyle: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    height: sizes.m + sizes.xxxs,
    width: sizes.m + sizes.xxxs,
  },
  activeTappableStepStyle: {
    backgroundColor: colors.primary,
  },
  markerStyle: {
    backgroundColor: colors.quaternary,
    borderColor: colors.quaternary,
    height: sizes.m,
    width: sizes.m,
  },
  pressedMarkerStyle: {
    height: sizes.l,
    width: sizes.l,
  },
  selectedStyle: {
    backgroundColor: colors.primary,
  },
  tappableStepStyle: {
    backgroundColor: colors.tertiary,
    height: sizes.xxs + sizes.xxxs,
    width: sizes.xxxs,
  },
  trackStyle: {
    backgroundColor: colors.tertiary,
  },
});

export default Slider;
