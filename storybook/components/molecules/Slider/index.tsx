import MultiSlider from '@ozziedave/react-native-multi-slider';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import React, { ReactNode, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

import SliderLabels from './labels';

export interface SliderOption {
  label: string;
  value: string | number;
}

export interface ISliderProps {
  name: string;
  title?: ReactNode;
  onSelect: (value: string | number) => void;
  options: SliderOption[];
  sliderWidth?: number;
  showLabels?: boolean;
}

const INVALID_SLIDER_WIDTH = -1;

const Slider = ({ name, title, options, showLabels, onSelect, sliderWidth = INVALID_SLIDER_WIDTH }: ISliderProps) => {
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
    <Column>
      <Row style={{ flexGrow: 1 }}>{title || null}</Row>
      <Row style={{ paddingHorizontal: grid.g32 }}>
        <Column>
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
            sliderLength={width - 100}
            stepHitSlop={35}
            tappableStepStyle={sliderStyles.tappableStepStyle}
            trackStyle={sliderStyles.trackStyle}
          />
        </Column>
      </Row>
      {showLabels ? (
        <Row>
          <SliderLabels
            labels={options.map((option) => option.label)}
            parentWidth={sliderWidthStyle.sliderWidth.width}
          />
        </Row>
      ) : null}
    </Column>
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
    backgroundColor: colors.surface.subdued,
    borderRadius: grid.g48,
    height: grid.g8,
    width: grid.g8,
  },
  trackStyle: {
    backgroundColor: colors.surface.subdued,
    height: 1,
  },
});

export default Slider;
