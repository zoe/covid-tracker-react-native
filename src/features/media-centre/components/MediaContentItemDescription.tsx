import { RegularText } from '@covid/components';
import * as React from 'react';
import { Pressable } from 'react-native';

type TProps = {
  description: string;
};

const truncatedString = (str: string, maxLength: number) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '... Read more';
  }
  return str;
};

export const MediaContentItemDescription: React.FC<TProps> = ({ description }) => {
  const [readMore, setReadMore] = React.useState(false);

  return (
    // Do we want to add analytics here?
    <Pressable onPress={() => setReadMore(true)}>
      <RegularText>{readMore ? description : truncatedString(description, 30)}</RegularText>
    </Pressable>
  );
};
