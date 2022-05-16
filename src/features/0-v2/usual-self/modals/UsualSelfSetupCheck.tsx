import i18n from '@covid/locale/i18n';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Button from '@tracer/components/atoms/Button';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import Modal from '@tracer/components/molecules/Modal';
import StackedCard from '@tracer/components/organisms/Card/stacked';
import React from 'react';
import { Text } from 'react-native';

interface IModalUsualSelfSetupErrorProps {
  visible: boolean;
  onClose: () => void;
}

export default function ModalUsualSelfSetupError({ visible, onClose }: IModalUsualSelfSetupErrorProps) {
  return (
    <Modal onRequestClose={() => onClose()} visible={visible}>
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
              <Row style={{ height: grid.g32 + grid.g24, justifyContent: 'center', marginVertical: grid.g16 }}>
                <Text
                  style={{
                    fontSize: grid.g16,
                    fontWeight: '300',
                    letterSpacing: 0,
                    lineHeight: 20,
                    textAlign: 'center',
                  }}
                >
                  To proceed, please check on previous screens that for each of your chosen symptoms accompanied by
                  sub-checkboxes that you selected at least one sub-checkbox
                </Text>
              </Row>
            ),
            customFooter: (
              <>
                <Button
                  buttonType="tertiary"
                  onPress={onClose}
                  style={{ marginVertical: grid.g4 }}
                  text={i18n.t('usual-self.setup.modal.1-cta-2')}
                />
              </>
            ),
          }}
          style={{ paddingHorizontal: grid.g16, paddingVertical: grid.g24 }}
        />
      </Column>
    </Modal>
  );
}
