import { TouchableOpacity, View } from 'react-native';

import styled from '@covid/themes/styled-components';

import { Text } from '../../typography';

export const SContainerView = styled(TouchableOpacity)`
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export const SIconContainerView = styled(View)`
  margin-right: ${(props) => props.theme.grid.s}px;
`;
