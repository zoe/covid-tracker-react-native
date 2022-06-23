import IconDiseaseBrain from '@assets/v2/svg/diseases/icon-brain';
import IconDiseaseHeart from '@assets/v2/svg/diseases/icon-heart';
import IconDiseaseLungs from '@assets/v2/svg/diseases/icon-lungs';
import IconDiseaseSightHearing from '@assets/v2/svg/diseases/icon-sight-and-hearing';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';

import IconCarousel, { IIconCarouselProps } from '../../components/templates/IconCarousel';
import { CenterView } from '../CenterView';

storiesOf('Templates/IconCarousel', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('disease preference carousel', () => {
    const componentProps: IIconCarouselProps = {
      icons: [
        { icon: <IconDiseaseBrain />, label: 'Dementia' },
        { icon: <IconDiseaseHeart />, label: 'Heart' },
        { icon: <IconDiseaseSightHearing />, label: 'Vision' },
        { icon: <IconDiseaseLungs />, label: 'Lungs' },
      ],
      onSwipe: action('swiping'),
    };

    return <IconCarousel {...componentProps} />;
  });
