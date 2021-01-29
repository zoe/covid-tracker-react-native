import { View } from 'react-native';

import styled from '@covid/themes/styled-components';

export const SContainerView = styled(View)`
  ${(props) => `
    background-color: white;
    border-color: #EEEEEF;
    border-radius: ${props.theme.grid.l}px;
    border-width: 1px;
    margin: ${props.theme.grid.s}px 0;
    padding: ${props.theme.grid.l}px;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 3.84;
    elevation: 5;
  `}
`;
