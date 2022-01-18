import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Circle, G, Mask, Path } from 'react-native-svg';

type TProps = {
  style?: StyleProp<ViewStyle>;
};

export const IllustrationHabitsBehaviours: React.FC<TProps> = (props: TProps) => (
  <Svg fill="none" height={75} style={props.style} viewBox="0 0 75 75" width={75}>
    <Mask
      height={75}
      id="a"
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}
      width={75}
      x={0}
      y={0}
    >
      <Circle cx={37.5} cy={37.5} fill="#C4C4C4" r={37} stroke="#94B7D8" />
    </Mask>
    <G mask="url(#a)">
      <Circle cx={37.5} cy={37.5} fill="#E9EEF3" r={36.75} stroke="#94B7D8" strokeWidth={1.5} />
      <Path
        d="M46.036 36.523c11.38 0 20.605-9.225 20.605-20.605S57.416-4.687 46.036-4.687 25.431 4.537 25.431 15.918s9.225 20.605 20.605 20.605Z"
        fill="#E3EEF9"
        stroke="#94B7D8"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={0.58}
      />
      <Path
        d="M59.134 17.31c-4.293 4.294-11.326 4.294-15.62 0-4.383-4.383-4.383-11.325 0-15.71.092-.09.092-.09.183-.182A13.425 13.425 0 0 0 37.03 5.07c-5.206 5.207-5.206 13.701 0 18.907 5.206 5.207 13.7 5.207 18.907 0 2.01-2.009 3.197-4.475 3.653-7.124a1.101 1.101 0 0 0-.456.457Z"
        fill="#A54D99"
        stroke="#3B5075"
        strokeLinejoin="round"
        strokeWidth={0.87}
      />
      <Path
        d="M57.855 8.268c-.183-1.37-1.279-2.375-2.649-2.375-1.096 0-2.1.731-2.466 1.736-.365-.274-.822-.365-1.279-.365-1.187 0-2.1.913-2.283 2.009-1.096 0-1.827.913-1.827 1.918 0 1.096.913 2.01 1.918 2.01h7.855a2.456 2.456 0 0 0 2.466-2.467c.092-1.187-.639-2.192-1.735-2.466Z"
        fill="#DDE7F1"
        stroke="#96B9DA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={0.87}
      />
      <Path
        d="M46.2 41.2c12.758 0 23.1-10.342 23.1-23.1C69.3 5.342 58.958-5 46.2-5 33.442-5 23.1 5.342 23.1 18.1c0 12.758 10.342 23.1 23.1 23.1Z"
        fill="#fff"
        stroke="#94B7D8"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={0.856}
      />
      <Path
        d="M60.883 19.662c-4.813 4.812-12.697 4.812-17.51 0-4.915-4.915-4.915-12.698 0-17.613l.205-.205a15.05 15.05 0 0 0-7.475 4.096c-5.837 5.837-5.837 15.36 0 21.197 5.837 5.836 15.36 5.836 21.196 0 2.253-2.253 3.584-5.018 4.096-7.987-.205.102-.41.307-.512.512Z"
        fill="#D4A9CE"
        stroke="#A54D99"
        strokeLinejoin="round"
        strokeWidth={1.283}
      />
      <Path
        d="M59.45 9.524c-.205-1.536-1.434-2.662-2.97-2.662-1.229 0-2.355.819-2.765 1.945-.41-.307-.921-.41-1.433-.41-1.331 0-2.355 1.025-2.56 2.253-1.229 0-2.048 1.024-2.048 2.15 0 1.23 1.024 2.254 2.15 2.254h8.806a2.753 2.753 0 0 0 2.765-2.765c.102-1.331-.717-2.458-1.945-2.765Z"
        fill="#DDE7F1"
        stroke="#96B9DA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.283}
      />
      <Path
        d="M54.755 75c12.758 0 23.1-10.342 23.1-23.1 0-12.758-10.342-23.1-23.1-23.1-12.757 0-23.1 10.342-23.1 23.1 0 12.758 10.343 23.1 23.1 23.1Z"
        fill="#fff"
        stroke="#94B7D8"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={0.856}
      />
      <Path
        d="M43.474 50.708a4.118 4.118 0 1 0 0-8.237 4.118 4.118 0 0 0 0 8.237Z"
        fill="#DDE7F1"
        stroke="#96B9DA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.283}
      />
      <Path
        d="m43.857 43.237.862-3.064"
        stroke="#96B9DA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.283}
      />
      <Path
        d="M43.378 40.269c.766.766.67 2.106.67 2.106s-1.34.096-2.107-.67c-.766-.766-.67-2.107-.67-2.107s1.34-.096 2.107.67Z"
        fill="#DDE7F1"
        stroke="#96B9DA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.283}
      />
      <Path
        d="M56.307 34.168c-.472 0-.91.183-1.245.481a1.874 1.874 0 0 0-1.245-.481c-.512 0-.98.184-1.333.488a1.874 1.874 0 0 0-1.253-.488 1.91 1.91 0 0 0-1.887 1.887v9.577c0 1.66 1.115 3.055 2.682 3.425v19.656c0 1.024.766 1.79 1.791 1.79s1.79-.766 1.79-1.79V49.057c1.568-.37 2.682-1.765 2.682-3.425v-9.623l-.006-.045c-.133-.935-.936-1.796-1.976-1.796ZM61.325 38.535l-.002.008v.007c-.144 1-.717 4.656-1.256 8.071l-.723 4.565-.232 1.46-.064.404-.017.107-.004.027-.001.007v.001l.633.102-.634-.101-.05.317.223.23 2.693 2.782v12.19c0 .957.7 1.888 1.79 1.888.956 0 1.887-.701 1.887-1.791V35.48c0-.637-.418-1.104-.906-1.267-.485-.162-1.11-.032-1.43.543a17.102 17.102 0 0 0-1.143 1.768c-.35.638-.652 1.334-.764 2.011Z"
        fill="#D4A9CE"
        stroke="#A54D99"
        strokeWidth={1.283}
      />
      <Path
        d="M52.476 42.361v-7.183c0-.67.575-1.245 1.245-1.245.67 0 1.245.575 1.245 1.245v7.183"
        stroke="#A44D98"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.283}
      />
      <Path
        d="M19.1 67.3c12.758 0 23.1-10.342 23.1-23.1 0-12.758-10.342-23.1-23.1-23.1C6.342 21.1-4 31.442-4 44.2c0 12.758 10.342 23.1 23.1 23.1Z"
        fill="#fff"
        stroke="#94B7D8"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={0.856}
      />
      <Path
        d="M25.299 60.908V41.803c0-5.953-4.704-10.85-10.56-10.85-5.761 0-10.37 4.705-10.561 10.561 0 .192-.096.385-.096.577l-1.92 3.744c-.48.768.095 1.728 1.055 1.728a1.27 1.27 0 0 1 1.249 1.248v4.224c0 1.344 1.152 2.496 2.496 2.496h4.032c1.248 0 2.304 1.153 2.208 2.4l-.096 1.633-.096 1.92-.096 1.728"
        stroke="#96B9DA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.283}
      />
      <Path
        d="M33.843 30.57c-2.112-2.112-5.472-2.304-7.872-.384l-1.44 1.152-1.44-1.152c-2.304-1.92-5.76-1.728-7.873.384-2.016 2.016-2.016 5.376 0 7.488l9.313 9.313 9.313-9.313c2.016-2.112 2.016-5.472 0-7.488Z"
        fill="#D4A9CE"
        stroke="#A54D99"
        strokeLinejoin="round"
        strokeWidth={1.283}
      />
      <Path
        d="M12.626 42.763c-.48.768-1.344 1.344-2.304 1.344-1.152 0-2.112-.768-2.496-1.728"
        stroke="#96B9DA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.283}
      />
      <Circle cx={37.5} cy={37.5} r={36.75} stroke="#94B7D8" strokeWidth={1.5} />
    </G>
  </Svg>
);
