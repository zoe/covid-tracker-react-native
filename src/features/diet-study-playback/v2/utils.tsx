import { doctorsAvatars, drEllenThompsonUK, drSarahBerry } from '@assets';
import { isUSCountry } from '@covid/core/localisation/LocalisationService';
import React from 'react';
import { Image } from 'react-native';

import Avatar from '../../../components/avatar';

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
    <Avatar imgsrc={drSarahBerry} />
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
    <Avatar imgsrc={drEllenThompsonUK} />
  );
}
