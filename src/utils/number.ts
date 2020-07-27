export const cleanIntegerVal = (intString: string) => {
  return parseInt(intString.replace(/ /g, ''), 10);
};

export const cleanFloatVal = (floatString: string) => {
  return parseFloat(floatString.replace(/ /g, ''));
};

export const stripAndRound = (str: string): number => {
  return Math.round(parseFloat(str.replace(/,/g, '')));
};
