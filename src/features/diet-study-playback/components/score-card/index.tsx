import React, { ReactElement, ReactNode } from 'react';
import { Animated } from 'react-native';

type TDirection = 'UP' | 'DOWN';

interface IProps {
  backgroundColor: any;
  children: ReactNode | ReactNode[] | ReactElement | ReactElement[];
  direction?: TDirection;
}

function ScoreCard({ backgroundColor, children, direction = 'DOWN' }: IProps) {
  return (
    <Animated.View
      style={[
        {
          alignItems: 'center',
          alignSelf: 'flex-start',
          ...backgroundColor,
          borderRadius: 8,
          flexDirection: 'column',
          justifyContent: 'center',
          paddingVertical: 8,
          width: 60,
        },
        direction === 'DOWN' ? { marginBottom: 14 } : { marginTop: 14 },
      ]}
    >
      <Animated.View
        style={[
          {
            ...backgroundColor,
            height: 20,
            position: 'absolute',
            transform: [{ rotate: '45deg' }],
            width: 20,
          },
          direction === 'DOWN' ? { bottom: -10 } : { top: -10 },
        ]}
      />
      {children}
    </Animated.View>
  );
}

export default ScoreCard;
