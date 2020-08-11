import { StackNavigationProp } from '@react-navigation/stack';
import { Form, Icon, Label, Picker } from 'native-base';
import React, { FC, useCallback, useState } from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import key from 'weak-key';

import { closeIcon } from '@assets';
import { colors } from '@theme';
import { isAndroid } from '@covid/components/Screen';
import { RegularText } from '@covid/components/Text';
import { ITest } from '@covid/components/types';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { Services } from '@covid/provider/services.types';
import { ScreenParamList } from '@covid/features/ScreenParamList';

enum CountryCode {
  NONE = '',
  US = 'US',
  GB = 'GB',
  SV = 'SE',
}

interface PropsType extends ITest {
  navigation: StackNavigationProp<ScreenParamList, 'Welcome'>;
  isModalVisible: boolean;
  closeModal: () => void;
}

type Item = {
  label: string;
  value: CountryCode;
};

const CountryIpModal: FC<PropsType> = ({ navigation, isModalVisible, closeModal }) => {
  const [countrySelected, setCountrySelected] = useState('');
  const localisationServce = useInjection<ILocalisationService>(Services.Localisation);

  const selectCountry = useCallback(
    async (countryCode: string) => {
      await localisationServce.setUserCountry(countryCode);

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
    [navigation.reset]
  );

  const onValueChange = useCallback(
    async (value: string) => {
      closeModal();
      setCountrySelected(value);
      await AsyncStorageService.setAskedCountryConfirmation(true);
      await selectCountry(value);
    },
    [closeModal, setCountrySelected, selectCountry]
  );

  const renderItem = useCallback(
    (i: Item) => (
      <Picker.Item color={i.value ? undefined : colors.tertiary} key={key(i)} label={i.label} value={i.value} />
    ),
    [colors.tertiary]
  );

  const items: Item[] = [
    { label: i18n.t('united-states'), value: CountryCode.US },
    { label: i18n.t('united-kingdom'), value: CountryCode.GB },
    { label: i18n.t('sweden'), value: CountryCode.SV },
  ];

  if (isAndroid) {
    items.unshift({ label: i18n.t('choose-one-of-these-options'), value: CountryCode.NONE });
  }

  return (
    <Modal animationType="fade" transparent visible={isModalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity testID="closeModal" style={{ alignSelf: 'flex-end' }} onPress={closeModal}>
            <Image source={closeIcon} />
          </TouchableOpacity>
          <RegularText style={styles.titleText}>{i18n.t('your-country-title')}</RegularText>
          <RegularText style={styles.bodyText}>{i18n.t('your-country-text')}</RegularText>

          <Form style={{ marginTop: 32, width: 300 }}>
            <Label style={styles.labelStyle}>{i18n.t('select-country')}</Label>
            <Picker
              testID="countryPicker"
              selectedValue={countrySelected}
              onValueChange={onValueChange}
              iosIcon={<Icon name="arrow-down" />}
              placeholder={i18n.t('choose-one-of-these-options')}>
              {items.map(renderItem)}
            </Picker>
          </Form>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 24,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleText: {
    marginVertical: 16,
    fontSize: 20,
    textAlign: 'center',
  },
  bodyText: {
    textAlign: 'center',
  },
  labelStyle: {
    fontSize: 15,
    lineHeight: 30,
    color: colors.primary,
  },
});

export default React.memo(CountryIpModal);
