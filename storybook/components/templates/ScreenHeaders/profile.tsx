import Avatar from '@assets/v2/svg/avatar';
import IconArrowLeft from '@assets/v2/svg/icon-arrow-left';
import i18n from '@covid/locale/i18n';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Row from '@tracer/components/atoms/Row';
import IconButton from '@tracer/components/molecules/IconButton';
import { ScreenNavigatorCompact } from '@tracer/components/organisms/Screen/nav';
import React from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

interface IScreenProfileHeaderProps {
  style?: StyleProp<ViewStyle>;
  onGoBack: () => void;
}

export default function ScreenProfileHeader({ style, onGoBack }: IScreenProfileHeaderProps) {
  const avatarCircle = `${grid.g16}`;
  return (
    <ScreenNavigatorCompact
      left={
        <IconButton onPress={() => onGoBack()}>
          <IconArrowLeft />
        </IconButton>
      }
      right={
        <Row>
          <Text style={[baseStyle.rightText]}>{i18n.t('usual-self.assessment-flow.header-me')}</Text>
          <Avatar
            circleCx={avatarCircle}
            circleCy={avatarCircle}
            circleR={avatarCircle}
            height={grid.g32}
            width={grid.g32}
          />
        </Row>
      }
      style={[baseStyle.view, style]}
    />
  );
}

const baseStyle = StyleSheet.create({
  rightText: {
    fontSize: 14,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 20,
    paddingHorizontal: grid.g8,
    paddingVertical: 6,
    textAlign: 'right',
  },
  view: {
    backgroundColor: colors.surface.interactive,
    flexDirection: 'row',
  },
});
