import React from 'react';
import renderer from 'react-test-renderer';

import { AlcoholUnitInfo } from '../AlcoholUnitInfo';

describe('AlcoholUnitInfo tests', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AlcoholUnitInfo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
