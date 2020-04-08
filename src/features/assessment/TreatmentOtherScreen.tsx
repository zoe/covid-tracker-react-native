import React, {Component} from "react";
import {Platform, StyleSheet} from "react-native";
import Screen, {FieldWrapper, Header, ProgressBlock, screenWidth} from "../../components/Screen";
import {BrandedButton, HeaderText} from "../../components/Text";
import {Form, Item, Label, Text, Textarea} from "native-base";

import ProgressStatus from "../../components/ProgressStatus";

import {Formik} from "formik";
import * as Yup from "yup";

import {colors, fontStyles} from "../../../theme"
import UserService from "../../core/user/UserService";
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";


const PICKER_WIDTH = (Platform.OS === 'ios') ? undefined : '100%';

const initialFormValues = {
    description: '',
}

interface TreatmentData {
    description: string;
}

type TreatmentOtherProps = {
    navigation: StackNavigationProp<ScreenParamList, 'TreatmentOther'>
    route: RouteProp<ScreenParamList, 'TreatmentOther'>;
}


export default class TreatmentOtherScreen extends Component<TreatmentOtherProps> {
    constructor(props: TreatmentOtherProps) {
        super(props);
        this.handleUpdateTreatment = this.handleUpdateTreatment.bind(this);
    }

    registerSchema = Yup.object().shape({
        description: Yup.string(),
    });

    handleUpdateTreatment(formData: TreatmentData) {

        const {currentPatient, assessmentId, location} = this.props.route.params;
        const goToNextScreen = () => this.props.navigation.navigate('ThankYou');

        if (!formData.description) {
            goToNextScreen();
        } else {
            const userService = new UserService();
            userService.updateAssessment(assessmentId, {
                treatment: formData.description
            }).then(r => goToNextScreen());
        }
    }

    render() {
        return (
            <Screen>
                <Header>
                    <HeaderText>What treatment are you receiving in hospital?</HeaderText>
                </Header>

                <ProgressBlock>
                    <ProgressStatus step={5} maxSteps={5}/>
                </ProgressBlock>

                <Formik
                    initialValues={initialFormValues}
                    validationSchema={this.registerSchema}
                    onSubmit={(values: TreatmentData) => {
                        return this.handleUpdateTreatment(values)
                    }}
                >
                    {props => {
                        return (
                            <Form>
                                <FieldWrapper style={{marginVertical: 64}}>
                                    <Item stackedLabel>
                                        <Label style={{marginBottom: 16}}>What medical treatment are you receiving?</Label>
                                        <Textarea
                                            style={styles.textarea}
                                            rowSpan={5}
                                            bordered
                                            placeholder="*Optional"
                                            value={props.values.description}
                                            onChangeText={props.handleChange("description")}
                                            underline={false}
                                        />
                                    </Item>
                                </FieldWrapper>


                                <BrandedButton onPress={props.handleSubmit}>
                                    <Text style={[fontStyles.bodyLight, styles.buttonText]}>Done</Text>
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

    button: {
        borderRadius: 8,
        height: 56,
        backgroundColor: colors.brand,
    },
    buttonText: {
        color: colors.white,
    },

})
