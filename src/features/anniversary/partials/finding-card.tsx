import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Icon, Link, Text } from '@covid/components';
import { openWebLink } from '@covid/utils/links';

import { TTimelineEvent } from '../types';

interface IProps {
  timelineEvent: TTimelineEvent;
}

function FindingCard({ timelineEvent }: IProps) {
  const { title, sub_title, external_link_text, external_link } = timelineEvent;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon iconName="Lightbulb" iconSize={18} />
        <Text textClass="pBold" style={{ marginHorizontal: 12 }}>
          {title}
        </Text>
      </View>
      <Text textClass="h5Light" style={styles.body}>
        {sub_title}
      </Text>
      {external_link_text && external_link && (
        <Link linkText={external_link_text} onPress={() => openWebLink(external_link)} style={{ marginBottom: 8 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 48,
    padding: 16,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {
    marginBottom: 24,
    marginTop: 12,
  },
});

export default FindingCard;
