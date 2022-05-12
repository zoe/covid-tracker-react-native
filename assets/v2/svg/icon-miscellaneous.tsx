import { colors } from '@tracer/branding/colors';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

type TIconMiscellaneousProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
};

const IconMiscellaneous: React.FC<TIconMiscellaneousProps> = ({ width = 16, height = 16, fill = colors.brand }) => {
  return (
    <Svg fill={fill} height={height} viewBox={`0 0 ${width} ${height}`} width={width}>
      <Path
        d="M12 1.5H4V2.5H12V1.5ZM4 8.5H12V7.5H4V8.5ZM4 14.5H12V13.5H4V14.5ZM0.5 11C0.5 12.933 2.067 14.5 4 14.5V13.5C2.61929 13.5 1.5 12.3807 1.5 11H0.5ZM12 8.5C13.933 8.5 15.5 6.933 15.5 5H14.5C14.5 6.38071 13.3807 7.5 12 7.5V8.5ZM4 7.5C2.067 7.5 0.5 9.067 0.5 11H1.5C1.5 9.61929 2.61929 8.5 4 8.5V7.5ZM12 2.5C13.3807 2.5 14.5 3.61929 14.5 5H15.5C15.5 3.067 13.933 1.5 12 1.5V2.5ZM0.5 2C0.5 3.10457 1.39543 4 2.5 4V3C1.94772 3 1.5 2.55228 1.5 2H0.5ZM2.5 4C3.60457 4 4.5 3.10457 4.5 2H3.5C3.5 2.55228 3.05228 3 2.5 3V4ZM4.5 2C4.5 0.89543 3.60457 0 2.5 0V1C3.05228 1 3.5 1.44772 3.5 2H4.5ZM2.5 0C1.39543 0 0.5 0.89543 0.5 2H1.5C1.5 1.44772 1.94772 1 2.5 1V0ZM11.5 14C11.5 15.1046 12.3954 16 13.5 16V15C12.9477 15 12.5 14.5523 12.5 14H11.5ZM13.5 16C14.6046 16 15.5 15.1046 15.5 14H14.5C14.5 14.5523 14.0523 15 13.5 15V16ZM15.5 14C15.5 12.8954 14.6046 12 13.5 12V13C14.0523 13 14.5 13.4477 14.5 14H15.5ZM13.5 12C12.3954 12 11.5 12.8954 11.5 14H12.5C12.5 13.4477 12.9477 13 13.5 13V12Z"
        fill={fill}
      />
    </Svg>
  );
};

export default IconMiscellaneous;
