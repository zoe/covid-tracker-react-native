import { ITextClass, TText, TFontFamily, TTypeSizes } from '../types/typography';

const getTextProperties = (
  fontSize: TTypeSizes,
  lineHeight: number,
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
  h1: getTextProperties(48, 54, 'SofiaPro-Black'),
  h2: getTextProperties(40, 48, 'SofiaPro-Black'),
  h3: getTextProperties(32, 40, 'SofiaPro-Black'),
  h4: getTextProperties(24, 32, 'SofiaPro-Bold'),
  h5: getTextProperties(16, 24, 'SofiaPro-Bold'),
  h6: getTextProperties(12, 16, 'SofiaPro-Bold'),
  p: getTextProperties(16, 24, 'SofiaProRegular'),
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
