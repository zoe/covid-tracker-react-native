export type TGridSize = 0 | 4 | 8 | 12 | 16 | 24 | 32 | 48;

export type TGrid = {
  g2: 2;
  g4: 4;
  g8: 8;
  g12: 12;
  g16: 16;
  g24: 24;
  g32: 32;
  g48: 48;
};

/* eslint-disable sort-keys-fix/sort-keys-fix */
export const grid: TGrid = {
  g2: 2,
  g4: 4,
  g8: 8,
  g12: 12,
  g16: 16,
  g24: 24,
  g32: 32,
  g48: 48,
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
  screenHorizontalPadding: grid.g24,
  screenVerticalPadding: grid.g24,
  tabIconOverlay: 80,
};
