import IconInfo, { TIconInfoProps } from '@assets/v2/svg/icon-info';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import IconButton from '@tracer/components/molecules/IconButton';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface IAssessmentFlowPageCardInfoLabelProps {
  text: string;
  iconProps?: TIconInfoProps;
  onPressInfo: () => void;
}

export default function AssessmentFlowPageCardInfoLabel({
  text,
  onPressInfo,
  iconProps,
}: IAssessmentFlowPageCardInfoLabelProps) {
  return (
    <Row style={[baseStyle.row]}>
      <Column>
        <Text style={[baseStyle.text]}>{text}</Text>
      </Column>
      <Column style={[baseStyle.infoColumn]}>
        <IconButton buttonType="tertiary" onPress={onPressInfo}>
          <IconInfo strokeColor={baseStyle.iconStroke.color} {...iconProps} />
        </IconButton>
      </Column>
    </Row>
  );
}

const baseStyle = StyleSheet.create({
  iconStroke: {
    color: colors.text.primary,
  },
  infoColumn: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: grid.g8,
    paddingVertical: grid.g4,
  },
  row: {
    flexGrow: 1,
    marginBottom: grid.g16,
    paddingHorizontal: grid.g16,
  },
  text: {
    fontSize: 14,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 20,
    paddingVertical: grid.g2,
    textAlign: 'left',
  },
});
