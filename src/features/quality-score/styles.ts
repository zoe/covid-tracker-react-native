import { View } from 'react-native';

import styled from '@covid/themes/styled-components';
// import { TColorPalette, TColorShade, TGridSizes } from '@covid/themes';

export const SContainerView = styled(View)`
  ${(props) => `
    background-color: white;
    border-radius: ${props.theme.grid.l}px;
    padding: ${props.theme.grid.l}px;
  `}
`;

export const SScoreContainerView = styled(View)`
  ${(props) => `
    padding: ${props.theme.grid.l}px 0;
  `}
`;

export const SScoreRangeContainerView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

interface IScoreRangeViewProps {}

export const SScoreRangeView = styled(View)``;
