import IconArrowLeft from '@assets/v2/svg/icon-arrow-left';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { grid } from '@tracer/branding/grid';
import IconButton from '@tracer/components/molecules/IconButton';
import ScreenBody from '@tracer/components/molecules/Screen/body';
import ScreenFooter from '@tracer/components/molecules/Screen/footer';
import ScreenHeader from '@tracer/components/molecules/Screen/header';
import ScreenNavigator from '@tracer/components/organisms/Screen/nav';
import React from 'react';
import { Text } from 'react-native';

import Screen from '../../components/atoms/Screen';
import { CenterView } from '../CenterView';

storiesOf('Atoms/Screen', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('index', () => (
    <Screen>
      <Text>{text('Screen text', 'Screen')}</Text>
    </Screen>
  ))
  .add('regular', () => (
    <Screen>
      <ScreenHeader>
        <Text style={{ padding: grid.g16 }}>{text('Screen header', 'Header')}</Text>
      </ScreenHeader>
      <ScreenBody>
        <Text style={{ padding: grid.g16 }}>{text('Screen body', 'Body')}</Text>
      </ScreenBody>
      <ScreenFooter>
        <Text style={{ padding: grid.g16 }}>{text('Screen footer', 'Footer')}</Text>
      </ScreenFooter>
    </Screen>
  ))
  .add('w/ nav header', () => (
    <Screen>
      <ScreenNavigator
        compact
        left={
          <IconButton buttonType="tertiary">
            <IconArrowLeft />
          </IconButton>
        }
        middle={<Text style={{ lineHeight: grid.g24, textAlign: 'center' }}>Header</Text>}
      />
      <ScreenBody>
        <Text style={{ padding: grid.g16 }}>{text('Screen body', 'Body')}</Text>
      </ScreenBody>
      <ScreenFooter>
        <Text style={{ padding: grid.g16 }}>{text('Screen footer', 'Footer')}</Text>
      </ScreenFooter>
    </Screen>
  ));
