export type TGridSizes = 0 | 1 | 2 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 48;

export interface IGrid {
  xxxs: TGridSizes; // 1
  xxs: TGridSizes; //  2
  xs: TGridSizes; //   4
  s: TGridSizes; //    8
  m: TGridSizes; //    12
  l: TGridSizes; //    16
  xl: TGridSizes; //   20
  xxl: TGridSizes; //  24
  xxxl: TGridSizes; // 32
  xxxxl: TGridSizes; // 48
  // common elements
  gutter: TGridSizes;
  rhythm: TGridSizes;
}

export type TGrid = keyof IGrid;
