import React, {Component} from "react";
import {GestureResponderEvent, StyleSheet} from "react-native";
import Screen, {Header, ProgressBlock, FieldWrapper} from "../../components/Screen";
import {screenWidth} from "../../components/Screen";
import {HeaderText} from "../../components/Text";
import {Text, Form} from "native-base";

import ProgressStatus from "../../components/ProgressStatus";

import {colors, fontStyles} from "../../../theme"
import i18n from "../../locale/i18n"
import UserService, {isUSLocale} from "../../core/user/UserService";
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {BigButton} from "../../components/Button";
import {SelectorButton} from "../../components/SelectorButton";
import {navigateAfterFinishingAssessment} from "../Navigation";


type LocationProps = {
    navigation: StackNavigationProp<ScreenParamList, 'LevelOfIsolation'>
    route: RouteProp<ScreenParamList, 'LevelOfIsolation'>;
}


export default class LevelOfIsolationScreen extends Component<LocationProps> {
    constructor(props: LocationProps) {
        super(props);
    }

    handleSelection = (level_of_isolation: string) => {
        this.updateAssessment(level_of_isolation)
            .then(response => navigateAfterFinishingAssessment(this.props.navigation))
            .catch(err => this.setState({errorMessage: "Something went wrong, please try again later"}));
    };

    private updateAssessment(level_of_isolation: string) {
        const assessmentId = this.props.route.params.assessmentId;
        const userService = new UserService();
        const promise = userService.updateAssessment(assessmentId, {
            level_of_isolation: level_of_isolation
        });
        return promise;
    }

    render() {
        const currentPatient = this.props.route.params.currentPatient;
        return (
            <Screen profile={currentPatient.profile}>
                <Header>
                    <HeaderText>How much have you been isolating over the last week?</HeaderText>
                </Header>

                <ProgressBlock>
                    <ProgressStatus step={5} maxSteps={5}/>
                </ProgressBlock>

                <Form style={styles.form}>
                    <SelectorButton text={"I have not left the house"} onPress={() => this.handleSelection('not_left_the_house')}/>
                    <SelectorButton text={"I rarely leave the house. When I do, I have little interaction with others (eg for exercise)"} onPress={() => this.handleSelection('rarely_left_the_house')}/>
                    <SelectorButton text={"I have to leave the house often and am in contact with other people (eg still working outside the house or using public transport)"} onPress={() => this.handleSelection('often_left_the_house')}/>
                </Form>

            </Screen>
        )
    }
}


const styles = StyleSheet.create({
    form: {
        marginVertical: 32,
    },
});
