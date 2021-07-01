import InsightAlcohol from '@assets/mental-health-playback/InsightAlcohol';
import InsightEvents from '@assets/mental-health-playback/InsightEvents';
import InsightExercise from '@assets/mental-health-playback/InsightExercise';
import InsightFaceToFace from '@assets/mental-health-playback/InsightFaceToFace';
import InsightNature from '@assets/mental-health-playback/InsightNature';
import InsightNews from '@assets/mental-health-playback/InsightNews';
import InsightPets from '@assets/mental-health-playback/InsightPets';
import InsightRelaxation from '@assets/mental-health-playback/InsightRelaxation';
import InsightScreenTime from '@assets/mental-health-playback/InsightScreenTime';
import InsightSleep from '@assets/mental-health-playback/InsightSleep';
import InsightSmoking from '@assets/mental-health-playback/InsightSmoking';
import InsightSnacks from '@assets/mental-health-playback/InsightSnacks';
import InsightTalking from '@assets/mental-health-playback/InsightTalking';
import InsightWorking from '@assets/mental-health-playback/InsightWorking';
import * as React from 'react';
import { SvgProps } from 'react-native-svg';

interface IProps extends SvgProps {
  type: string;
}

export default function InsightIllustration({ type, ...props }: IProps) {
  switch (type) {
    case 'drinking_alcohol_less':
    case 'drinking_alcohol_more':
      return <InsightAlcohol {...props} />;
    case 'engaging_in_orgs_clubs_socs_less':
    case 'engaging_in_orgs_clubs_socs_more':
      return <InsightEvents {...props} />;
    case 'being_physically_active_or_doing_exercise_less':
    case 'being_physically_active_or_doing_exercise_more':
      return <InsightExercise {...props} />;
    case 'interacting_face_to_face_with_family_friends_less':
    case 'interacting_face_to_face_with_family_friends_more':
      return <InsightFaceToFace {...props} />;
    case 'spending_time_in_green_spaces_less':
    case 'spending_time_in_green_spaces_more':
      return <InsightNature {...props} />;
    case 'spending_time_with_pets_less':
    case 'spending_time_with_pets_more':
      return <InsightPets {...props} />;
    case 'relaxation_mindfulness_meditation_less':
    case 'relaxation_mindfulness_meditation_more':
      return <InsightRelaxation {...props} />;
    case 'using_devices_with_a_screen_less':
    case 'using_devices_with_a_screen_more':
      return <InsightScreenTime {...props} />;
    case 'news':
      return <InsightNews {...props} />;
    case 'sleeping_well_less':
    case 'sleeping_well_more':
      return <InsightSleep {...props} />;
    case 'smoking_or_vaping_less':
    case 'smoking_or_vaping_more':
      return <InsightSmoking {...props} />;
    case 'eating_savoury_snacks_or_confectionery_less':
    case 'eating_savoury_snacks_or_confectionery_more':
      return <InsightSnacks {...props} />;
    case 'talking_to_family_friends_via_phone_or_technology_less':
    case 'talking_to_family_friends_via_phone_or_technology_more':
      return <InsightTalking {...props} />;
    case 'working':
      return <InsightWorking {...props} />;
    default:
      return null;
  }
}
