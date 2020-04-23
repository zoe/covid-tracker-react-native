import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import {RegularText} from "../components/Text";
import Avatar from './Avatar';
import Patient from './PatientListItem';
import patientIsDueCheck from '../utils/patientDueCheck';
import DropDown from './PatientListItemDropdown';

interface Props {
  avatar_name: string;
  name: string;
  last_reported_at: string;
  contributions: number;
}

export default function PatientListItem({avatar_name, name, last_reported_at, contributions, id}: Props) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  const isDue = patientIsDueCheck(last_reported_at);

  return (
    <Container isDue={isDue}>
      <Clickable onPress={handleClick}>
        <Avatar avatar={avatar_name} />
        <RegularText>{name}</RegularText>
      </Clickable>
      <DropDown 
        open={open}
        lastReported={last_reported_at}
        contributions={contributions}
        isDue={isDue}
        id={id}
      />
    </Container>
  )
}

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #eee;
  borderRadius: 16px;
  background-color: white;
  margin-bottom: 20px;
  opacity: ${({isDue}) => isDue ? 1 : 0.5};
`

const Clickable = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;