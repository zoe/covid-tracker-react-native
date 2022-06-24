export type TIconDimensionConfig = {
  width?: number;
  height?: number;
  maxDimension?: number;
  maxHeight?: number;
  maxWidth?: number;
};

export function withDimensions(config: TIconDimensionConfig, defaultWidth: number, defaultHeight: number) {
  let width = config.width || defaultWidth * (config.height / defaultHeight);
  let height = config.height || defaultHeight * (config.width / defaultWidth);

  if (config.maxDimension) {
    const ratio = Math.max(width, height) / config.maxDimension;
    if (ratio > 1) {
      width /= ratio;
      height /= ratio;
    }
  }
  if (config.maxHeight && height > config.maxHeight) {
    width /= height / config.maxHeight;
    height = config.maxHeight;
  }
  if (config.maxWidth && width > config.maxWidth) {
    height /= width / config.maxWidth;
    width = config.maxWidth;
  }

  return {
    height,
    width,
  };
}
