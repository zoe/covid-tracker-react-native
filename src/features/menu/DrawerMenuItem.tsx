import { NumberIndicator } from '@covid/components/stats/NumberIndicator';
import { CaptionText, HeaderText, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import i18n from '@covid/locale/i18n';
import { openWebLink } from '@covid/utils/links';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

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
    <TouchableOpacity onPress={onPress} style={styles.iconNameRow}>
      <View style={{ flexDirection: 'row' }}>
        {image ? <View style={styles.icon}>{image}</View> : null}
        <View style={styles.labelRow}>
          <HeaderText>{label}</HeaderText>
          {indicator ? <NumberIndicator number={indicator} /> : null}
        </View>
      </View>
      {smallLabel != null ? <CaptionText style={styles.smallLabel}>{smallLabel}</CaptionText> : null}
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
    <TouchableOpacity onPress={onPress} style={styles.iconNameRow}>
      <View style={styles.labelRow}>
        <RegularText>{getLabel()}</RegularText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    width: 24,
  },
  iconNameRow: {
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginStart: 8,
    marginVertical: 16,
  },
  labelRow: {
    justifyContent: 'space-between',
  },
  smallLabel: {
    marginTop: 8,
  },
});
