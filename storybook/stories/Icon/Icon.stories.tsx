import { storiesOf } from '@storybook/react-native';
import React from 'react';

import Icon, { IIconProps } from '../../components/molecules/Icon';
import { CenterView } from '../CenterView';

const componentProps: IIconProps = {
  iconName: 'Lightbulb',
};

storiesOf('Molecules/Icon', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('index', () => <Icon {...componentProps} />);
