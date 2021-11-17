import { BrandedButton, HeaderText, LabelSecondaryText, LightText, Modal } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
}

interface IAntibodyInformationProps {
  antibody: string;
}

const ANTIBODIES = [{ name: 'anti-n' }, { name: 'anti-s' }];

const AntibodyInformation = ({ antibody }: IAntibodyInformationProps) => {
  return (
    <View style={styles.marginTop}>
      <LabelSecondaryText style={styles.antibodyTitle}>
        {i18n.t(`covid-test.antibody-modal.${antibody}-title`)}
      </LabelSecondaryText>
      <LightText>{i18n.t(`covid-test.antibody-modal.${antibody}-description`)}</LightText>
    </View>
  );
};

export const CovidTestAntibodyInfoModal: React.FC<IProps> = (props) => {
  const footerChildren = React.useMemo(
    () => <BrandedButton onPress={props.onRequestClose}>{i18n.t('ok')}</BrandedButton>,
    [props.onRequestClose, i18n.t('ok')],
  );

  return (
    <Modal
      showsVerticalScrollIndicator
      footerChildren={footerChildren}
      modalName="CovidTestAntibodyInfo"
      onRequestClose={props.onRequestClose}
      testID="covid-test-antibody-info-modal"
      visible={props.visible}
    >
      <HeaderText style={styles.modalTitle}>{i18n.t('covid-test.antibody-modal.title')}</HeaderText>

      {ANTIBODIES.map((antibody) => (
        <AntibodyInformation antibody={antibody.name} key={antibody.name} />
      ))}
    </Modal>
  );
};

const styles = StyleSheet.create({
  antibodyTitle: {
    flex: 1,
    flexWrap: 'wrap',
    marginBottom: sizes.xs,
  },
  marginTop: {
    marginTop: sizes.l,
  },
  modalTitle: {
    marginTop: sizes.s,
    textAlign: 'center',
  },
});
