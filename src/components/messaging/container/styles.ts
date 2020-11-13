import { View } from 'react-native';

import styled from '@covid/themes/styled-components';

interface SProps {
  width: number;
}

export const SContainerView = styled(View)<SProps>`
  ${(props) => `
    height: 0;
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: ${props.width}px;
    z-index: 1
  `}
`;
