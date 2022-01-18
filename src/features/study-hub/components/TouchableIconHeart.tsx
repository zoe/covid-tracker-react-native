import { determineDimensions, TIconDimensionConfig } from '@assets/icons/utils';
import * as React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type TProps = TouchableOpacityProps &
  TIconDimensionConfig & {
    full?: boolean;
  };

const HIT_SLOP = {
  bottom: 16,
  left: 16,
  right: 16,
  top: 16,
};

const defaultHeight = 24;
const defaultWidth = 24;

export const TouchableIconHeart = React.forwardRef<TouchableOpacity, TProps>((props, ref) => {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <TouchableOpacity {...props} hitSlop={HIT_SLOP} ref={ref}>
      <Svg fill="none" height={height} viewBox="0 0 24 24" width={width}>
        <Path
          clipRule="evenodd"
          d="M6.648 2.625C3.395 2.625.75 5.349.75 8.697c0 7.133 9.083 12.556 10.956 13.669a.573.573 0 00.588 0c1.875-1.11 10.956-6.518 10.956-13.67 0-3.347-2.646-6.071-5.9-6.071-3.732 0-5.35 3.413-5.35 3.413s-1.625-3.413-5.352-3.413z"
          fill={props.full ? '#A10056' : undefined}
          fillRule={props.full ? 'evenodd' : undefined}
          stroke="#A10056"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
      </Svg>
    </TouchableOpacity>
  );
});
