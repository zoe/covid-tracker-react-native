import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { CenterView, DarkBackground } from '@covid/storybook/decorator';
import { SchoolNetworks } from '@covid/components/Cards/SchoolNetworks';

storiesOf('SchoolNetworks', module)
  .addDecorator(CenterView)
  .addDecorator(DarkBackground)
  .add('default view', () => (
    <SchoolNetworks
      schoolGroups={[
        {
          id: '123',
          name: 'Test school',
          cases: 5,
          groups: [
            {
              id: '123',
              name: 'Class 2D',
              cases: 1,
            },
            {
              id: '1234',
              name: 'Class 3F',
              cases: 0,
            },
            {
              id: '12345',
              name: 'Class 8E',
              cases: null,
            },
          ],
        },
        {
          id: '1234',
          name: 'Test school 2',
          cases: 5,
          groups: [
            {
              id: '123',
              name: 'Group 1',
              cases: 1,
            },
          ],
        },
      ]}
    />
  ));
