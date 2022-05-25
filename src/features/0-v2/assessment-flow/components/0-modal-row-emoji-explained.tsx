import IconSadFace from '@assets/v2/svg/icon-sad-face';
import IconSmileFace from '@assets/v2/svg/icon-smile-face';
import IconTiredFace from '@assets/v2/svg/icon-tired-face';
import i18n from '@covid/locale/i18n';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Row from '@tracer/components/atoms/Row';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface IEmojiExplainedRowsProps {
  title: string;
}

export default function EmojiExplainedRows({ title }: IEmojiExplainedRowsProps) {
  return (
    <>
      <Row style={[baseStyle.explanationRow]}>
        <IconSmileFace opacity="1" />
        <Text style={[baseStyle.explanationText]}>
          {'Low: '}
          {title}
        </Text>
      </Row>
      <Row style={[baseStyle.explanationRow]}>
        <IconSadFace opacity="1" />
        <Text style={[baseStyle.explanationText]}>
          {'Medium: '}
          {i18n.t('usual-self.assessment-flow.modals.0-emoji-explained-sad')}
        </Text>
      </Row>
      <Row style={[baseStyle.explanationRow]}>
        <IconTiredFace opacity="1" />
        <Text style={[baseStyle.explanationText]}>
          {'High: '}
          {i18n.t('usual-self.assessment-flow.modals.0-emoji-explained-tired')}
        </Text>
      </Row>
    </>
  );
}

const baseStyle = StyleSheet.create({
  explanationRow: { marginVertical: grid.g8 },
  explanationText: {
    color: colors.brand,
    fontSize: grid.g16,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: grid.g24,
    marginLeft: grid.g12,
    paddingRight: grid.g16,
    textAlign: 'left',
  },
});
