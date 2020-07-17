import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action, HandlerFunction } from '@storybook/addon-actions';

import { VaccineRegistryInvite } from '@covid/components/Cards/VaccineRegistryInvite';

const Handler = (): HandlerFunction => action('share-button-on-pressed');

storiesOf('VaccineRegistryInvite', module).add('default view', () => <VaccineRegistryInvite onSharePress={Handler()} />);
