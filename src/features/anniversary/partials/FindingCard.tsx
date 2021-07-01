import { Icon, Text } from '@covid/components';
import { TTimelineEvent } from '@covid/features/anniversary/types';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { openWebLink } from '@covid/utils/links';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { AccessibilityRole, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

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
      }
      link = {
        linkText: route_text,
        onPress: () => navigate(route_name),
        role: 'button',
      };
      return link;
    }
    return link;
  };

  const link = getLink();

  return (
    <TouchableWithoutFeedback accessible accessibilityRole={link.role} onPress={link.onPress}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon iconName="Lightbulb" iconSize={18} />
          <Text style={{ marginHorizontal: 12 }} textClass="pLight">
            {title}
          </Text>
        </View>
        <Text style={styles.body} textClass="h5Medium">
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
  body: {
    marginBottom: 24,
    marginTop: 12,
  },
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
});

export default FindingCard;
