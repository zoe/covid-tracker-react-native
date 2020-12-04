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
      style={[
        {
          alignItems: 'center',
          alignSelf: 'flex-start',
          backgroundColor,
          borderRadius: 8,
          flexDirection: 'column',
          justifyContent: 'center',
          paddingHorizontal: 20,
          paddingVertical: 8,
        },
        direction === 'DOWN' ? { marginBottom: 14 } : { marginTop: 14 },
      ]}>
      <View
        style={[
          {
            backgroundColor,
            height: 20,
            position: 'absolute',
            transform: [{ rotate: '45deg' }],
            width: 20,
          },
          direction === 'DOWN' ? { bottom: -10 } : { top: -10 },
        ]}
      />
      {children}
    </View>
  );
}

export default ScoreCard;
