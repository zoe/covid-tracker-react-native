import { Text } from '@covid/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

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
        <Text style={styles.text} textClass="pSmall">
          {props.title}
        </Text>
        <Text style={styles.text} textClass="pSmall">
          {props.location}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#888B8C',
  },
  view: {
    marginLeft: 16,
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
});
