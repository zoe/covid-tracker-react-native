import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@covid/components';
import i18n from '@covid/locale/i18n';

interface IProps {
  image: React.ReactNode;
  location: string;
  name: string;
  title: string;
}

export default function DoctorProfile(props: IProps) {
  return (
    <View style={styles.wrapper}>
      {props.image}
      <View style={styles.view}>
        <Text>{props.name}</Text>
        <Text textClass="pSmall" style={styles.text}>
          {props.title}
        </Text>
        <Text textClass="pSmall" style={styles.text}>
          {props.location}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  view: {
    marginLeft: 16,
  },
  text: {
    color: '#888B8C',
  },
});
