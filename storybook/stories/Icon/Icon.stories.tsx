import IconBoneJoints from '@assets/v2/icon-bones-joints';
import IconHeadFace from '@assets/v2/icon-head-and-face';
import IconSadFace from '@assets/v2/icon-sad-face';
import IconSkinNails from '@assets/v2/icon-skin-and-nails';
import IconSmileFace from '@assets/v2/icon-smile-face';
import IconStomachGutBladder from '@assets/v2/icon-stomach-gut-and-bladder';
import IconThoughtBubble from '@assets/v2/icon-thought-bubble';
import IconThroatChestLungs from '@assets/v2/icon-throat-chest-and-lungs';
import IconTiredFace from '@assets/v2/icon-tired-face';
import { optionsKnob } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React, { ReactNode } from 'react';
import { View } from 'react-native';

import Icon, { IIconProps } from '../../components/molecules/Icon';
import { CenterView } from '../CenterView';

const componentProps: IIconProps = {
  iconName: 'Lightbulb',
};

const svgIconMap: { [key: string]: ReactNode } = {
  'bones-joints': <IconBoneJoints />,
  'head-and-face': <IconHeadFace />,
  'sad-face': <IconSadFace />,
  'skin-and-nails': <IconSkinNails />,
  'smile-face': <IconSmileFace />,
  'stomach-gut-bladder': <IconStomachGutBladder />,
  'thought-bubble': <IconThoughtBubble />,
  'throat-chest-lungs': <IconThroatChestLungs />,
  'tired-face': <IconTiredFace />,
};

storiesOf('Molecules/Icon', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('index', () => <Icon {...componentProps} />)
  .add('svg', () => (
    <View>
      {/* @ts-ignore */}
      {
        svgIconMap[
          optionsKnob(
            'icon',
            {
              bones: 'bones-joints',
              head: 'head-and-face',
              sad: 'sad-face',
              skin: 'skin-and-nails',
              smile: 'smile-face',
              stomach: 'stomach-gut-bladder',
              thought: 'thought-bubble',
              throat: 'throat-chest-lungs',
              tired: 'tired-face',
            },
            'bones',
            { display: 'select' },
          )
        ]
      }
    </View>
  ));
