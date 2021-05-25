import { shareVaccine, shareVaccineBanner } from '@assets';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { ExternalCallout } from '../ExternalCallout';

interface IProps {
  screenName: string;
  isSharing?: boolean;
}

export function ShareVaccineCard({ screenName, isSharing = false }: IProps) {
  const { navigate } = useNavigation();

  return (
    <>
      {!isSharing && (
        <ExternalCallout
          aspectRatio={311 / 135}
          calloutID="shareVaccineBanner"
          imageSource={shareVaccineBanner}
          postClicked={() => navigate('Share', { hideLabel: true, sharable: 'VACCINES' })}
          screenName={screenName}
        />
      )}

      {isSharing && (
        <ExternalCallout
          isSharing
          aspectRatio={1125 / 877}
          calloutID="shareVaccine"
          imageSource={shareVaccine}
          postClicked={() => navigate('Share', { hideLabel: true, sharable: 'VACCINES' })}
          screenName={screenName}
        />
      )}
    </>
  );
}
