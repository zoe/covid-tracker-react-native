import React, {Component} from "react";
import {StyleSheet} from "react-native";
import Screen, {FieldWrapper, Header, ProgressBlock} from "../../components/Screen";
import {CaptionText, HeaderText} from "../../components/Text";
import {Form, Text} from "native-base";

import ProgressStatus from "../../components/ProgressStatus";

import {colors, fontStyles} from "../../../theme"
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import UserService from "../../core/user/UserService";
import {BigButton} from "../../components/Button";
import {getThankYouScreen} from "../Navigation";


type TreatmentSelectionProps = {
    navigation: StackNavigationProp<ScreenParamList, 'TreatmentSelection'>
    route: RouteProp<ScreenParamList, 'TreatmentSelection'>;
}


export default class TreatmentSelectionScreen extends Component<TreatmentSelectionProps> {
    constructor(props: TreatmentSelectionProps) {
        super(props);
        this.handleTreatment = this.handleTreatment.bind(this);
    }


    handleTreatment(treatment: string) {
        const assessmentId = this.props.route.params.assessmentId;
        const location = this.props.route.params.location;

        const userService = new UserService();

        if (treatment == 'other') {
            this.props.navigation.navigate('TreatmentOther', {assessmentId: assessmentId, location: location});
        } else {
            userService.updateAssessment(assessmentId, {
                treatment: treatment
            }).then(r => {
                this.props.navigation.navigate(getThankYouScreen());
            });
        }
    }

    render() {

        const title = this.props.route.params.location == 'back_from_hospital' ?
            "What treatment did you receive while in the hospital?"
            : "What treatment are you receiving right now?";

        return (
            <Screen>
                <Header>
                    <HeaderText>{title}</HeaderText>
                </Header>

                <ProgressBlock>
                    <ProgressStatus step={4} maxSteps={5}/>
                </ProgressBlock>

                <Form style={styles.form}>


                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={() => this.handleTreatment('none')}>
                            <Text>None</Text>
                        </BigButton>
                    </FieldWrapper>

                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={() => this.handleTreatment('oxygen')}>
                            <Text>Oxygen and fluids*</Text>
                        </BigButton>
                        <CaptionText style={styles.indentedText}>* Breathing support through an oxygen mask, no pressure applied.</CaptionText>
                    </FieldWrapper>

                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={() => this.handleTreatment('nonInvasiveVentilation')}>
                            <Text>Non-invasive ventilation*</Text>
                        </BigButton>
                        <CaptionText style={styles.indentedText}>* Breathing support through an oxygen mask, which pushes oxygen into your lungs.</CaptionText>
                    </FieldWrapper>


                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={() => this.handleTreatment('invasiveVentilation')}>
                            <Text>Invasive ventilation*</Text>
                        </BigButton>
                        <CaptionText style={styles.indentedText}>* Breathing support through an inserted tube. People are usually asleep for this procedure.</CaptionText>
                    </FieldWrapper>


                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={() => this.handleTreatment('other')}>
                            <Text>Other </Text>
                        </BigButton>
                    </FieldWrapper>
                </Form>

            </Screen>
        )
    }
}


const styles = StyleSheet.create({

    form: {
        marginVertical: 24,
    },

    fieldWrapper: {
        marginVertical: 8,
    },

    indentedText: {
        marginHorizontal: 16,
        marginTop: 8,
        textAlign: "center",
    },
});
