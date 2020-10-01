const naturalCompare = require('string-natural-compare');

const unsorted = [{ name: 'Y10' }, { name: 'Y11' }, { name: 'Y8' }, { name: 'Y6' }];

const sorted = [{ name: 'Y6' }, { name: 'Y8' }, { name: 'Y10' }, { name: 'Y11' }];

describe('alphanumeric-sort', () => {
  it('should sort correctly', () => {
    const finial = unsorted.sort((a, b) => naturalCompare(a.name, b.name));
    expect(finial).toEqual(sorted);
  });
});
