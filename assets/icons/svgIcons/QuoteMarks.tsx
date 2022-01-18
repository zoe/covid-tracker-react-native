import { IIconProps } from '@assets/icons/svgIcons/types';
import { determineDimensions } from '@assets/icons/utils';
import { colors } from '@covid/themes';
import * as React from 'react';
import { G, Path, Svg } from 'react-native-svg';

const defaultWidth = 24;
const defaultHeight = 22;

export default function QuoteMarks({ color = colors.accentBlue.main.bgColor, ...props }: IIconProps) {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} viewBox="0 0 24 22" width={width}>
      <G
        fill="none"
        fillRule="evenodd"
        id="Page-1"
        stroke="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <G id="Group" stroke={color} transform="translate(0.000000, 1.000000)">
          <Path
            d="M8.32245 1.64062C7.64571 2.56906 4.97161 5.88571 3.71331 7.61582C3.02791 8.5573 2.40655 9.4149 2.00846 9.96115C1.44768 10.7311 1.0219 11.6204 0.857474 12.5824C0.772665 13.0653 0.738048 13.5668 0.753626 14.0813C0.866128 17.6198 3.58177 20.5561 6.86857 20.6922C10.4963 20.8395 13.482 17.7148 13.482 13.839C13.482 10.1439 10.7681 7.12922 7.36878 6.98754C7.36878 6.98754 4.52852 6.885 2.6229 9.11288M12.3892 18.6634C13.4934 19.8566 14.994 20.6247 16.6366 20.6918C20.2644 20.8391 23.25 17.7145 23.25 13.8386C23.25 10.1435 20.5361 7.12885 17.1368 6.98716C17.1368 6.98716 14.2982 6.88649 12.3909 9.1125M18.0913 1.64062C17.4146 2.56906 14.7405 5.88571 13.4822 7.61582C13.1516 8.06885 12.8383 8.50137 12.5562 8.89102"
            id="Shape"
          />
        </G>
      </G>
    </Svg>
  );
}
