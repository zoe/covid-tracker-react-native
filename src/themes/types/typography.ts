export type TTypeSizes = 2 | 4 | 8 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 40 | 48 | 56 | 64 | 72 | 80;

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

export type ITextClass = {
  h0: TText;
  h0Light: TText;
  h0Medium: TText;
  h0Regular: TText;
  //
  h1: TText;
  h1Light: TText;
  h1Medium: TText;
  h1Regular: TText;
  //
  h2: TText;
  h2Light: TText;
  h2Medium: TText;
  h2Regular: TText;
  //
  h3: TText;
  h3Light: TText;
  h3Medium: TText;
  h3Regular: TText;
  //
  h4: TText;
  h4Light: TText;
  h4Medium: TText;
  h4Regular: TText;
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
  pSmall: TText;
  pSmallBold: TText;
  pSmallLight: TText;
  default: TText;
  button: TText;
};

export type TTextClass = keyof ITextClass;
