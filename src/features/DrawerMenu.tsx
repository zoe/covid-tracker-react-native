import {DrawerContentComponentProps} from "@react-navigation/drawer";
import {colors, fontStyles} from "../../theme";
import {closeIcon} from "../../assets";
import {Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View, SafeAreaView} from "react-native";
import i18n from "../locale/i18n"
import React from "react";
import Constants from "expo-constants";
import UserService, {isGBLocale, isUSLocale} from "../core/user/UserService";
import {DrawerActions} from '@react-navigation/native';

export function DrawerMenu(props: DrawerContentComponentProps) {

    const userService = new UserService();

    function showDeleteAlert() {
        Alert.alert(
            i18n.t('delete-data-alert-title'),
            i18n.t('delete-data-alert-text'),
            [
                {
                    text: i18n.t('cancel'),
                    style: 'cancel',
                },
                {
                    text: i18n.t('delete'),
                    style: 'destructive',
                    onPress: async () => {
                        await userService.deleteRemoteUserData();
                        logout();
                    }
                },
            ],
            {cancelable: false}
        );
    }

    function logout() {
        userService.deleteLocalUserData();
        props.navigation.reset({
            index: 0,
            routes: [
                {name: isUSLocale() ? 'WelcomeUS' : 'Welcome'},
            ],
        });
        props.navigation.dispatch(DrawerActions.closeDrawer());
    }

    return <SafeAreaView style={styles.drawerRoot}>
        <View style={styles.container}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image style={styles.closeIcon} source={closeIcon}/>
            </TouchableOpacity>
            <View style={{height: 40}}/>
            <TouchableOpacity style={styles.iconNameRow} onPress={() => {
                Linking.openURL(i18n.t('blog-link'))
            }}>
                <Text style={fontStyles.h2Reg}>{i18n.t('research-updates')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconNameRow} onPress={() => {
                Linking.openURL(i18n.t('faq-link'))
            }}>
                <Text style={fontStyles.h2Reg}>{i18n.t('faqs')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconNameRow} onPress={() => {
                isGBLocale() ? props.navigation.navigate("PrivacyPolicyUK", {viewOnly: true}) : props.navigation.navigate("PrivacyPolicyUS", {viewOnly: true})
            }}>
                <Text style={fontStyles.h2Reg}>{i18n.t('privacy-policy')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconNameRow} onPress={() => showDeleteAlert()}>
                <Text style={fontStyles.h2Reg}>{i18n.t('delete-my-data')}</Text>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            <TouchableOpacity style={styles.iconNameRow} onPress={() => logout()}>
                <Text style={fontStyles.h2Reg}>{i18n.t('logout')}</Text>
            </TouchableOpacity>
            <Text style={[fontStyles.bodySmallLight, styles.versionText]}>{Constants.manifest.version} : {Constants.manifest.revisionId}</Text>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    drawerRoot: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 24,
    },
    closeIcon: {
        height: 20,
        width: 20,
        alignSelf: 'flex-end'
    },
    iconNameRow: {
        marginStart: 8,
        marginTop: 32,
        flexDirection: 'row'
    },
    drawerIcon: {
        height: 24,
        width: 24,
        marginEnd: 16
    },
    versionText: {
        marginTop: 32,
        color: colors.tertiary,
        alignSelf: 'center'
    }
});
