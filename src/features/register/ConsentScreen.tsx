import React, {Component} from "react";
import {Linking, ScrollView, StyleSheet, View} from "react-native";
import {Body, CheckBox, ListItem} from "native-base"
import {StackNavigationProp} from "@react-navigation/stack";
import {colors} from "../../../theme";
import {BrandedButton, ClickableText, RegularBoldText, RegularText} from "../../components/Text";
import UserService, {isUSCountry} from "../../core/user/UserService";
import {ScreenParamList} from "../ScreenParamList";
import {consentVersionUK, consentVersionUS, privacyPolicyVersionUK, privacyPolicyVersionUS} from "./constants";
import {RouteProp} from "@react-navigation/native";


type PropsType = {
    navigation: StackNavigationProp<ScreenParamList, 'Consent'>
    route: RouteProp<ScreenParamList, 'Consent'>;
}

interface TermsState {
    processingChecked: boolean,
    termsOfUseChecked: boolean
}

export class ConsentScreen extends Component<PropsType, TermsState> {
    private userService = new UserService();

    constructor(props: PropsType) {
        super(props);
        this.state = {
            processingChecked: false,
            termsOfUseChecked: false,
        }
    }

    viewOnly = this.props.route.params.viewOnly;

    handleProcessingChange = () => {
        this.setState({processingChecked: !this.state.processingChecked})
    };

    handleTermsOfUseChange = () => {
        this.setState({termsOfUseChecked: !this.state.termsOfUseChecked})
    };

    handleUSAgreeClicked = async () => {
        if (this.state.processingChecked && this.state.termsOfUseChecked) {
            await this.userService.setConsentSigned("US", consentVersionUS, privacyPolicyVersionUS);
            this.props.navigation.navigate('Register')
        }
    };

    handleUKAgreeClicked = async () => {
        await this.userService.setConsentSigned("UK", consentVersionUK, privacyPolicyVersionUK);
        this.props.navigation.navigate('Register')
    };


