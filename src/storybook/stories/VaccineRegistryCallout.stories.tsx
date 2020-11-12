import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { VaccineRegistryCallout } from '@covid/components/Cards/VaccineRegistryCallout';

storiesOf('VaccineRegistryInvite', module).add('default view', () => <VaccineRegistryCallout />);
