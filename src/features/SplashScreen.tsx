import {StackNavigationProp} from "@react-navigation/stack";
import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {ApiClientBase} from "../core/user/ApiClientBase";
import {ScreenParamList} from "./ScreenParamList";
import UserService, {isUSLocale} from "../core/user/UserService";
import {AsyncStorageService} from "../core/AsyncStorageService";

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

    private getWelcomeScreenName() {
        return isUSLocale() ? 'WelcomeUS' : 'Welcome'
    }

    private getWelcomeRepeatScreenName() {
        return isUSLocale() ? 'WelcomeRepeatUS' : 'WelcomeRepeat'
    }

    private bootstrapAsync = async () => {
        const {navigation} = this.props;

        await this.userService.setUserCountInAsyncStorage();

        const countryPromise = this.userService.getUserCountry();
        let {userToken, userId} = await AsyncStorageService.GetStoredData();
        const country = await countryPromise;

        if (userToken && userId) {
            ApiClientBase.setToken(userToken, userId);

            // If logged in with no country default to GB as this will handle all GB users before selector was included.
            if (country == null) {
                await this.userService.setUserCountry('GB');
            }

            try {
                const profile = await this.userService.getProfile();
                navigation.replace(this.getWelcomeRepeatScreenName(), {patientId: profile.patients[0]});
            } catch (error) {
                // Logged in with an account doesn't exist. Force logout.
                ApiClientBase.unsetToken();
                await AsyncStorageService.clearData();

                navigation.replace(this.getWelcomeScreenName());
            }
        } else {
            if (country == null) {
                // Using locale to default to a country
                await this.userService.defaultCountryToLocale()
            }
            navigation.replace(this.getWelcomeScreenName());
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
        backgroundColor: "#082A5D"
    }
});
