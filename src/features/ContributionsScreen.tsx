import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import UserService from "../core/user/UserService";
import PatientList from '../components/PatientList';

export default function Contributions() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    listProfiles()
  }, [])

  async function listProfiles() {
    const userService = new UserService();
    try {
      const response = await userService.listPatients();
      const patientData = response.data;
      setPatients(patientData);
    } catch (err) {
      console.log('err', err);
    }
  }

  return (
    <Container>
      <PatientList patients={patients} /> 
    </Container>
  )
}

const Container = styled.View`
  padding: 20px;
`;