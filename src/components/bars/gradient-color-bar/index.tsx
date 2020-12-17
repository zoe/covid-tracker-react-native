import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  colors?: string[];
  height?: number;
}

function GradientColorBar({ colors = ['#FF9600', '#FFD519', '#C0D904', '#A0B406'], height = 4 }: IProps) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        borderRadius: height * 0.5,
        flex: 1,
        flexDirection: 'row',
        height,
      }}
    />
  );
}

export default GradientColorBar;
