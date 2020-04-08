import React, {Component} from "react";
import {Platform, StyleSheet, View} from "react-native";
import Screen, {FieldWrapper, Header, ProgressBlock, screenWidth} from "../../components/Screen";
import {BrandedButton, ClickableText, HeaderText, RegularText} from "../../components/Text";
import {Body, CheckBox, Form, Item, Label, ListItem, Text, Textarea} from "native-base";


import {colors, fontStyles} from "../../../theme"
import UserService from "../../core/user/UserService";
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {Formik} from "formik";
import * as Yup from "yup";
import {GenericTextField} from "../../components/GenericTextField";

const initialFormValues = {
    name: '',
};

interface FormData {
    name: string;
}

type RenderProps = {
    navigation: StackNavigationProp<ScreenParamList, 'CreateProfile'>
    route: RouteProp<ScreenParamList, 'CreateProfile'>;
}


export default class CreateProfileScreen extends Component<RenderProps> {
    constructor(props: RenderProps) {
        super(props);
        this.state = {
            consentChecked: false
        };
        this.handleUpdate = this.handleUpdate.bind(this);

    }

    registerSchema = Yup.object().shape({
        name: Yup.string().required(),
    });

    handleUpdate(formData: FormData) {
        this.props.navigation.navigate("AdultConsent", {profileName: formData.name});
    }

    render() {
        return (
            <Screen>
                <Header>
                    <HeaderText>Give new profile a name</HeaderText>
                    <RegularText>This name is just for you. Choose a name that would allow you to know which person you are reporting for</RegularText>
                </Header>

                 <Formik
                    initialValues={initialFormValues}
                    validationSchema={this.registerSchema}
                    onSubmit={(values: FormData) => {
                        return this.handleUpdate(values)
                    }}
                >
                    {props => {
                        return (
                            <Form>

                                <GenericTextField
                                                formikProps={props}
                                                name="name"
                                                placeholder={'e.g. name, nickname or relation'}
                                            />

                                <BrandedButton onPress={props.handleSubmit}>
                                    <Text style={[fontStyles.bodyLight, styles.buttonText]}>Continue</Text>
                                </BrandedButton>

                            </Form>
                        )
                    }}
                </Formik>


            </Screen>
        )
    }
}


const styles = StyleSheet.create({
    label: {
        marginLeft: 10,
    },

    button: {
        borderRadius: 8,
        height: 56,
        backgroundColor: colors.brand,
    },


    fieldRow: {
        flexDirection: "row",
    },

    primaryField: {
        flex: 3,
    },

    secondaryField: {
        flex: 1,
    },

    picker: {
        width: screenWidth - 16,
        marginTop: 16,
    },

    smallPicker: {
        // width: 40,
    },

    textarea: {
        width: '100%',
    },

    buttonText: {
        color: colors.white,
    },

});
