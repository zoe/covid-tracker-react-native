import React, {Component} from "react";
import {StyleSheet} from "react-native";
import Screen, {Header} from "../../components/Screen";
import {BrandedButton, HeaderText, SecondaryText} from "../../components/Text";
import {Form} from "native-base";
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {Formik} from "formik";
import * as Yup from "yup";
import {GenericTextField} from "../../components/GenericTextField";
import i18n from "../../locale/i18n";

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
        this.handleClick = this.handleClick.bind(this);
    }

    registerSchema = Yup.object().shape({
        name: Yup.string().required(),
    });

    handleClick(formData: FormData) {
        this.props.navigation.navigate("AdultOrChild", {profileName: formData.name, avatarName: this.props.route.params.avatarName});
    }

    render() {
        return (
            <Screen>
                <Header>
                    <HeaderText style={{marginBottom: 12}}>{i18n.t("create-profile-title")}</HeaderText>
                    <SecondaryText>{i18n.t("create-profile-text")}</SecondaryText>
                </Header>

                <Formik
                    initialValues={initialFormValues}
                    validationSchema={this.registerSchema}
                    onSubmit={(values: FormData) => {
                        return this.handleClick(values)
                    }}
                >
                    {props => {
                        return (
                            <Form>

                                <GenericTextField
                                    formikProps={props}
                                    name="name"
                                    placeholder={i18n.t("create-profile-placeholder")}
                                />

                                <BrandedButton onPress={props.handleSubmit}>
                                    {i18n.t("create-profile-button")}
                                </BrandedButton>

                            </Form>
                        )
                    }}
                </Formik>

            </Screen>
        )
    }
}


const styles = StyleSheet.create({});
