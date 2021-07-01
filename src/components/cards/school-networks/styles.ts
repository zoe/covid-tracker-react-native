import { Text } from '@covid/components/typography';
import { View } from 'react-native';
import styled from 'styled-components/native';

export const SContainerView = styled(View)`
  ${(props) => `
    background-color: white;
    border-radius: ${props.theme.grid.m}px;
    padding: ${props.theme.grid.xxl}px ${props.theme.grid.xxl}px 0 ${props.theme.grid.xxl}px;
  `}
`;

export const STitleText = styled(Text)`
  ${(props) => `
    margin-bottom: ${props.theme.grid.xxl}px;
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
    border-color: ${props.theme.colors.ui.dark.bgColor};
    border-bottom-width: ${props.isLast ? 0 : 1}px;
    margin-bottom: ${props.isLast ? 0 : props.theme.grid.xxl}px;
    padding-bottom: ${props.isLast ? 0 : props.theme.grid.xxl}px;
  `}
`;

export const SHealthStatus = styled(View)`
  ${(props) => `
    align-items: center;
    flex-direction: row;
  `}
`;

export const SHealthStatusText = styled(Text)`
  ${(props) => `
    margin-left: ${props.theme.grid.s}px;
  `}
`;
