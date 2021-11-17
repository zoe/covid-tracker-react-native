import { fingerPrickX3, noseSwabX3, syringeX3 } from '@assets';
import { BrandedButton, HeaderText, LabelSecondaryText, LightText, Modal } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
}

interface IMechanismInformationProps {
  mechanism: string;
  iconSource: ImageSourcePropType;
}

const MECHANISMS = [
  { iconSource: noseSwabX3, name: 'lateral-flow' },
  { iconSource: noseSwabX3, name: 'pcr' },
  { iconSource: fingerPrickX3, name: 'finger-prick' },
  { iconSource: syringeX3, name: 'blood-draw' },
];

const MechanismInformation = ({ mechanism, iconSource }: IMechanismInformationProps) => {
  return (
    <View style={styles.marginTop}>
      <View style={styles.mechanismHeading}>
        <Image source={iconSource} style={styles.image} />
        <LabelSecondaryText style={styles.mechanismTitle}>
          {i18n.t(`covid-test.mechanism-modal.${mechanism}-title`)}
        </LabelSecondaryText>
      </View>
      <LightText>{i18n.t(`covid-test.mechanism-modal.${mechanism}-description`)}</LightText>
    </View>
  );
};

export const CovidTestMechanismInfoModal: React.FC<IProps> = (props) => {
  const footerChildren = React.useMemo(
    () => <BrandedButton onPress={props.onRequestClose}>{i18n.t('ok')}</BrandedButton>,
    [props.onRequestClose, i18n.t('ok')],
  );

  return (
    <Modal
      showsVerticalScrollIndicator
      footerChildren={footerChildren}
      modalName="CovidTestMechanismInfo"
      onRequestClose={props.onRequestClose}
      testID="covid-test-mechanism-info-modal"
      visible={props.visible}
    >
      <HeaderText style={styles.modalTitle}>{i18n.t('covid-test.mechanism-modal.title')}</HeaderText>

      {MECHANISMS.map((mechanism) => (
        <MechanismInformation iconSource={mechanism.iconSource} key={mechanism.name} mechanism={mechanism.name} />
      ))}
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 20,
    marginRight: sizes.xs,
    marginTop: 2,
    width: 20,
  },
  marginTop: {
    marginTop: sizes.l,
  },
  mechanismHeading: {
    flexDirection: 'row',
  },
  mechanismTitle: {
    flex: 1,
    flexWrap: 'wrap',
    marginBottom: sizes.xs,
  },
  modalTitle: {
    marginTop: sizes.s,
    textAlign: 'center',
  },
});
