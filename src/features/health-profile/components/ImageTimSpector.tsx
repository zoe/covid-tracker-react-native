import { Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

const timAvatar = require('../assets/tim_avatar.png');

interface IProps {
  hideTitle?: boolean;
  imageHeight?: number;
  imageWidth?: number;
}
export default function ImageTimSpector(props: IProps) {
  return (
    <>
      <Image
        source={timAvatar}
        style={[
          styles.avatar,
          props.imageHeight ? { height: props.imageHeight } : null,
          props.imageWidth ? { width: props.imageWidth } : null,
        ]}
      />
      {props.hideTitle ? null : (
        <Text inverted colorPalette="gray" colorShade="main" textAlign="center" textClass="pSmallMedium">
          {i18n.t('health-profile.intro-modal.tim-spector')}
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 132,
    marginBottom: sizes.xs,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 132,
  },
});
