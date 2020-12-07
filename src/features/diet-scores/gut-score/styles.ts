import { View } from 'react-native';

import styled from '@covid/themes/styled-components';

export const SContainerView = styled(View)`
  ${(props) => `
    background-color: white;
    border-radius: ${props.theme.grid.l}px;
    padding: ${props.theme.grid.l}px;
  `}
`;
