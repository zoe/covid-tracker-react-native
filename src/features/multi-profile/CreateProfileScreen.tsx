import React, {Component} from "react";
import {StyleSheet} from "react-native";
import Screen, {Header} from "../../components/Screen";
import {BrandedButton, HeaderText, RegularText} from "../../components/Text";
import {Form} from "native-base";
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
                    <HeaderText>Give new profile a name</HeaderText>
                    <RegularText>This name is just for you. Choose a name that would allow you to know which person you are reporting for</RegularText>
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
                                    placeholder={'e.g. name, nickname or relation'}
                                />

                                <BrandedButton onPress={props.handleSubmit}>
                                    Continue
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
