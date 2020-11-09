import { Animated, Text, TouchableOpacity, View } from 'react-native';

import styled from '@covid/themes/styled-components';
import { TColorPalette, TColorShade } from '@covid/themes';

export type TVariant = 'top' | 'bottom';

interface IContainerProps {
  variant: TVariant;
}

export const SContainerView = styled(Animated.View)<IContainerProps>`
  ${(props) => `
    padding: ${props.theme.grid.gutter}px;
    position: absolute;
    ${props.variant}: 0;
    width: 100%;
  `}
`;

interface ICardViewProps {
  colorPalette: TColorPalette;
  colorShade: TColorShade;
}

export const SCardView = styled(View)<ICardViewProps>`
  ${(props) => `
    align-items: center;
    background-color: ${props.theme.colors[props.colorPalette][props.colorShade].bgColor};
    border-radius: ${props.theme.grid.xs}px;
    flex-direction: row;
    padding: ${props.theme.grid.gutter}px;
  `}
`;

interface IMessageTextProps {
  colorPalette: TColorPalette;
  colorShade: TColorShade;
}

export const SMessageText = styled(Text)<IMessageTextProps>`
  ${(props) => `
    color: ${props.theme.colors[props.colorPalette][props.colorShade].fgColor};
    flex: 1;
  `}
`;

// export const STouchableOpactity = styled(TouchableOpacity)`
//   border-color: white;
//   border-width: 0;
//   border-left-width: 1px;
//   padding-horizontal: ${(props: { theme: IThemeVars }) => props.theme.spacing}px;
//   margin-left: ${(props: { theme: IThemeVars }) => props.theme.spacing}px;
// `;

// export const SActionText = styled(Text)`
//   color: ${(props: { textColor: string }) => props.textColor};
//   text-transform: ${(props: { theme: IThemeVars }) => props.theme.typography.body.button.textTransform};
//   letter-spacing: ${(props: { theme: IThemeVars }) => props.theme.typography.body.button.letterSpacing};
//   font-weight: ${(props: { theme: IThemeVars }) => props.theme.typography.body.button.fontWeight};
// `;
