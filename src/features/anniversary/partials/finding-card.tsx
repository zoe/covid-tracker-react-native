import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Icon, Link, Text } from '@covid/components';
import { openWebLink } from '@covid/utils/links';

import { TTimelineEvent } from '../types';

interface IProps {
  timelineEvent: TTimelineEvent;
}

// route_name: "DietStudy"
// route_text: "CLICK FOR ROUTE!"

function FindingCard({ timelineEvent }: IProps) {
  const { title, sub_title, external_link_text, external_link, route_name, route_text } = timelineEvent;
  const { navigate } = useNavigation();

  const getLink = () => {
    if (external_link_text && external_link) {
      return <Link linkText={external_link_text} onPress={() => openWebLink(external_link)} />;
    }
    if (route_name && route_text) {
      return <Link linkText={route_text} onPress={() => navigate(route_name)} />;
    }

    return null;
  };

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
      <View style={{ marginBottom: 8 }}>{getLink()}</View>
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
