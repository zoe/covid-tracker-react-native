import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  width?: number | string;
  height?: number | string;
};

const NHSLogo: React.FC<Props> = ({ width = 71, height = 29 }) => {
  return (
    <Svg fill="none" height={height} viewBox="0 0 71 29" width={width}>
      <Path
        d="M70.4 28.3V0H0V28.3H70.4ZM28.3 2.7L23.4 25.5H15.8L11 9.8L7.8 25.6H2L6.9 2.7H14.6L19.3 18.5H19.4L22.6 2.7H28.3ZM50.1 2.7L45.3 25.5H39.2L41.2 15.7H34L32 25.5H25.9L30.7 2.7H36.8L35 11.4H42.3L44 2.7H50.1ZM67.8 3.4L66.3 7.9C65.1 7.3 63.5 6.9 61.2 6.9C58.8 6.9 56.8 7.3 56.8 9.1C56.8 12.3 65.7 11.1 65.7 18.1C65.7 24.4 59.8 26 54.5 26C52.1 26 49.4 25.4 47.4 24.8L48.8 20.2C50 21 52.4 21.5 54.4 21.5C56.3 21.5 59.3 21.1 59.3 18.8C59.3 15.1 50.4 16.5 50.4 10.1C50.4 4.2 55.6 2.4 60.6 2.4C63.6 2.3 66.2 2.6 67.8 3.4Z"
        fill="#005CB8"
      />
    </Svg>
  );
};

export default NHSLogo;
