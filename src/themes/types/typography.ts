export type TTypeSizes = 2 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 40 | 48 | 56 | 64 | 72 | 80;

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
  h1: TText;
  h2: TText;
  h3: TText;
  h4: TText;
  h5: TText;
  h6: TText;
  p: TText;
  default: TText;
  button: TText;
};

export type TTextClass = keyof ITextClass;
