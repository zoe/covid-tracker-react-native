import { sizes } from '@covid/themes';
import styled from 'styled-components/native';

import Column from '../../atoms/Column/Column';

export const Card = styled(Column)`
  width: 100%;
  background-color: #fff;
  border-top-left-radius: ${sizes.m}px;
  border-top-right-radius: ${sizes.m}px;
  padding-left: ${sizes.l}px;
  padding-right: ${sizes.l}px;
  justify-content: space-between;
`;
