import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon, Text, TIconName } from '@covid/components';

interface IProps {
  iconName: TIconName;
  title: string;
}

function Highlight({ iconName, title }: IProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon iconName={iconName} iconSize={18} iconStyle={{ color: '#0165B5' }} />
        <Text textClass="h4Light" style={{ color: '#0165B5', marginLeft: 12 }}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 48,
    padding: 16,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Highlight;
