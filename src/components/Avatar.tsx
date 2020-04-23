import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components';


import {AvatarName, getAvatarByName} from "../utils/avatar";

export default function Avatar({avatar}) {
  const avatarImage = getAvatarByName((avatar || "profile1") as AvatarName);

  return <ImageStyled source={avatarImage} resizeMode={'contain'}/>
}

const ImageStyled = styled.Image`
  width: 30; 
  height: 30;
`;
