import { View } from 'react-native';

import styled from '@covid/themes/styled-components';
// import { TColorPalette, TColorShade } from '@covid/themes';

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
    background-color: white;
    border-radius: ${props.theme.grid.l}px;
    padding: ${props.theme.grid.xl}px ${props.theme.grid.l}px;
    width: 62%;
  `}
`;

export const STitleView = styled(View)`
  align-items: center;
`;
