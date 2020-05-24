import { parse } from 'querystring';

export const cleanIntegerVal = (intString: string) => {
  return parseInt(intString.replace(/ /g, ''), 10);
};

export const cleanFloatVal = (floatString: string) => {
  return parseFloat(floatString.replace(/ /g, ''));
};
