import { chevronRight } from '@assets';
import { IIconProps } from '@assets/icons/svgIcons/types';
import { Text } from '@covid/components';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface IProps {
  icon: React.FC<IIconProps>;
  onPress: () => void;
  text: string;
}
export const ProfileLinkRow: React.FC<IProps> = (props) => {
  const Icon = props.icon;
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.touchable} testID="profile-link-row">
      <View style={styles.iconText}>
        <Icon />
        <Text inverted colorPalette="uiDark" colorShade="darker" style={styles.text} textClass="p">
          {props.text}
        </Text>
      </View>
      <Image source={chevronRight} style={styles.chevron} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chevron: {
    height: 12,
    marginLeft: sizes.xxs,
    width: 12,
  },
  iconText: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    marginLeft: sizes.xs,
  },
  touchable: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: sizes.s,
  },
});
