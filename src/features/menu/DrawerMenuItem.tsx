import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { RegularText, HeaderText, CaptionText } from '@covid/components/Text';
import { NumberIndicator } from '@covid/components/stats/NumberIndicator';
import Analytics, { events } from '@covid/core/Analytics';
import i18n from '@covid/locale/i18n';
import { openWebLink } from '@covid/utils/links';

export enum DrawerMenuItem {
  RESEARCH_UPDATE = 'RESEARCH_UPDATE',
  TURN_ON_REMINDERS = 'TURN_ON_REMINDERS',
  FAQ = 'FAQ',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  DELETE_MY_DATA = 'DELETE_MY_DATA',
  LOGOUT = 'LOGOUT',
}

interface IMenuItemProps {
  label: string;
  image?: React.ReactNode;
  smallLabel?: string;
  indicator?: number;
  onPress: () => void;
}

interface ILinkMenuItemProps {
  link?: string;
  type: DrawerMenuItem;
  onPress?: () => void;
}

export function MenuItem({ image, onPress, label, smallLabel, indicator }: IMenuItemProps) {
  return (
    <TouchableOpacity style={styles.iconNameRow} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        {image && <View style={styles.icon}>{image}</View>}
        <View style={styles.labelRow}>
          <HeaderText>{label}</HeaderText>
          {indicator && <NumberIndicator number={indicator} />}
        </View>
      </View>
      {smallLabel != null && <CaptionText style={styles.smallLabel}>{smallLabel}</CaptionText>}
    </TouchableOpacity>
  );
}

export function LinkItem({
  link,
  type,
  onPress = () => {
    Analytics.track(events.CLICK_DRAWER_MENU_ITEM, { name: type });
    if (link) openWebLink(link);
  },
}: ILinkMenuItemProps) {
  const getLabel = (): string => {
    switch (type) {
      case DrawerMenuItem.FAQ:
        return i18n.t('faqs');
      case DrawerMenuItem.RESEARCH_UPDATE:
        return i18n.t('research-updates');
      case DrawerMenuItem.PRIVACY_POLICY:
        return i18n.t('privacy-policy');
      case DrawerMenuItem.DELETE_MY_DATA:
        return i18n.t('delete-my-data');
      case DrawerMenuItem.TURN_ON_REMINDERS:
        return i18n.t('push-notifications');
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity style={styles.iconNameRow} onPress={onPress}>
      <View style={styles.labelRow}>
        <RegularText>{getLabel()}</RegularText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconNameRow: {
    marginStart: 8,
    marginVertical: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  labelRow: {
    justifyContent: 'space-between',
  },
  smallLabel: {
    marginTop: 8,
  },
});
