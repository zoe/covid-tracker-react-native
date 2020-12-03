import React, { ReactElement, ReactNode } from 'react';
import { View } from 'react-native';

type TDirection = 'UP' | 'DOWN';

interface IProps {
  backgroundColor: string;
  children: ReactNode | ReactNode[] | ReactElement | ReactElement[];
  direction?: TDirection;
}

function ScoreCard({ backgroundColor, children, direction = 'DOWN' }: IProps) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor,
        borderRadius: 8,
        justifyContent: 'center',
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
      }}>
      <View
        style={{
          backgroundColor,
          bottom: -10,
          height: 20,
          position: 'absolute',
          transform: [{ rotate: '45deg' }],
          width: 20,
        }}
      />
      {children}
    </View>
  );
}

export default ScoreCard;
