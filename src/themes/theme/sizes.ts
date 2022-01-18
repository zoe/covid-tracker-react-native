import { TGrid } from '@covid/themes/types/sizes';

/* eslint-disable sort-keys-fix/sort-keys-fix */
const grid: TGrid = {
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};
/* eslint-enable sort-keys-fix/sort-keys-fix */

export const sizes = {
  ...grid,
  border: 1,
  buttonHeight: 56,
  drawerToggle: 20,
  headerCompactHeight: 90,
  headerExpandedHeight: 328,
  maxScreenWidth: 600,
  screenHorizontalPadding: grid.l,
  screenVerticalPadding: grid.l,
  tabIconOverlay: 80,
};
