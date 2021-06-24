import { closeIcon } from '@assets';
import { RegularText } from '@covid/components/Text';
import { ITest } from '@covid/components/types';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import { ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { isAndroid } from '@covid/utils/platform';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Form, Icon, Label, Picker } from 'native-base';
import * as React from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import key from 'weak-key';

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
  const localisationServce = useInjection<ILocalisationService>(Services.Localisation);

  const selectCountry = React.useCallback(
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

  const renderItem = React.useCallback(
    (i: Item) => (
      <Picker.Item
        color={i.value ? undefined : colors.tertiary}
        key={key(i)}
        label={i.label}
        testID={`picker-item-${i.value || 'none'}`}
        value={i.value}
      />
    ),
    [colors.tertiary],
  );

  const items: Item[] = [
    { label: i18n.t('united-states'), value: CountryCode.US },
    { label: i18n.t('united-kingdom'), value: CountryCode.GB },
    { label: i18n.t('sweden'), value: CountryCode.SV },
  ];

  if (isAndroid) {
    items.unshift({ label: i18n.t('label-chose-an-option'), value: CountryCode.NONE });
  }

  return (
    <Modal transparent animationType="fade" visible={isModalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={closeModal} style={{ alignSelf: 'flex-end' }} testID="close-modal">
            <Image source={closeIcon} />
          </TouchableOpacity>
          <RegularText style={styles.titleText}>{i18n.t('your-country-title')}</RegularText>
          <RegularText style={styles.bodyText}>{i18n.t('your-country-text')}</RegularText>

          <Form style={{ marginTop: 32, width: 300 }}>
            <Label style={styles.labelStyle}>{i18n.t('select-country')}</Label>
            <Picker
              iosIcon={<Icon name="arrow-down" />}
              onValueChange={onValueChange}
              placeholder={i18n.t('label-chose-an-option')}
              selectedValue={countrySelected}
              testID="country-picker"
            >
              {items.map(renderItem)}
            </Picker>
          </Form>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  bodyText: {
    textAlign: 'center',
  },
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
    alignItems: 'center',
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
