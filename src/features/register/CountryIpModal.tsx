import { closeIcon } from '@assets';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { RegularText } from '@covid/components/Text';
import { ITest } from '@covid/components/types';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import { localisationService } from '@covid/core/localisation/LocalisationService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

enum CountryCode {
  NONE = '',
  US = 'US',
  GB = 'GB',
  SV = 'SE',
}

interface IProps extends ITest {
  closeModal: () => void;
  isModalVisible: boolean;
  navigation: StackNavigationProp<ScreenParamList, 'Welcome'>;
}

type Item = {
  label: string;
  value: CountryCode;
};

export default React.memo(function CountryIpModal({ navigation, isModalVisible, closeModal }: IProps) {
  const [countrySelected, setCountrySelected] = React.useState('');

  const selectCountry = React.useCallback(
    async (countryCode: string) => {
      await localisationService.setUserCountry(countryCode);

      const screenStack = () => {
        if (countryCode === CountryCode.US) {
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

  const items: Item[] = [
    { label: i18n.t('united-states'), value: CountryCode.US },
    { label: i18n.t('united-kingdom'), value: CountryCode.GB },
    { label: i18n.t('sweden'), value: CountryCode.SV },
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
    marginTop: 22,
  },
  labelStyle: {
    color: colors.primary,
    fontSize: 15,
    lineHeight: 30,
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 5,
    margin: 24,
    padding: 24,
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
    marginVertical: 16,
    textAlign: 'center',
  },
});
