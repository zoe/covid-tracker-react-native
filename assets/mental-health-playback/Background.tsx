import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export default function Background(props: SvgProps) {
  return (
    <Svg
      fill="none"
      height={props.height === undefined ? 300 : props.height}
      preserveAspectRatio={props.preserveAspectRatio}
      viewBox="0 0 375 300"
      width={props.width === undefined ? 375 : props.width}
    >
      <Path
        d="M375 148.575s-70.08 25.008-190.49 37.413C64.1 198.394 0 300 0 300v-98.605s33.27-73.116 183.66-117.262S375 0 375 0v148.575z"
        fill="#F5F9FC"
      />
    </Svg>
  );
}
