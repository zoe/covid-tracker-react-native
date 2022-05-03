import { colors } from './colors';
import { fonts } from './fonts';
import { grid } from './grid';

export type TBranding = {
  colors: any;
  sizes: typeof grid;
  text: any;
};

const branding: TBranding = {
  colors,
  sizes: grid,
  text: fonts,
};

export default branding;
