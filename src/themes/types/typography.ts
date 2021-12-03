// @todo: Replace this
export type TTypeSizes = 2 | 4 | 8 | 10 | 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 40 | 48 | 56 | 64 | 72 | 80;

export type TFontStyle = 'normal' | 'italic';

export type TTtextDecorationLine = 'none' | 'underline' | 'line-through' | 'underline line-through';

export type TFontFamily =
  | 'SofiaPro-Black'
  | 'SofiaPro-Bold'
  | 'SofiaPro-ExtraLight'
  | 'SofiaPro-Light'
  | 'SofiaPro-Medium'
  | 'SofiaPro-SemiBold'
  | 'SofiaPro-UltraLight'
  | 'SofiaProRegular';

export type TTextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';

export type TText = {
  fontFamily: TFontFamily;
  fontSize: TTypeSizes;
  fontStyle: TFontStyle;
  lineHeight: number;
  letterSpacing: number;
  textAlign: TTextAlign;
  textDecorationLine: TTtextDecorationLine;
};

export type TTextStyles = {
  h0: TText;
  //
  h1: TText;
  h1Regular: TText;
  //
  h2: TText;
  h2Light: TText;
  //
  h3: TText;
  h3Bold: TText;
  h3Light: TText;
  h3Regular: TText;
  //
  h4: TText;
  h4Light: TText;
  h4Medium: TText;
  //
  h5: TText;
  h5Light: TText;
  h5Medium: TText;
  h5Regular: TText;
  //
  h6: TText;
  h6Light: TText;
  h6Medium: TText;
  h6Regular: TText;
  //
  p: TText;
  pBold: TText;
  pLight: TText;
  pMedium: TText;
  pSmall: TText;
  pSmallMedium: TText;
  pXSmall: TText;
  pXSmallMedium: TText;
  pSmallBold: TText;
  pSmallLight: TText;
  //
  label: TText;
  labelMedium: TText;
  //
  button: TText;
  default: TText;
  tag: TText;
};

export type TTextClass = keyof TTextStyles;
