import {StackNavigationProp} from "@react-navigation/stack";
import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {ApiClientBase} from "../core/user/ApiClientBase";
import {ScreenParamList} from "./ScreenParamList";
import UserService from "../core/user/UserService";
import {AsyncStorageService} from "../core/AsyncStorageService";
import {colors} from "../../theme";
import Navigator from "./Navigation";

type SplashScreenNavigationProp = StackNavigationProp<ScreenParamList, 'Splash'>;
type Props = {
    navigation: SplashScreenNavigationProp;
};

type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

export class SplashScreen extends Component<Props, {}> {
    private userService = new UserService();

    constructor(props: Props) {
        super(props);
        this.bootstrapAsync();
    }

    private bootstrapAsync = async () => {
        const {navigation} = this.props;
        let country: string|null = null;

        // Stash a reference to navigator so we can have a class handle next page.
        Navigator.setNavigation(navigation as NavigationType);
        console.log(navigation);

        try {
            await this.userService.getStartupInfo();
            country = await this.userService.getUserCountry();
        } catch (err) {
            // TODO: how to deal with the user_startup info endpoint failing?
            // TODO: Trigger Offline handling here? At least show an error
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
                const patientId = profile.patients[0];
                Navigator.replaceScreen(Navigator.getWelcomeRepeatScreenName(), {patientId});
            } catch (error) {
                // Logged in with an account doesn't exist. Force logout.
                ApiClientBase.unsetToken();
                await AsyncStorageService.clearData();
                Navigator.replaceScreen(Navigator.getWelcomeScreenName());
            }
        } else {
            if (country == null) {
                // Using locale to default to a country
                await this.userService.defaultCountryToLocale()
            }
            Navigator.replaceScreen(Navigator.getWelcomeScreenName());
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
