import { styling } from '@covid/themes';
import { colors } from '@theme';
import moment from 'moment';
import * as React from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';

type TDataSet = {
  data: any[];
  strokeColor?: string;
};

interface IProps {
  children?: React.ReactNode;
  data?: any[];
  datasets?: TDataSet[];
  height?: number;
  strokeColor?: string;
  tickFormatY?: any[] | ((tick: any, index: number, ticks: any[]) => string | number) | undefined;
  tickValues?: number[];
  useDefaultXTicks?: boolean;
  useDefaultYTicks?: boolean;
  width?: number;
}

const padding = {
  bottom: 26,
  left: 48,
  right: 6,
  top: 6,
};

type TScale = 'linear' | 'time' | 'log' | 'sqrt';

const scale: { x: TScale; y: TScale } = { x: 'time', y: 'linear' };
const yAxisTicksAmount = 5;

const yAxisTickStepSizes = Array(10)
  .fill(null)
  .map((_, i) => [10, 20, 25, 50].map((step) => step * 10 ** i))
  .flat(1);

function tickFormat(tick: string) {
  const momentTick = moment(tick);
  return momentTick.dayOfYear() === 1 ? momentTick.year() : momentTick.format('MMM');
}

export function LineChart(props: IProps) {
  const [viewWidth, setViewWidth] = React.useState(0);
  const [viewHeight, setViewHeight] = React.useState(0);

  const maxYValue = React.useMemo(() => {
    const data = props.data || (props.datasets && props.datasets[0].data) || [];
    return Math.max(...data.map((dataPoint) => dataPoint.y));
  }, []);

  const tickValues = React.useMemo(() => {
    if (props.tickValues) {
      return props.tickValues;
    }
    const roughStepSize = maxYValue / (yAxisTicksAmount - 1);
    const stepSize = yAxisTickStepSizes.find((number) => number > roughStepSize) || 1;
    return Array(yAxisTicksAmount)
      .fill(null)
      .map((_, i) => i * stepSize);
  }, [props.tickValues, maxYValue]);

  const onLayoutWidth = React.useCallback(
    (event: LayoutChangeEvent) => setViewWidth(event.nativeEvent.layout.width),
    [],
  );

  const onLayoutHeight = React.useCallback(
    (event: LayoutChangeEvent) => setViewHeight(event.nativeEvent.layout.height),
    [],
  );

  const chartWidth = props.width || viewWidth;
  const chartHeight = props.height || viewHeight;

  const datasets = props.data
    ? [
        {
          data: props.data,
          strokeColor: props.strokeColor,
        },
      ]
    : props.datasets;

  return (
    <>
      {props.width ? null : <View onLayout={onLayoutWidth} style={styling.measureWidth} />}
      {props.height ? null : <View onLayout={onLayoutHeight} style={styling.measureHeight} />}
      {chartWidth > 0 && chartHeight > 0 ? (
        <VictoryChart
          height={chartHeight}
          padding={padding}
          scale={scale}
          theme={VictoryTheme.material}
          width={chartWidth}
        >
          <VictoryAxis
            dependentAxis
            tickFormat={props.tickFormatY}
            tickValues={props.useDefaultYTicks ? undefined : tickValues}
          />
          <VictoryAxis fixLabelOverlap tickFormat={props.useDefaultXTicks ? undefined : tickFormat} />
          {datasets?.map((dataset) => (
            <VictoryLine
              data={dataset.data}
              height={chartHeight}
              style={{
                data: { stroke: dataset.strokeColor ?? colors.darkblue },
              }}
              width={chartWidth}
            />
          ))}
        </VictoryChart>
      ) : null}
    </>
  );
}
