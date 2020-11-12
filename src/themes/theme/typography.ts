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
  h2: getTextProperties(28, 40, 'SofiaPro-SemiBold'),
  h3: getTextProperties(24, 32, 'SofiaPro-SemiBold'),
  h4: getTextProperties(20, 24, 'SofiaPro-SemiBold'),
  h5: getTextProperties(16, 24, 'SofiaPro-SemiBold'),
  h6: getTextProperties(12, 16, 'SofiaPro-SemiBold'),
  p: getTextProperties(16, 24),
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
