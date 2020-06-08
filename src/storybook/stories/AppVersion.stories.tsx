import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { ApplicationVersion } from '@covid/components/AppVersion';

storiesOf('ApplicationVersion', module).add('default view', () => <ApplicationVersion />);
