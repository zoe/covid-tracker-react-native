import { View } from 'react-native';

import styled from '@covid/themes/styled-components';
import { TColorPalette, TColorShade, TGridSizes } from '@covid/themes';

import { Text } from '../../typography';

export const STitleText = styled(Text)`
  ${(props) => `
    margin-bottom: ${props.theme.grid.s}px;
    text-align: center;
  `}
`;

export const SSchoolNameText = styled(Text)`
  ${(props) => `
    margin-bottom: ${props.theme.grid.xxl}px;
    text-align: center;
  `}
`;

export const SBubbleNameText = styled(Text)`
  ${(props) => `
    margin-bottom: ${props.theme.grid.s}px;
  `}
`;

interface IStatsViewProps {
  isLast: boolean;
}

export const SStatsContainerView = styled(View)<IStatsViewProps>`
  ${(props) => `
    border-color: grey;
    border-bottom-width: ${props.isLast ? 0 : 1}px;
    margin-bottom: ${props.theme.grid.xxl}px;
    padding-bottom: ${props.theme.grid.m}px;
  `}
`;

export const SStatusView = styled(View)`
  ${(props) => `
    flex-direction: row;
  `}
`;
