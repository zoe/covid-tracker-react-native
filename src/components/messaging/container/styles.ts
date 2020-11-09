import { View } from 'react-native';

import styled from '@covid/themes/styled-components';

interface SProps {
  active: boolean;
  height: number;
  width: number;
}

export const SContainerView = styled(View)<SProps>`
  ${(props) => `
    backgroundColor: ${props.active ? 'rgba(0,0,0,0.8)' : null};
    height: ${props.height}px;
    flex: 1;
    position: absolute;
    top: ${props.active ? 0 : `${props.height}px`};
    left: 0;
    width: ${props.width}px;
    z-index: 1
  `}
`;
