import i18n from '@covid/locale/i18n';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Button from '@tracer/components/atoms/Button';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import Modal from '@tracer/components/molecules/Modal';
import StackedCard from '@tracer/components/organisms/Card/stacked';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface IModalFeelDifferentProps {
  visible: boolean;
  onClose: () => void;
}

export default function ModalFeelDifferent({ onClose, visible }: IModalFeelDifferentProps) {
  return (
    <Modal onRequestClose={onClose} visible={visible}>
      <Column
        style={[
          {
            backgroundColor: colors.black50,
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: grid.g16,
          },
        ]}
      >
        <StackedCard
          cardProps={{
            customBody: (
              <Row style={[baseStyle.bodyTextRow]}>
                <Text style={[baseStyle.cardBodyHeaderText]}>
                  {i18n.t('usual-self.assessment-flow.modals.1-feel-different-body')}
                </Text>
              </Row>
            ),
            customFooter: (
              <>
                <Button
                  onPress={onClose}
                  style={[baseStyle.cardFooterButton]}
                  text={i18n.t('usual-self.assessment-flow.modals.1-feel-different-cta')}
                  textStyle={[baseStyle.cardFooterText]}
                />
              </>
            ),
            customHeader: (
              <Text style={[baseStyle.cardHeaderText]}>
                {i18n.t('usual-self.assessment-flow.modals.1-feel-different-title')}
              </Text>
            ),
          }}
          style={[baseStyle.card]}
        />
      </Column>
    </Modal>
  );
}

const baseStyle = StyleSheet.create({
  bodyTextRow: {
    justifyContent: 'center',
    marginVertical: grid.g16,
  },
  card: {
    paddingHorizontal: grid.g16,
    paddingVertical: grid.g24,
  },
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
