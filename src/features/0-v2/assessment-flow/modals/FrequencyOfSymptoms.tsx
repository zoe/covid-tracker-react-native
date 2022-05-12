import i18n from '@covid/locale/i18n';
import { grid } from '@tracer/branding/grid';
import Button from '@tracer/components/atoms/Button';
import Row from '@tracer/components/atoms/Row';
import StackedCard from '@tracer/components/organisms/Card/stacked';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface IModalFrequencyOfSymptomsProps {
  onClose: () => void;
}

export default function ModalFrequencyOfSymptoms({ onClose }: IModalFrequencyOfSymptomsProps) {
  return (
    <StackedCard
      cardProps={{
        customBody: (
          <Row style={[baseStyle.bodyTextRow]}>
            <Text style={[baseStyle.cardBodyHeaderText]}>
              {i18n.t('usual-self.modals.1-frequency-of-symptoms-body')}
            </Text>
          </Row>
        ),
        customFooter: (
          <>
            <Button
              onPress={onClose}
              style={[baseStyle.cardFooterButton]}
              text={i18n.t('usual-self.modals.1-frequency-of-symptoms-cta')}
              textStyle={[baseStyle.cardFooterText]}
            />
          </>
        ),
        customHeader: (
          <Text style={[baseStyle.cardHeaderText]}>{i18n.t('usual-self.modals.1-frequency-of-symptoms-title')}</Text>
        ),
      }}
      style={[baseStyle.card]}
    />
  );
}

const baseStyle = StyleSheet.create({
  bodyTextRow: { justifyContent: 'center', marginVertical: grid.g16 },
  card: { paddingHorizontal: grid.g16, paddingVertical: grid.g24 },
  cardBodyHeaderText: {
    fontSize: grid.g16,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: grid.g24,
    textAlign: 'center',
  },
  cardFooterButton: { marginVertical: grid.g16 },
  cardFooterText: { textTransform: 'none' },
  cardHeaderText: {
    fontSize: grid.g24,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: grid.g32,
    marginVertical: grid.g8,
    textAlign: 'center',
  },
  column: { paddingHorizontal: grid.g16 },
  row: { justifyContent: 'center', marginVertical: grid.g8 },
});
