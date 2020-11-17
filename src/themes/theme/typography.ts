import { ITextClass, TText, TFontFamily, TTypeSizes } from '../types/typography';

const getTextProperties = (
  fontSize: TTypeSizes,
  lineHeight: TTypeSizes,
  fontFamily: TFontFamily = 'SofiaProRegular'
): TText => {
  return {
    fontFamily,
    fontSize,
    fontStyle: 'normal',
    lineHeight,
    letterSpacing: 0,
    textAlign: 'left',
    textDecorationLine: 'none',
  };
};

export const text: ITextClass = {
  h1: getTextProperties(32, 48, 'SofiaPro-SemiBold'),
  h1Light: getTextProperties(32, 48, 'SofiaPro-Light'),
  h1Medium: getTextProperties(32, 48, 'SofiaPro-Medium'),
  //
  h2: getTextProperties(28, 40, 'SofiaPro-SemiBold'),
  h2Light: getTextProperties(28, 40, 'SofiaPro-Light'),
  h2Medium: getTextProperties(28, 40, 'SofiaPro-Medium'),
  //
  h3: getTextProperties(24, 32, 'SofiaPro-SemiBold'),
  h3Light: getTextProperties(24, 32, 'SofiaPro-Light'),
  h3Medium: getTextProperties(24, 32, 'SofiaPro-Medium'),
  //
  h4: getTextProperties(20, 24, 'SofiaPro-SemiBold'),
  h4Light: getTextProperties(20, 24, 'SofiaPro-Light'),
  h4Medium: getTextProperties(20, 24, 'SofiaPro-Medium'),
  //
  h5: getTextProperties(16, 24, 'SofiaPro-SemiBold'),
  h5Light: getTextProperties(16, 24, 'SofiaPro-Light'),
  h5Medium: getTextProperties(16, 24, 'SofiaPro-Medium'),
  //
  h6: getTextProperties(12, 16, 'SofiaPro-SemiBold'),
  h6Light: getTextProperties(12, 16, 'SofiaPro-Light'),
  h6Medium: getTextProperties(12, 16, 'SofiaPro-Medium'),
  //
  p: getTextProperties(16, 24),
  pBold: getTextProperties(16, 24, 'SofiaPro-SemiBold'),
  pLight: getTextProperties(16, 24, 'SofiaPro-Light'),
  //
  default: getTextProperties(16, 24),
  button: {
    fontFamily: 'SofiaPro-Bold',
    fontSize: 16,
    fontStyle: 'normal',
    lineHeight: 16,
    letterSpacing: 1,
    textAlign: 'center',
    textDecorationLine: 'none',
  },
};
