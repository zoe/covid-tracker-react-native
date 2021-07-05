import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

export default function IllustrationSignup(props: IProps) {
  return (
    <Svg fill="none" height={72} style={props.style} viewBox="0 0 223 72" width={223}>
      <Path d="M185.105 41.873l-11.824 10.423 5.132-14.608 6.692 4.185z" fill="#0165B5" />
      <Path d="M150.104 19.945l51.781 32.447 20.178-47.39-71.959 14.943z" fill="#67A3D3" />
      <Path d="M167.863 31.076l5.419 21.22 5.132-14.608 43.649-32.686-54.2 26.074z" fill="#CCE0F0" />
      <G clipPath="url(#prefix__clip0)" stroke="#CCE0F0" strokeLinecap="round" strokeMiterlimit={10}>
        <Path d="M178.173 35.326c-.459.54-.929 1.06-1.411 1.58" />
        <Path
          d="M173.674 39.865c-11.304 10.09-27.703 15.57-43.988 16.59-18.591 1.16-37.148-2.9-54.626-8.55-17.478-5.65-34.428-13-52.366-17.79-20.048-5.38-38.089-4.62-58.103-2.58"
          strokeDasharray="4.03 4.03"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M0 0h195v72H0z" fill="#fff" transform="translate(.938)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
