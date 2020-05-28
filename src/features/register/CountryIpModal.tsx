import { ITest } from '@covid/components/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Form, Icon, Label, Picker } from 'native-base';
import React, { Component } from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import key from 'weak-key';

import { closeIcon } from '@assets';
import { colors } from '@theme';
import { isAndroid } from '@covid/components/Screen';
import { RegularText } from '@covid/components/Text';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import UserService from '@covid/core/user/UserService';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '../ScreenParamList';

interface PropsType extends ITest {
  navigation: StackNavigationProp<ScreenParamList, 'Welcome'>;
  isModalVisible: boolean;
  closeModal: () => void;
}

type StateType = {
  countrySelected: string;
};

const US_CODE = 'US';
const GB_CODE = 'GB';
const SV_CODE = 'SE';

export default class CountryIpModal extends Component<PropsType, StateType> {
  userService = new UserService();
  state = {
    countrySelected: '',
  };

  async onValueChange(value: string) {
    this.props.closeModal();
    this.setState({
      countrySelected: value,
    });
    await AsyncStorageService.setAskedCountryConfirmation(true);
    this.selectCountry(value);
  }

  render() {
    const { isModalVisible } = this.props;
    const items = [
      { label: i18n.t('united-states'), value: US_CODE },
      { label: i18n.t('united-kingdom'), value: GB_CODE },
      { label: i18n.t('sweden'), value: SV_CODE },
    ];

    if (isAndroid) {
      items.unshift({ label: i18n.t('choose-one-of-these-options'), value: '' });
    }

    return (
      <Modal animationType="fade" transparent visible={isModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={this.props.closeModal}>
              <Image source={closeIcon} />
            </TouchableOpacity>
            <RegularText style={styles.titleText}>{i18n.t('your-country-title')}</RegularText>
            <RegularText style={styles.bodyText}>{i18n.t('your-country-text')}</RegularText>

            <Form style={{ marginTop: 32, width: 300 }}>
              <Label style={styles.labelStyle}>{i18n.t('select-country')}</Label>
              <Picker
                selectedValue={this.state.countrySelected}
                onValueChange={this.onValueChange.bind(this)}
                iosIcon={<Icon name="arrow-down" />}
                placeholder={i18n.t('choose-one-of-these-options')}>
                {items.map((i) => (
                  <Picker.Item
                    color={i.value ? undefined : colors.tertiary}
                    key={key(i)}
                    label={i.label}
                    value={i.value}
                  />
                ))}
              </Picker>
            </Form>
          </View>
        </View>
      </Modal>
    );
  }

  private selectCountry = async (countryCode: string) => {
    await this.userService.setUserCountry(countryCode);

    const screenStack = () => {
      if (countryCode == US_CODE) {
        return [
          { name: 'Welcome', params: {} },
          { name: 'BeforeWeStartUS', params: {} },
        ];
      } else {
        return [
          { name: 'Welcome', params: {} },
          { name: 'Consent', params: {} },
        ];
      }
    };

    this.props.navigation.reset({
      index: 0,
      routes: screenStack(),
    });
  };
}

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
