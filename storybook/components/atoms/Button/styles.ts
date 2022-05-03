import { colors } from '../../../branding/colors';

/**
 * Button Types
 */
export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'accent';

/**
 * Colour scheme for a Button
 *
 * @attribute borderColor: border colour
 * @attribute backgroundColor: background colour
 * @attribute color: text colour
 */
type ButtonColorStyle = {
  borderColor: string;
  backgroundColor: string;
  color: string;
};

/**
 * Colour scheme mapping for a Button by type
 *
 * @attribute btnType: primary | secondary | tertiary
 * @attribute colorStyle: ButtonColorStyle
 */
type ButtonColorStyleMapping = {
  [btnType in ButtonType]: ButtonColorStyle;
};

export const buttonColorStyles: ButtonColorStyleMapping = {
  accent: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
    color: colors.white,
  },
  primary: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
    color: colors.white,
  },
  secondary: {
    backgroundColor: colors.transparent,
    borderColor: colors.brand,
    color: colors.brand,
  },
  tertiary: {
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
    color: colors.brand,
  },
};

export const buttonDisabledColorStyles: ButtonColorStyleMapping = {
  accent: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
    color: colors.white,
  },
  primary: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
    color: colors.white,
  },
  secondary: {
    backgroundColor: colors.transparent,
    borderColor: colors.disabled,
    color: colors.disabled,
  },
  tertiary: {
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
    color: colors.disabled,
  },
};
