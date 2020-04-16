import React, {Component} from "react";
import {StyleSheet} from "react-native";
import Screen, {FieldWrapper, Header} from "../../../components/Screen";
import {HeaderText} from "../../../components/Text";
import {Form, Text} from "native-base";
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../../ScreenParamList";
import {BigButton} from "../../../components/Button";


type HowYouFeelProps = {
    navigation: StackNavigationProp<ScreenParamList, 'BeforeWeStartUS'>
}

type State = {
    errorMessage: string;
}

const initialState: State = {
    errorMessage: ""
};


export default class BeforeWeStart extends Component<HowYouFeelProps, State> {
    constructor(props: HowYouFeelProps) {
        super(props);
        this.state = initialState;
    }

    render() {
        return (
            <Screen>
                <Header>
                    <HeaderText>I am in an existing research study or trial, and I want my data to be shared with investigators on that study.</HeaderText>
                </Header>

                <Form style={styles.form}>
                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={() => this.props.navigation.navigate('NursesConsentUS', {viewOnly: false})}>
                            <Text>Yes, I am</Text>
                        </BigButton>
                    </FieldWrapper>

                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={() => this.props.navigation.navigate('Consent', {viewOnly: false})}>
                            <Text>No, I am not</Text>
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
});
