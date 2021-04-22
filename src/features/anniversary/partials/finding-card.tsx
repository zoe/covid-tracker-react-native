import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, AccessibilityRole } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Icon, Text } from '@covid/components';
import { openWebLink } from '@covid/utils/links';
import appCoordinator from '@covid/features/AppCoordinator';

import { TTimelineEvent } from '../types';

interface IProps {
  timelineEvent: TTimelineEvent;
}

function FindingCard({ timelineEvent }: IProps) {
  const { title, sub_title, external_link_text, external_link, route_name, route_text } = timelineEvent;
  const { navigate } = useNavigation();
  type TLink = {
    linkText: string;
    onPress: () => void;
    role: AccessibilityRole;
  };

  const getLink = (): TLink => {
    let link: TLink = {
      linkText: '',
      onPress: () => null,
      role: 'none',
    };

    if (external_link_text && external_link) {
      link = {
        linkText: external_link_text,
        onPress: () => openWebLink(external_link),
        role: 'button',
      };
      return link;
    }

    if (route_name && route_text) {
      if (route_name === 'DietStudy') {
        link = {
          linkText: route_text,
          onPress: () => appCoordinator.goToDietStudy(),
          role: 'button',
        };
        return link;
      } else {
        link = {
          linkText: route_text,
          onPress: () => navigate(route_name),
          role: 'button',
        };
        return link;
      }
    }
    return link;
  };

  const link = getLink();

  return (
    <TouchableWithoutFeedback onPress={link.onPress} accessibilityRole={link.role} accessible>
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon iconName="Lightbulb" iconSize={18} />
          <Text textClass="pLight" style={{ marginHorizontal: 12 }}>
            {title}
          </Text>
        </View>
        <Text textClass="h5Medium" style={styles.body}>
          {sub_title}
        </Text>
        {link.role !== 'none' ? (
          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: 'purple' }}>{link.linkText}</Text>
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
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
