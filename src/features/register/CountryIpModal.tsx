import {Image, Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import React, {Component} from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RegularText} from "../../components/Text";
import i18n from "../../locale/i18n"
import {colors} from "../../../theme";
import {Form, Icon, Label, Picker} from "native-base";
import DropdownField from "../../components/DropdownField";
import {closeIcon} from "../../../assets";
import UserService from "../../core/user/UserService";
import {isAndroid} from "../../components/Screen";
import {AsyncStorageService} from "../../core/AsyncStorageService";

type PropsType = {
    navigation: StackNavigationProp<ScreenParamList, 'Welcome'>
    isModalVisible: boolean
    closeModal: () => void
}

type StateType = {
    countrySelected: string
}

const US_CODE = 'US';
const GB_CODE = 'GB';

export default class CountryIpModal extends Component<PropsType, StateType> {
    userService = new UserService();
    state = {
        countrySelected: ''
    };

    async onValueChange(value: string) {
        this.props.closeModal()
        this.setState({
            countrySelected: value
        });
        await AsyncStorageService.setAskedCountryConfirmation(true);
        this.selectCountry(value)
    }

    render() {
        const {isModalVisible} = this.props;
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={this.props.closeModal}>
                            <Image source={closeIcon}/>
                        </TouchableOpacity>
                        <RegularText style={styles.titleText}>{i18n.t('your-country-title')}</RegularText>
                        <RegularText style={styles.bodyText}>{i18n.t('your-country-text')}</RegularText>

                        <Form style={{marginTop: 32, width: 300}}>
                            <Label style={styles.labelStyle}>{i18n.t('select-country')}</Label>
                            <Picker
                                selectedValue={this.state.countrySelected}
                                onValueChange={this.onValueChange.bind(this)}
                                placeholder={i18n.t('choose-one-of-these-options')}
                            >
                                {isAndroid &&
                                <Picker.Item label={i18n.t('choose-one-of-these-options')} value=''/>}
                                <Picker.Item label={i18n.t('united-states')} value={US_CODE}/>
                                <Picker.Item label={i18n.t('united-kingdom')} value={GB_CODE}/>
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
                    {name: 'WelcomeUS', params: {}},
                    {name: 'BeforeWeStartUS', params: {}},
                ]

            } else {
                return [
                    {name: 'Welcome', params: {}},
                    {name: 'Terms', params: {}},
                ]
            }
        };

        this.props.navigation.reset({
            index: 0,
            routes: screenStack(),
        })
    };
}

const styles = StyleSheet.create({
    centeredView: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 24,
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 24,
        alignItems: "center",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    titleText: {
        marginVertical: 16,
        fontSize: 20,
        textAlign: "center"
    },
    bodyText: {
        textAlign: "center"
    },
    labelStyle: {
        fontSize: 15,
        lineHeight: 30,
        color: colors.primary
    },
});