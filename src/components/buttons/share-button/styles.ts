import styled from '@covid/themes/styled-components';
import { TouchableOpacity, View } from 'react-native';

export const SContainerView = styled(TouchableOpacity)`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: ${(props) => props.theme.grid.xxl}px 0;
`;

export const SIconContainerView = styled(View)`
  margin-right: ${(props) => props.theme.grid.s}px;
`;
