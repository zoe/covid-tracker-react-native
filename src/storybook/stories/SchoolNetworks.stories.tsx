import { SchoolNetworks } from '@covid/components';
import { CenterView, DarkBackground } from '@covid/storybook/decorator';
import { storiesOf } from '@storybook/react-native';
import React from 'react';

storiesOf('SchoolNetworks', module)
  .addDecorator(CenterView)
  .addDecorator(DarkBackground)
  .add('default view', () => (
    <SchoolNetworks
      schoolGroups={[
        {
          cases: 5,
          groups: [
            {
              cases: 1,
              id: '123',
              name: 'Class 2D',
            },
            {
              cases: 0,
              id: '1234',
              name: 'Class 3F',
            },
            {
              cases: null,
              id: '12345',
              name: 'Class 8E',
            },
          ],
          id: '123',
          name: 'Test school',
        },
        {
          cases: 5,
          groups: [
            {
              cases: 1,
              id: '123',
              name: 'Group 1',
            },
          ],
          id: '1234',
          name: 'Test school 2',
        },
      ]}
    />
  ));
