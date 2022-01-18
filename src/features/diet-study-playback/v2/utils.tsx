import { doctorsAvatars, drEllenThompsonUK, drSarahBerry } from '@assets';
import { Avatar } from '@covid/components/Avatar';
import { isUSCountry } from '@covid/core/localisation/LocalisationService';
import * as React from 'react';
import { Image } from 'react-native';

export function getDietStudyInfoUrl() {
  return isUSCountry()
    ? 'https://covid.joinzoe.com/us-post/covid-diet-feedback'
    : 'https://covid.joinzoe.com/post/covid-lockdown-diet';
}

export function getDietStudyDoctorImage() {
  return isUSCountry() ? (
    <Image
      source={doctorsAvatars}
      style={{
        aspectRatio: 1.889,
        height: undefined,
        resizeMode: 'contain',
        width: 120,
      }}
    />
  ) : (
    <Avatar source={drSarahBerry} />
  );
}

export function getMentalHealthStudyDoctorImage() {
  return isUSCountry() ? (
    <Image
      source={doctorsAvatars}
      style={{
        aspectRatio: 1.889,
        height: undefined,
        resizeMode: 'contain',
        width: 120,
      }}
    />
  ) : (
    <Avatar source={drEllenThompsonUK} />
  );
}
