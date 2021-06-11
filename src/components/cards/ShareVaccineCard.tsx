import { shareVaccine, shareVaccineBanner } from '@assets';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

interface IProps {
  screenName: string;
  isSharing?: boolean;
}

export function ShareVaccineCard({ screenName, isSharing = false }: IProps) {
  const { navigate } = useNavigation();

  return isSharing ? (
    <ExternalCallout
      isSharing
      aspectRatio={1125 / 877}
      calloutID="shareVaccine"
      imageSource={shareVaccine}
      postClicked={() => navigate('Share', { hideLabel: true, sharable: 'VACCINES' })}
      screenName={screenName}
    />
  ) : (
    <ExternalCallout
      aspectRatio={311 / 135}
      calloutID="shareVaccineBanner"
      imageSource={shareVaccineBanner}
      postClicked={() => navigate('Share', { hideLabel: true, sharable: 'VACCINES' })}
      screenName={screenName}
    />
  );
}
