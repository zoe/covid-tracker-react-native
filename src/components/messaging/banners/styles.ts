import { Animated, View } from 'react-native';

import styled from '@covid/themes/styled-components';

export interface IContainerViewProps {
  top: number;
  width: number;
}

export const SContainerView = styled(Animated.View)<IContainerViewProps>`
  ${(props) => `
    background-color: white;
    left: 0;
    padding: ${props.top + props.theme.grid.l}px ${props.theme.grid.l}px ${props.theme.grid.l}px;
    position: absolute;
    top: 0;
    width: ${props.width};
  `}
`;

export const SButtonRowView = styled(View)`
  ${(props) => `
    flex-direction: row;
    justify-content: flex-end;
  `};
`;
