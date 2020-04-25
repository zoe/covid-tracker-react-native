import React from 'react';
import { View, Text } from 'react-native';

type DumpProps = {
  name: string;
  obj: object | null | undefined;
};

export const DumpObject = (props: DumpProps) => (
  <View>
    <Text>
      {props.name}: {JSON.stringify(props.obj, null, 4)}
    </Text>
  </View>
);
