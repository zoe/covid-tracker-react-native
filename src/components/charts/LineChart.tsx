import { styling } from '@covid/themes';
import { colors } from '@theme';
import moment from 'moment';
import * as React from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';

interface IProps {
  data: any[];
  height?: number;
  width?: number;
}

const padding = {
  bottom: 26,
  left: 48,
  right: 0,
  top: 6,
};

type TScale = 'linear' | 'time' | 'log' | 'sqrt';

const scale: { x: TScale; y: TScale } = { x: 'time', y: 'linear' };

const style = {
  data: { stroke: colors.darkblue },
};

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

  const maxValue = React.useMemo(() => Math.max(...props.data.map((dataPoint) => dataPoint.y)), [props.data]);

  const tickValues = React.useMemo(() => {
    const roughStepSize = maxValue / (yAxisTicksAmount - 1);
    const stepSize = yAxisTickStepSizes.find((number) => number > roughStepSize) || 1;
    return Array(yAxisTicksAmount)
      .fill(null)
      .map((_, i) => i * stepSize);
  }, [maxValue]);

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
          <VictoryAxis dependentAxis tickValues={tickValues} />
          <VictoryAxis fixLabelOverlap tickFormat={tickFormat} />
          <VictoryLine data={props.data} height={chartHeight} style={style} width={chartWidth} />
        </VictoryChart>
      ) : null}
    </>
  );
}
