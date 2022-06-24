export type IconDimensionProps = {
  width?: number;
  height?: number;
  maxDimension?: number;
  maxHeight?: number;
  maxWidth?: number;
};

export interface IconDiseaseProps extends IconDimensionProps {
  fill?: string;
  strokeColor?: string;
  color?: string;
}