    render() {
        // Get US or UK
        return (
            isUSCountry() ? (
                <View style={styles.rootContainer}>
                    <ScrollView>
                        <RegularText>
                            If you are in an existing research or clinical study (e.g. Nurses’ Health Studies) and you want your data to be shared with investigators on that study, <ClickableText
                            onPress={() => this.props.navigation.navigate('NursesConsentUS', {viewOnly: this.viewOnly})}>click here</ClickableText>
                            {"\n"}
                        </RegularText>

                        <RegularBoldText>Purpose{"\n"}</RegularBoldText>
                        <RegularText>
                            By using this app and tracking if you are well or have symptoms, you will be helping medical science and healthcare providers across the country (such as Massachusetts General Hospital) to better understand Coronavirus (COVID-19).
                            {"\n\n"}
                            This app allows you to help others, but does not give health advice. If you need health advice please visit the CDC Coronavirus website {" "}
                            <ClickableText onPress={() => this.openUrl('https://www.cdc.gov/coronavirus/2019-ncov/index.html')}>https://www.cdc.gov/coronavirus/2019-ncov/index.html</ClickableText>
                            {"\n"}
                        </RegularText>

                        <RegularBoldText>Information sharing{"\n"}</RegularBoldText>
                        <RegularText>
                            This app is designed by doctors and scientists at Massachusetts General Hospital, Harvard School of Public Health, Stanford University, King's College London and Zoe Global Limited, a health technology company. They have access to the information you enter, which may also
                            be shared with hospitals listed in our privacy notice.
                            {"\n\n"}
                            No information you share will be used for commercial purposes. An anonymous code will be used to replace your personal details when sharing information with researchers beyond those mentioned above.
                        </RegularText>

                        <RegularBoldText>
                            {"\n"}
                            Your consent
                            {"\n"}
                        </RegularBoldText>
                        <RegularText>
                            By checking the box below, you consent to our using the personal information we collect through your use of this app in the way we have described.
                            {"\n\n"}
                            For more information about how we use and share personal information about you, please see our {" "}
                            <ClickableText onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', {viewOnly: this.viewOnly})}>privacy policy</ClickableText>.{"\n\n"}
                            You may withdraw your consent at any time by emailing <RegularBoldText>leavecovidtracking-us@joinzoe.com</RegularBoldText>
                            {"\n\n"}
                            Any questions may be sent to <RegularBoldText>covidtrackingquestions-us@joinzoe.com</RegularBoldText>
                        </RegularText>

                        {
                            !this.viewOnly && (
                                <View>
                                    <ListItem style={styles.permission}>
                                        <CheckBox
                                            checked={this.state.processingChecked}
                                            onPress={this.handleProcessingChange}
                                        />
                                        <Body style={styles.label}>
                                            <RegularText>
                                                I consent to the processing of my personal data (including without limitation data I provide relating to my health)
                                                as set forth in this consent and in the{" "}
                                                <ClickableText onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', {viewOnly: this.viewOnly})}>Privacy Policy</ClickableText>
                                                .
                                            </RegularText>
                                        </Body>
                                    </ListItem>
                                    <ListItem>
                                        <CheckBox
                                            checked={this.state.termsOfUseChecked}
                                            onPress={this.handleTermsOfUseChange}
                                        />
                                        <Body style={styles.label}>
                                            <RegularText>
                                                I have read and accept Zoe Global’s {" "}
                                                <ClickableText onPress={() => this.props.navigation.navigate('TermsOfUseUS', {viewOnly: this.viewOnly})}>Terms of Use</ClickableText>{" "}
                                                and{" "}
                                                <ClickableText onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', {viewOnly: this.viewOnly})}>Privacy Policy</ClickableText>.
                                            </RegularText>
                                        </Body>
                                    </ListItem>
                                </View>
                            )
                        }

                    </ScrollView>

                    {
                        !this.viewOnly &&
                        <BrandedButton
                          style={styles.button}
                          enable={this.state.processingChecked && this.state.termsOfUseChecked}
                          hideLoading={true}
                          onPress={this.handleUSAgreeClicked}>I agree</BrandedButton>
                    }
                </View>
            ) : (
                <View style={styles.rootContainer}>
                    <ScrollView>

                        <RegularText>
                            By using this app and tracking if you are well or have symptoms, you will be helping medical science and the NHS to better understand Coronavirus (COVID-19).
                            {"\n\n"}
                            This app allows you to help others, but does not give health advice. If you need health advice please visit the NHS website: {" "}
                            <ClickableText onPress={() => this.openUrl('https://www.nhs.uk/conditions/coronavirus-covid-19/')}>https://www.nhs.uk/conditions/coronavirus-covid-19/</ClickableText>
                            {"\n"}
                        </RegularText>

                        <RegularBoldText>Information sharing{"\n"}</RegularBoldText>
                        <RegularText>
                            This app is designed by doctors and scientists at Kings’ College London, Guys and St Thomas’ Hospitals and Zoe Global Limited, a health technology company.
                            They have access to the information you enter, which may also be shared with the NHS and other medical researchers as outlined in our
                            {" "}<ClickableText onPress={() => this.props.navigation.navigate('PrivacyPolicyUK', {viewOnly: this.viewOnly})}>privacy notice</ClickableText>.{"\n\n"}
                            {"\n"}
                            No information you share will be used for commercial purposes. An anonymous code will be used to replace your personal details when sharing information with other researchers.
                        </RegularText>

                        <RegularBoldText>
                            {"\n"}
                            Your consent
                            {"\n"}
                        </RegularBoldText>
                        <RegularText>
                            By clicking below, you consent to our using the personal information we collect through your use of this app in the way we have described.
                            {"\n\n"}
                            We may share your data with medical research collaborators outside the UK (eg Harvard Medical School). Before sharing any of your data with any medical researcher outside of the UK,
                            we will remove your name, phone number if provided, email address and anonymise your full postcode by removing the inward code (last three characters) or mapping it to an LSOA code to protect your privacy. By clicking below, you consent to us sharing
                            your personal information on this basis.
                            {"\n\n"}
                            We adhere to the General Data Protection Regulation ‘GDPR’. For more information about how we use and share personal information about you, please see our
                            {" "}<ClickableText onPress={() => this.props.navigation.navigate('PrivacyPolicyUK', {viewOnly: this.viewOnly})}>privacy notice</ClickableText>.{"\n\n"}
                            You may withdraw your consent at any time by emailing <RegularBoldText>leavecovidtracking@joinzoe.com</RegularBoldText>
                            {"\n\n"}
                            Any questions may be sent to <RegularBoldText>covidtrackingquestions@joinzoe.com</RegularBoldText>
                        </RegularText>

                    </ScrollView>

                    {
                        !this.viewOnly &&
                        <BrandedButton style={styles.button} onPress={this.handleUKAgreeClicked}>I agree</BrandedButton>
                    }

                </View>
            )
        );
    }

    private openUrl(link: string) {
        Linking.openURL(link);
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.backgroundPrimary,
        paddingHorizontal: 24,
        paddingVertical: 24
    },
    button: {
        marginTop: 20,
    },
    permission: {
        alignItems: "flex-start"
    },
    label: {
        marginLeft: 10,
    }
});
