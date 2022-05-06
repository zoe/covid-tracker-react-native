import { colors } from './colors';
import { fonts } from './fonts';
import { grid } from './grid';

export type TBranding = {
  colors: typeof colors;
  sizes: typeof grid;
  text: typeof fonts;
};

const branding: TBranding = {
  colors,
  sizes: grid,
  text: fonts,
};

export default branding;
