import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { CoralBadge } from '@covid/components/Badge';

storiesOf('CoralBadge', module)
  .add('default view', () => <CoralBadge>This is a badge</CoralBadge>)
  .add('no text', () => <CoralBadge>{}</CoralBadge>);
