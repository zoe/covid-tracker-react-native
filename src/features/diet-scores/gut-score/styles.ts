import { View } from 'react-native';

import styled from '@covid/themes/styled-components';

export const SContainerView = styled(View)`
  ${(props) => `
    background-color: white;
    border-radius: ${props.theme.grid.l}px;
    margin: ${props.theme.grid.s}px 0;
    padding: ${props.theme.grid.l}px;
  `}
`;
