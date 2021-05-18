import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export default function Background(props: SvgProps) {
  return (
    <Svg
      width={375}
      height={props.height === undefined ? 300 : props.height}
      viewBox="0 0 375 300"
      fill="none"
      preserveAspectRatio={props.preserveAspectRatio}>
      <Path
        d="M375 148.575s-70.08 25.008-190.49 37.413C64.1 198.394 0 300 0 300v-98.605s33.27-73.116 183.66-117.262S375 0 375 0v148.575z"
        fill="#F5F9FC"
      />
    </Svg>
  );
}
