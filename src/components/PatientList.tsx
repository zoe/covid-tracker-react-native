import React, {useState, useEffect} from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import Patient from './PatientListItem';

export default function PatientList({patients}) {
  return (
    <FlatList 
      data={patients}
      renderItem={({item}) => <Patient {...item}/>}
      keyExtractor={item => item.id}
    />
  )
}


