import React from 'react';
import { View } from 'react-native';

import { TGridSizes } from '@covid/themes';

interface IProps {
  space?: TGridSizes;
}

function Spacer({ space = 8 }: IProps) {
  return <View style={{ height: space, width: space }} />;
}

export default Spacer;
