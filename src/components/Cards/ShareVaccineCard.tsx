import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { shareVaccineBanner, shareVaccine } from '@assets';

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
          calloutID="shareVaccineBanner"
          imageSource={shareVaccineBanner}
          aspectRatio={311 / 135}
          screenName={screenName}
          postClicked={() => navigate('Share', { sharable: 'VACCINES', hideLabel: true })}
        />
      )}

      {isSharing && (
        <ExternalCallout
          calloutID="shareVaccine"
          imageSource={shareVaccine}
          aspectRatio={1125 / 877}
          screenName={screenName}
          postClicked={() => navigate('Share', { sharable: 'VACCINES', hideLabel: true })}
        />
      )}
    </>
  );
}
