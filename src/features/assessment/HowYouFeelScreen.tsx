import React, {Component} from "react";
import {StyleSheet} from "react-native";
import Screen, {Header, ProgressBlock, FieldWrapper} from "../../components/Screen";
import {screenWidth} from "../../components/Screen";
import {HeaderText} from "../../components/Text";
import {Text, Form} from "native-base";

import ProgressStatus from "../../components/ProgressStatus";

import {colors, fontStyles} from "../../../theme"
import i18n from "../../locale/i18n"
import UserService from "../../core/user/UserService";
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {BigButton} from "../../components/Button";
import {getThankYouScreen} from "../Navigation";


type HowYouFeelProps = {
    navigation: StackNavigationProp<ScreenParamList, 'HowYouFeel'>
    route: RouteProp<ScreenParamList, 'HowYouFeel'>;
}

type State = {
    errorMessage: string;
}

const initialState: State = {
    errorMessage: ""
};


export default class HowYouFeelScreen extends Component<HowYouFeelProps, State> {
    constructor(props: HowYouFeelProps) {
        super(props);
        this.state = initialState;

        // Fix reference to `this` inside these functions
        this.handleFeelNormal = this.handleFeelNormal.bind(this);
        this.handleHaveSymptoms = this.handleHaveSymptoms.bind(this);
    }

    handleFeelNormal() {
        this.updateAssessment('healthy')
            .then(response => this.props.navigation.navigate(getThankYouScreen()))
            .catch(err => this.setState({errorMessage: "Something went wrong, please try again later"}));
    }

    handleHaveSymptoms() {
        const currentPatient = this.props.route.params.currentPatient;
        this.updateAssessment('not_healthy')
            .then(response => this.props.navigation.navigate('DescribeSymptoms', {currentPatient, assessmentId: response.data.id}))// todo julien: thank you
            .catch(err => this.setState({errorMessage: "Something went wrong, please try again later"}));
    }

    private updateAssessment(status: string) {
        const assessmentId = this.props.route.params.assessmentId;
        const userService = new UserService();
        const promise = userService.updateAssessment(assessmentId, {
            health_status: status
        });
        return promise;
    }

    render() {
        return (
            <Screen>
                <Header>
                    <HeaderText>How do you feel physically right now?</HeaderText>
                </Header>

                <ProgressBlock>
                    <ProgressStatus step={3} maxSteps={5}/>
                </ProgressBlock>

                <Form style={styles.form}>


                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={this.handleFeelNormal}>
                            <Text style={[fontStyles.bodyLight, styles.buttonText]}>{i18n.t("feel-normal")}</Text>
                        </BigButton>
                    </FieldWrapper>

                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={this.handleHaveSymptoms}>
                            <Text style={[fontStyles.bodyLight, styles.buttonText]}>{i18n.t("have-symptoms")}</Text>
                        </BigButton>
                    </FieldWrapper>

                </Form>

            </Screen>
        )
    }
}


const styles = StyleSheet.create({

    form: {
        marginVertical: 32,
    },

    fieldWrapper: {
        marginVertical: 32,
    },

    buttonText: {
        color: colors.primary,
    },

});
