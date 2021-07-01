import { TColorPalette, TColorShade } from '@covid/themes';
import { Image, View } from 'react-native';
import styled from 'styled-components/native';

export interface IContainerViewProps {
  height: number;
  top: number;
  bottom: number;
  width: number;
}

export const SContainerView = styled(View)<IContainerViewProps>`
  ${(props) => `
    align-items: center;
    height: ${props.height}px;
    left: 0;
    padding: ${props.top ? props.top : props.theme.grid.l}px 16px ${props.bottom ? props.bottom : props.theme.grid.s}px;
    position: absolute;
    top: 0;
    width: ${props.width}px;
  `}
`;

export const SCloseContainerView = styled(View)`
  ${(props) => `
    width: 100%;
    z-index: 5;
  `}
`;

export const SContentView = styled(View)`
  flex: 1;
  justify-content: center;
  width: 100%;
`;

export const SInnerContentView = styled(View)`
  padding: 4px;
`;

export const SButtonView = styled(View)`
  ${(props) => `
    margin-bottom: ${props.theme.grid.xl}px;
    width: 100%;
  `}
`;

export const SShareContainerView = styled(View)`
  ${(props) => `
    background-color: white;
    border-top-left-radius: ${props.theme.grid.l}px;
    border-top-right-radius: ${props.theme.grid.l}px;
    width: 100%;
  `}
`;

export interface ITrendViewProps {
  height: number;
}

export const STrendlineContainer = styled(View)<ITrendViewProps>`
  ${(props) => `
    height: ${props.height}px;
  `}
`;

export interface IShareLabelProps {
  colorPalette: TColorPalette;
  colorShade: TColorShade;
}

export const SShareLabelView = styled(View)<IShareLabelProps>`
  ${(props) => `
    background-color: ${props.theme.colors[props.colorPalette][props.colorShade].bgColor};
    border-bottom-left-radius: ${props.theme.grid.l}px;
    border-bottom-right-radius: ${props.theme.grid.l}px;
    padding: ${props.theme.grid.xl}px ${props.theme.grid.l}px;
    width: 100%;
  `}
`;

export const SRowView = styled(View)`
  ${(props) => `
    flex-direction: row;
  `}
`;

export const STextContainer = styled(View)`
  ${(props) => `
    flex: 1;
    padding-right: 16px;
  `}
`;

export const SLogoContainer = styled(View)`
  ${(props) => `
    align-items: center;
  `}
`;

export const SImageContainer = styled(View)`
  ${(props) => `
    align-items: center;
    background-color: #082A5D; 
    border-radius: ${props.theme.grid.s}px;
    justify-content: center;
    height: 56px;
    margin-bottom: ${props.theme.grid.l}px;
    padding: ${props.theme.grid.xs}px;
    width: 56px;
  `}
`;

export const SImage = styled(Image)`
  ${(props) => `
    width: 100%;
    height: 100%;
    resize-mode: contain;
  `}
`;
