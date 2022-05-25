import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import ScreenHeader from '@tracer/components/molecules/Screen/header';
import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IScreenNavigatorCompactProps {
  middle?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ScreenNavigatorCompact = ({ style, left, right, middle }: IScreenNavigatorCompactProps) => {
  return (
    <ScreenHeader style={style}>
      <Column style={baseStyle.leftColumn}>{left}</Column>
      <Column style={baseStyle.middleColumn}>{middle}</Column>
      <Column style={baseStyle.rightColumn}>{right}</Column>
    </ScreenHeader>
  );
};

interface IScreenNavigatorNonCompactProps {
  left?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
}

export const ScreenNavigatorNonCompact = ({ left, right, children }: IScreenNavigatorNonCompactProps) => {
  return (
    <ScreenHeader>
      <ScreenNavigatorCompact left={left} right={right} />
      <Row>{children}</Row>
    </ScreenHeader>
  );
};

interface IScreenNavigatorProps {
  compact?: boolean;
  middle?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
}

export default function ScreenNavigator({ compact = true, left, right, middle, children }: IScreenNavigatorProps) {
  return (
    <View style={baseStyle.rootView}>
      {compact ? (
        <ScreenNavigatorCompact left={left} middle={middle} right={right} />
      ) : (
        <ScreenNavigatorNonCompact left={left} right={right}>
          {children}
        </ScreenNavigatorNonCompact>
      )}
    </View>
  );
}

const baseStyle = StyleSheet.create({
  leftColumn: {
    minWidth: 32,
    padding: grid.g16,
  },
  middleColumn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navLeft: {
    alignItems: 'flex-start',
  },
  navRight: {
    alignItems: 'flex-end',
  },
  rightColumn: {
    minWidth: 32,
    padding: grid.g16,
  },
  rootView: {
    flex: 1,
    flexDirection: 'row',
    padding: grid.g16,
  },
});
