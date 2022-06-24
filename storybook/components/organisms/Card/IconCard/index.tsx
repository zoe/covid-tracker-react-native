import { grid } from '@tracer/branding/grid';
import Row from '@tracer/components/atoms/Row';
import Card from '@tracer/components/molecules/Card';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  icon: ReactNode;
  label: string;
}

export default function IconCard({ icon, label }: Props) {
  const body = (
    <View style={styles.container}>
      <Row style={styles.iconRow}>{icon}</Row>
      <Row>
        <Text>{label}</Text>
      </Row>
    </View>
  );
  return <Card customBody={body} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  iconRow: {
    padding: grid.g16,
  },
});
