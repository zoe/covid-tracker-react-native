import {StackNavigationProp} from "@react-navigation/stack";
import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {ApiClientBase} from "../core/user/ApiClientBase";
import {ScreenParamList} from "./ScreenParamList";
import UserService, {isUSLocale} from "../core/user/UserService";
import {AsyncStorageService} from "../core/AsyncStorageService";
import {colors} from "../../theme";

type SplashScreenNavigationProp = StackNavigationProp<ScreenParamList, 'Splash'>;
type Props = {
    navigation: SplashScreenNavigationProp;
};

export class SplashScreen extends Component<Props, {}> {
    private userService = new UserService();

    constructor(props: Props) {
        super(props);
        this.bootstrapAsync();
    }

    private bootstrapAsync = async () => {
        const {navigation} = this.props;
        let country: string|null = null;

        try {
            await this.userService.getStartupInfo();
            country = await this.userService.getUserCountry();
        } catch (err) {
            // TODO: how to deal with the user_startup info endpoint failing?
        }

        let {userToken, userId} = await AsyncStorageService.GetStoredData();

        if (userToken && userId) {
            ApiClientBase.setToken(userToken, userId);

            // If logged in with no country default to GB as this will handle all GB users before selector was included.
            if (country == null) {
                await this.userService.setUserCountry('GB');
            }

            try {
                const profile = await this.userService.getProfile();
                navigation.replace('WelcomeRepeat', {patientId: profile.patients[0]});
            } catch (error) {
                // Logged in with an account doesn't exist. Force logout.
                ApiClientBase.unsetToken();
                await AsyncStorageService.clearData();

                navigation.replace('Welcome');
            }
        } else {
            if (country == null) {
                // Using locale to default to a country
                await this.userService.defaultCountryFromLocale()
            }
            navigation.replace('Welcome');
        }
    };

    public render() {
        return (
            <View style={styles.container}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.predict
    }
});
