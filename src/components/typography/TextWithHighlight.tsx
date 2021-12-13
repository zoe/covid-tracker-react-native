import { IProps as ITextProps, Text } from '@covid/components/typography/Text';
import * as React from 'react';

interface IProps extends ITextProps {
  color?: string;
  query: string;
}

export function TextWithHighlight({ color, children, query, ...props }: IProps) {
  if (query && typeof children === 'string') {
    const index = children.toLowerCase().indexOf(query.toLowerCase());
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
