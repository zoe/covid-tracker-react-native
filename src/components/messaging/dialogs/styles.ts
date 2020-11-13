import { View } from 'react-native';

import styled from '@covid/themes/styled-components';
import { TColorPalette, TColorShade } from '@covid/themes';

export interface IContainerViewProps {
  height: number;
  width: number;
}

export const SContainerView = styled(View)<IContainerViewProps>`
  ${(props) => `
    align-items: center;
    background-color: rgba(0,0,0,0.3);
    height: ${props.height};
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: ${props.width};
  `}
`;

export const SMessageWindowView = styled(View)`
  ${(props) => `
    align-items: center;
    background-color: white;
    border-radius: ${props.theme.grid.l}px;
    padding: 16px;
    width: 50%;
  `}
`;
