import { LineChart } from '@covid/components/charts/LineChart';
import { ENewlySymptomaticRegion } from '@covid/core/content/dto/ContentAPIContracts';
import { selectContent, TContentState } from '@covid/core/state';
import { TRootState } from '@covid/core/state/root';
import { colors } from '@theme';
import moment from 'moment';
import * as React from 'react';
import { useSelector } from 'react-redux';

interface IProps {
  beginDate?: Date;
  endDate?: Date;
  height?: number;
  region: ENewlySymptomaticRegion;
}

export const BASELINE_COLOR = colors.darkblue;
export const CURRENT_COLOR = colors.purple;

const TICK_VALUES = [0, 2, 4, 6, 8, 10];

const tickFormatX = (tick: Date) => moment(tick).format('DD MMM');
const tickFormatY = (tick: any) => `${tick}%`;

export function NewlySymptomaticChart(props: IProps) {
  const content = useSelector<TRootState, TContentState>(selectContent);

  const datasets = React.useMemo(() => {
    const newlySymptomaticChartData = (content.newlySymptomaticChartData || [])
      .filter((dataPoint) => dataPoint.region.toLowerCase() === props.region.toLowerCase())
      .map((dataPoint) => ({
        x: moment(dataPoint.date).toDate(),
        y: dataPoint.value * 100,
      }));

    // Make a copy of the chart data and overwrite the y value to 1 so the result is horizonal line.
    const baselineData = newlySymptomaticChartData.map((datapoint) => ({
      ...datapoint,
      y: 1,
    }));

    return [
      {
        data: newlySymptomaticChartData,
        strokeColor: CURRENT_COLOR,
      },
      {
        data: baselineData,
        strokeColor: BASELINE_COLOR,
      },
    ];
  }, [content.newlySymptomaticChartData, props.region]);

  return (
    <LineChart
      datasets={datasets}
      height={props.height}
      strokeColor={CURRENT_COLOR}
      tickFormatX={tickFormatX}
      tickFormatY={tickFormatY}
      tickValues={TICK_VALUES}
    />
  );
}
