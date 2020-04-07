import React, {Component} from "react";
import {StyleSheet} from "react-native";
import Screen, {FieldWrapper, Header, screenWidth} from "../../components/Screen";
import {HeaderText} from "../../components/Text";
import {Form, Text} from "native-base";

import {colors, fontStyles} from "../../../theme"
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {BigButton} from "../../components/Button";


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
                        <BigButton onPress={() => this.props.navigation.navigate('NursesConsentUS')}>
                            <Text style={[fontStyles.bodyLight, styles.buttonText]}>Yes, I am</Text>
                        </BigButton>
                    </FieldWrapper>

                    <FieldWrapper style={styles.fieldWrapper}>
                        <BigButton onPress={() => this.props.navigation.navigate('Terms')}>
                            <Text style={[fontStyles.bodyLight, styles.buttonText]}>No, I am not</Text>
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
