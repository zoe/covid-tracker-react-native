import React from 'react';
import { SvgProps } from 'react-native-svg';

import ItemAlcohol from '@assets/mental-health-playback/insight_alcohol.svg';
import ItemEvents from '@assets/mental-health-playback/insight_events.svg';
import ItemExercise from '@assets/mental-health-playback/insight_exercise.svg';
import ItemFaceToFace from '@assets/mental-health-playback/insight_face_to_face.svg';
import ItemNature from '@assets/mental-health-playback/insight_nature.svg';
import ItemNews from '@assets/mental-health-playback/insight_news.svg';
import ItemPets from '@assets/mental-health-playback/insight_pets.svg';
import ItemRelaxation from '@assets/mental-health-playback/insight_relaxation.svg';
import ItemScreenTime from '@assets/mental-health-playback/insight_screen_time.svg';
import ItemSleep from '@assets/mental-health-playback/insight_sleep.svg';
import ItemSmoking from '@assets/mental-health-playback/insight_smoking.svg';
import ItemSnacks from '@assets/mental-health-playback/insight_snacks.svg';
import ItemTalking from '@assets/mental-health-playback/insight_talking.svg';
import ItemWorking from '@assets/mental-health-playback/insight_working.svg';

interface IProps extends SvgProps {
  type: string;
}

export default function InsightIllustration({ type, ...props }: IProps) {
  switch (type) {
    case 'drinking_alcohol_less':
    case 'drinking_alcohol_more':
      return <ItemAlcohol {...props} />;
    case 'engaging_in_orgs_clubs_socs_less':
    case 'engaging_in_orgs_clubs_socs_more':
      return <ItemEvents {...props} />;
    case 'being_physically_active_or_doing_exercise_less':
    case 'being_physically_active_or_doing_exercise_more':
      return <ItemExercise {...props} />;
    case 'interacting_face_to_face_with_family_friends_less':
    case 'interacting_face_to_face_with_family_friends_more':
      return <ItemFaceToFace {...props} />;
    case 'spending_time_in_green_spaces_less':
    case 'spending_time_in_green_spaces_more':
      return <ItemNature {...props} />;
    case 'spending_time_with_pets_less':
    case 'spending_time_with_pets_more':
      return <ItemPets {...props} />;
    case 'relaxation_mindfulness_meditation_less':
    case 'relaxation_mindfulness_meditation_more':
      return <ItemRelaxation {...props} />;
    case 'using_devices_with_a_screen_less':
    case 'using_devices_with_a_screen_more':
      return <ItemScreenTime {...props} />;
    case 'news':
      return <ItemNews {...props} />;
    case 'sleeping_well_less':
    case 'sleeping_well_more':
      return <ItemSleep {...props} />;
    case 'smoking_or_vaping_less':
    case 'smoking_or_vaping_more':
      return <ItemSmoking {...props} />;
    case 'eating_savoury_snacks_or_confectionery_less':
    case 'eating_savoury_snacks_or_confectionery_more':
      return <ItemSnacks {...props} />;
    case 'talking_to_family_friends_via_phone_or_technology_less':
    case 'talking_to_family_friends_via_phone_or_technology_more':
      return <ItemTalking {...props} />;
    case 'working':
      return <ItemWorking {...props} />;
    default:
      return null;
  }
}
