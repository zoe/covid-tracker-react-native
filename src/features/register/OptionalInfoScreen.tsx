import React, {Component} from "react";
import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {Form} from 'native-base';
import {colors} from "../../../theme";
import {Formik} from "formik";
import * as Yup from "yup";
import {ValidatedTextInput} from "../../components/ValidatedTextInput";
import UserService, {isGBLocale, isUSLocale} from "../../core/user/UserService";
import {BrandedButton, ErrorText, HeaderText, RegularText} from "../../components/Text";
import {RouteProp} from '@react-navigation/native';
import {ScreenParamList} from "../ScreenParamList";
import {PiiRequest} from "../../core/user/dto/UserAPIContracts";
import {PushNotificationService} from "../../core/PushNotificationService";
import {AsyncStorageService} from "../../core/AsyncStorageService";
import Constants from 'expo-constants';

type PropsType = {
    navigation: StackNavigationProp<ScreenParamList, 'OptionalInfo'>
    route: RouteProp<ScreenParamList, 'OptionalInfo'>;

}

type State = {
    errorMessage: string;
}

const initialState: State = {
    errorMessage: ""
};

interface OptionalInfoData {
    name: string;
    phone: string;
}

export class OptionalInfoScreen extends Component<PropsType, State> {
    private phoneComponent: any;

    constructor(props: PropsType) {
        super(props);
        this.state = initialState;
    }

    private getWelcomeRepeatScreenName() {
        return isUSLocale() ? 'WelcomeRepeatUS' : 'WelcomeRepeat'
    }

    private async handleSaveOptionalInfos(formData: OptionalInfoData) {
        const patientId = this.props.route.params.user.patients[0];
        const userService = new UserService();

        const currentPatient = await userService.getCurrentPatient(patientId);
        const consent = await userService.getConsentSigned();

        const nextScreen = ((isUSLocale() && consent && consent.document === "US Nurses") || isGBLocale())
            ? {name: "YourStudy", params: {currentPatient}}
            : {name: "YourWork", params: {currentPatient}};

        const goToNextScreen = () => {
            this.props.navigation.reset({
                index: 0,
                routes: [
                    {name: this.getWelcomeRepeatScreenName(), params: {patientId: patientId}},
                    nextScreen
                ],
            })
        };

        if (Constants.appOwnership !== 'expo') {
            const pushToken = await PushNotificationService.getPushToken(false);
            if (pushToken) {
                try {
                    await userService.savePushToken(pushToken);
                    AsyncStorageService.setPushToken(pushToken);
                } catch (error) {
                    this.setState({errorMessage: 'Something went wrong... try again later'});
                }
            }
        }

        const hasFormData = formData.phone?.trim() || formData.name?.trim()

        if (!hasFormData) {
            goToNextScreen();
        } else {
            let piiDoc = formData.name ? {
                name: formData.name
            } : {} as unknown as Partial<PiiRequest>;

            if (formData.phone) {
                piiDoc = {
                    ...piiDoc,
                    phone_number: formData.phone
                }
            }

            userService.updatePii(piiDoc)
                .then(() => {
                    goToNextScreen()
                }).catch(err => {
                this.setState({errorMessage: 'Something went wrong... try again later'});
                console.log(err.response.data);
            })
        }

    }

    // see http://regexlib.com/(X(1)A(TahywDmnNCw0iyuu7jNEB2AWTPaTyZQd-r8XZECVzmio5oP08fV7JoAWrNnIoyH3vysaiCJYtQO_FfuRAXJRSwB8zqAr_L9ddGD5V0eCJcVBJ65SiOnOt1tLVw4pd_Q3Q0FoUOPG5fXsbR6DHK6jqtBaIxnP0NL5oevVH6y0uSXhYgbCrrRx1DeE-59F0s5i0))/UserPatterns.aspx?authorid=d95177b0-6014-4e73-a959-73f1663ae814&AspxAutoDetectCookieSupport=1
    registerSchema = Yup.object().shape({
        name: Yup.string(),
        phone: Yup.string()
    });

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.rootContainer} behavior={Platform.OS === "ios" ? "padding" : undefined}>

                    <Formik
                        initialValues={{name: "", phone: ""}}
                        validationSchema={this.registerSchema}
                        onSubmit={(values: OptionalInfoData) => this.handleSaveOptionalInfos(values)}
                    >
                        {props => {
                            return (
                                <View>

                                    <View>
                                        <HeaderText style={{marginBottom: 24}}>Optional contact information</HeaderText>

                                        <RegularText>
                                            Please share your name and phone number. This is optional. If you want to share your information with another study this will help us identify you.
                                        </RegularText>

                                        <Form>

                                            <ValidatedTextInput
                                                placeholder="Your name"
                                                value={props.values.name}
                                                onChangeText={props.handleChange("name")}
                                                onBlur={props.handleBlur("name")}
                                                error={props.touched.name && props.errors.name}
                                                returnKeyType="next"
                                                onSubmitEditing={() => {
                                                    this.phoneComponent.focus();
                                                }}
                                            />

                                            <ValidatedTextInput
                                                ref={(input) => this.phoneComponent = input}
                                                placeholder="Phone number"
                                                value={props.values.phone}
                                                onChangeText={props.handleChange("phone")}
                                                onBlur={props.handleBlur("phone")}
                                                error={props.touched.phone && props.errors.phone}
                                            />
                                            {props.errors.phone && (
                                                <ErrorText>{props.errors.phone}</ErrorText>
                                            )}
                                        </Form>
                                    </View>
                                    <View>
                                        <ErrorText>{this.state.errorMessage}</ErrorText>
                                    </View>

                                    <View>
                                        <BrandedButton onPress={props.handleSubmit}>Continue</BrandedButton>
                                    </View>
                                </View>
                            );
                        }}
                    </Formik>


                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.backgroundPrimary,
        paddingHorizontal: 24,
        paddingTop: 56
    },

});
