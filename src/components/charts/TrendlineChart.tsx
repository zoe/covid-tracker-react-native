import { LineChart } from '@covid/components/charts/LineChart';
import { selectContent, TContentState } from '@covid/core/state';
import { TRootState } from '@covid/core/state/root';
import moment from 'moment';
import * as React from 'react';
import { useSelector } from 'react-redux';

interface IProps {
  beginDate?: Date;
  endDate?: Date;
  height?: number;
}

export function TrendlineChart(props: IProps) {
  const content = useSelector<TRootState, TContentState>(selectContent);

  const data = React.useMemo(() => {
    const beginMoment = moment(props.beginDate);
    const endMoment = moment(props.endDate);

    let timeseries = content.localTrendline?.timeseries || [];

    if (props.beginDate && props.endDate) {
      timeseries = timeseries.filter((timeserie) => {
        const timeserieMoment = moment(timeserie.date);
        return timeserieMoment > beginMoment && timeserieMoment < endMoment;
      });
    } else if (props.beginDate) {
      timeseries = timeseries.filter((timeserie) => moment(timeserie.date) > beginMoment);
    } else if (props.endDate) {
      timeseries = timeseries.filter((timeserie) => moment(timeserie.date) < endMoment);
    }

    return timeseries
      .slice()
      .reverse()
      .map((timeserie) => ({
        x: moment(timeserie.date).toDate(),
        y: Math.round(timeserie.value),
      }));
  }, [props.beginDate, props.endDate, content.localTrendline]);

  return <LineChart data={data} height={props.height} />;
}
