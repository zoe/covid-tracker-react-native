import { storiesOf } from '@storybook/react-native';
import React from 'react';

import Dot from '../../components/atoms/Dot';
import { CenterView } from '../CenterView';

storiesOf('Atoms/Dot', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('index', () => <Dot />)
  .add('active', () => <Dot active />);
