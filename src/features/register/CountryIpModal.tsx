import { closeIcon } from '@assets';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { RegularText } from '@covid/components/Text';
import { ITest } from '@covid/components/types';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import { localisationService } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

enum ECountryCode {
  NONE = '',
  US = 'US',
  GB = 'GB',
  SV = 'SE',
}

interface IProps extends ITest {
  closeModal: () => void;
  isModalVisible: boolean;
  navigation: StackNavigationProp<TScreenParamList, 'Welcome'>;
}

type TItem = {
  label: string;
  value: ECountryCode;
};

export default React.memo(function CountryIpModal({ navigation, isModalVisible, closeModal }: IProps) {
  const [countrySelected, setCountrySelected] = React.useState('');

  const selectCountry = React.useCallback(
    async (countryCode: string) => {
      await localisationService.setUserCountry(countryCode);

      const screenStack = () => {
        if (countryCode === ECountryCode.US) {
          return [
            { name: 'Welcome', params: {} },
            { name: 'BeforeWeStartUS', params: {} },
          ];
        }

        return [
          { name: 'Welcome', params: {} },
          { name: 'Consent', params: {} },
        ];
      };

      navigation.reset({
        index: 0,
        routes: screenStack(),
      });
    },
    [navigation.reset],
  );

  const onValueChange = React.useCallback(
    async (value: string) => {
      closeModal();
      setCountrySelected(value);
      await AsyncStorageService.setAskedCountryConfirmation(true);
      await selectCountry(value);
    },
    [closeModal, setCountrySelected, selectCountry],
  );

  const items: TItem[] = [
    { label: i18n.t('united-states'), value: ECountryCode.US },
    { label: i18n.t('united-kingdom'), value: ECountryCode.GB },
    { label: i18n.t('sweden'), value: ECountryCode.SV },
  ];

  return (
    <Modal transparent animationType="fade" visible={isModalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={closeModal} style={{ alignSelf: 'flex-end' }} testID="close-modal">
            <Image source={closeIcon} />
          </TouchableOpacity>
          <RegularText style={styles.titleText}>{i18n.t('your-country-title')}</RegularText>
          <RegularText>{i18n.t('your-country-text')}</RegularText>

          <RadioInput
            items={items}
            label={i18n.t('select-country')}
            onValueChange={onValueChange}
            selectedValue={countrySelected}
            testID="input-select-country"
          />
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    marginTop: sizes.l,
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: sizes.xs,
    elevation: 5,
    margin: sizes.l,
    padding: sizes.l,
    shadowColor: colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  titleText: {
    fontSize: 20,
    marginVertical: sizes.m,
    textAlign: 'center',
  },
});
