import React from 'react';

import Text, { IProps as ITextProps } from '../text';

interface IProps extends ITextProps {
  color?: string;
  query?: string;
}

export default function TextHighlight({ color, children, query, ...props }: IProps) {
  if (query && typeof children === 'string') {
    const index = children.toLowerCase().indexOf(query);
    if (index > -1) {
      return (
        <Text {...props}>
          {children.slice(0, index)}
          <Text {...props} style={{ color }}>
            {children.substr(index, query.length)}
          </Text>
          {children.slice(index + query.length, children.length)}
        </Text>
      );
    }
  }
  return <Text {...props}>{children}</Text>;
}
