import React, {Component} from "react";
import {StyleSheet} from "react-native";
import Screen, {FieldWrapper, Header, ProgressBlock} from "../../components/Screen";
import {CaptionText, HeaderText} from "../../components/Text";
import {Form, Text} from "native-base";

import ProgressStatus from "../../components/ProgressStatus";

import i18n from "../../locale/i18n"
import {colors, fontStyles} from "../../../theme"
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import UserService from "../../core/user/UserService";
import {BigButton} from "../../components/Button";
import {navigateAfterFinishingAssessment} from "../Navigation";


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
        const {currentPatient, assessmentId, location} = this.props.route.params;
        const userService = new UserService();

        if (treatment == 'other') {
            this.props.navigation.navigate('TreatmentOther', {currentPatient, assessmentId, location});
        } else {
            userService.updateAssessment(assessmentId, {
                treatment: treatment
            }).then(r => {
                navigateAfterFinishingAssessment(this.props.navigation);
            });
        }
    }

    render() {
        const currentPatient = this.props.route.params.currentPatient;
        const title = this.props.route.params.location == 'back_from_hospital' ?
            i18n.t('treatment-selection-title-after')
            : i18n.t('treatment-selection-title-during');

        return (
            <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
                <Header>
                    <HeaderText>{title}</HeaderText>
                </Header>

                <ProgressBlock>
                    <ProgressStatus step={4} maxSteps={5}/>
                </ProgressBlock>

                <Form style={styles.form}>


                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={() => this.handleTreatment('none')}>
                            <Text>{i18n.t('treatment-selection-picker-none')}</Text>
                        </BigButton>
                    </FieldWrapper>

                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={() => this.handleTreatment('oxygen')}>
                            <Text>{i18n.t('treatment-selection-picker-oxygen')}</Text>
                        </BigButton>
                        <CaptionText style={styles.indentedText}>{i18n.t('treatment-selection-picker-subtext-oxygen')}</CaptionText>
                    </FieldWrapper>

                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={() => this.handleTreatment('nonInvasiveVentilation')}>
                            <Text>{i18n.t('treatment-selection-picker-non-invasive-ventilation')}</Text>
                        </BigButton>
                        <CaptionText style={styles.indentedText}>{i18n.t('treatment-selection-picker-subtext-non-invasive-ventilation')}</CaptionText>
                    </FieldWrapper>


                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={() => this.handleTreatment('invasiveVentilation')}>
                            <Text>{i18n.t('treatment-selection-picker-invasive-ventilation')}</Text>
                        </BigButton>
                        <CaptionText style={styles.indentedText}>{i18n.t('treatment-selection-picker-subtext-invasive-ventilation')}</CaptionText>
                    </FieldWrapper>


                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={() => this.handleTreatment('other')}>
                            <Text>{i18n.t('treatment-selection-picker-other')}</Text>
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
