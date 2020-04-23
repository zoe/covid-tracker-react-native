import React, {useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import {RegularText} from "./Text";
import UserService from "../core/user/UserService";

export default function StartAssessemnt({id}) {
  const navigation = useNavigation();

  async function startAssessment(patientId: string) {
    const userService = new UserService();
    const currentPatient = await userService.getCurrentPatient(patientId);
    navigation.navigate('StartAssessment', {currentPatient});
  }

  return (
    <TouchableOpacity onPress={() => startAssessment(id)}><RegularText>Start Assessment</RegularText></TouchableOpacity>
  )
}





    