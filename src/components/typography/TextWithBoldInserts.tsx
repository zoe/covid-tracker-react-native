import { IProps as ITextProps, Text } from '@covid/components/typography/Text';
import * as React from 'react';

interface IProps extends ITextProps {
  children: string;
}

export function TextWithBoldInserts(props: IProps) {
  const textParts = props.children.split('*');
  let boldText = !!props.children.startsWith('*');

  return (
    <Text {...props}>
      {textParts
        .filter((text: string) => text)
        .map((text: string, index: number) => {
          const key = `bold-text-${index}`;
          const node: React.ReactNode = boldText ? (
            <Text key={key} {...props} style={[props.style, { fontWeight: '700' }]}>
              {text}
            </Text>
          ) : (
            <Text key={key} {...props}>
              {text}
            </Text>
          );
          boldText = !boldText;
          return node;
        })}
    </Text>
  );
}
