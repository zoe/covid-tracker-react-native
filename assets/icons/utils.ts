export type TIconDimensionConfig = {
  width?: number;
  height?: number;
  maxDimension?: number;
  maxHeight?: number;
  maxWidth?: number;
};

export function determineDimensions(config: TIconDimensionConfig, defaultWidth: number, defaultHeight: number) {
  let width = defaultWidth;
  let height = defaultHeight;

  if (config.width && config.height) {
    width = config.width;
    height = config.height;
  } else if (config.width) {
    width = config.width;
    height = defaultHeight * (config.width / defaultWidth);
  } else if (config.height) {
    width = defaultWidth * (config.height / defaultHeight);
    height = config.height;
  }

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
