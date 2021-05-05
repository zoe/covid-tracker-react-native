import { Image } from 'react-native';
import React from 'react';

import { isUSCountry } from '@covid/core/localisation/LocalisationService';
import { doctorsAvatars, drSarahBerry, drEllenThompsonUK } from '@assets';

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
        resizeMode: 'contain',
        width: 120,
        height: undefined,
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
        resizeMode: 'contain',
        width: 120,
        height: undefined,
      }}
    />
  ) : (
    <Avatar imgsrc={drEllenThompsonUK} />
  );
}
