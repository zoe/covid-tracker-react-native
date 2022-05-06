import IconCheck from '@assets/v2/icon-check';
import IconExclamation from '@assets/v2/icon-exclamation';
import IconInfo from '@assets/v2/icon-info';
import { grid } from '@tracer/branding/grid';
import { ICardProps } from '@tracer/components/molecules/Card';
import SideBySideCard from '@tracer/components/organisms/Card/sideByside';
import React, { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

import { colors } from '../../../branding/colors';

type TCalloutType = 'info' | 'error' | 'warning' | 'custom' | 'success';

type CalloutIconStyleMapping = {
  [key: string]: {
    calloutStyle: { surface: { backgroundColor: string } };
    component: ReactNode;
  };
};

const calloutConfig: CalloutIconStyleMapping = {
  error: {
    calloutStyle: StyleSheet.create({ surface: { backgroundColor: colors.surface.critical } }),
    component: <IconExclamation circleFill={colors.tags.critical} />,
  },
  info: {
    calloutStyle: StyleSheet.create({ surface: { backgroundColor: colors.surface.subdued } }),
    component: <IconInfo />,
  },
  success: {
    calloutStyle: StyleSheet.create({ surface: { backgroundColor: colors.surface.success } }),
    component: <IconCheck circleFill={colors.tags.success} />,
  },
  warning: {
    calloutStyle: StyleSheet.create({ surface: { backgroundColor: colors.surface.warning } }),
    component: <IconExclamation circleFill={colors.tags.warning} />,
  },
};

export interface ICalloutProps {
  testID?: string;
  compact?: boolean;
  calloutType: TCalloutType;
  text?: string;
}

const CalloutCompact = ({ calloutType = 'info', text }: ICalloutProps) => {
  const { calloutStyle, component } = calloutConfig[calloutType];
  const rightSideProps: ICardProps = {
    customHeader: <Text style={[baseStyle.compactTextStyle]}>{text}</Text>,
  };
  const leftSideProps: ICardProps = {
    customHeader: component,
  };
  return (
    <SideBySideCard
      leftColWidthPercent="16%"
      leftSide={leftSideProps}
      rightColWidthPercent="84%"
      rightSide={rightSideProps}
      style={[baseStyle.view, calloutStyle.surface]}
    />
  );
};

/**
 * Callout
 *
 * @param style custom styling, overrides all other styles
 */
export default function Callout({ compact, ...props }: ICalloutProps) {
  return compact ? <CalloutCompact {...props} /> : null;
}

const baseStyle = StyleSheet.create({
  compactTextStyle: {
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 24,
    textAlign: 'left',
  },
  view: {
    height: 56,
    marginHorizontal: grid.g32,
  },
});
