import { View } from 'react-native';

import styled from '@covid/themes/styled-components';

interface IProps {
  children?: React.ReactNode;
}

export default styled(View)<IProps>`
  ${(props) => `
    background-color: #f5f9fc;
    border-radius: ${props.theme.grid.l}px;
    padding: ${props.theme.grid.xxl}px;
  `}
`;
