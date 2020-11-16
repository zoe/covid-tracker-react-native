import { View } from 'react-native';

import styled from '@covid/themes/styled-components';

export interface IContainerViewProps {
  width: number;
}

export const SContainerView = styled(View)<IContainerViewProps>`
  ${(props) => `
    background-color: white;
    left: 0;
    position: absolute;
    top: 0;
    width: ${props.width};
  `}
`;
