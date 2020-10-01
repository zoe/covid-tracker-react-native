export function ArrayDistinctBy<T, K>(arr: T[], keySelector: (selector: T) => K): T[] {
  const set = new Set<K>();
  const newArr = new Array<T>();

  arr.forEach((item) => {
    const key = keySelector(item);
    if (!set.has(key)) {
      set.add(key);
      newArr.push(item);
    }
  });
  return newArr;
}

export const naturalCompare = require('string-natural-compare');
