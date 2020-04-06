import {DrawerContentComponentProps} from "@react-navigation/drawer";
import {colors, fontStyles} from "../../theme";
import {closeIcon} from "../../assets";
import {Image, Linking, StyleSheet, Text, TouchableOpacity, View, SafeAreaView} from "react-native";
import i18n from "../locale/i18n"
import React from "react";
import Constants from "expo-constants";
import {isGBLocale} from "../core/user/UserService";

export function DrawerMenu(props: DrawerContentComponentProps) {
    return <SafeAreaView style={styles.drawerRoot}>
        <View style={styles.container}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image style={styles.closeIcon} source={closeIcon}/>
            </TouchableOpacity>
            <View style={{height: 40}}/>
            <TouchableOpacity style={styles.iconNameRow} onPress={() => {
                Linking.openURL("https://covid.joinzoe.com/blog")
            }}>
                <Text style={fontStyles.h2Reg}>{i18n.t('research-updates')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconNameRow} onPress={() => {
                Linking.openURL("https://covid.joinzoe.com/faq")
            }}>
                <Text style={fontStyles.h2Reg}>{i18n.t('faqs')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconNameRow} onPress={() => {
                isGBLocale() ? props.navigation.navigate("PrivacyPolicyUK") : props.navigation.navigate("PrivacyPolicyUS")
            }}>
                <Text style={fontStyles.h2Reg}>{i18n.t('privacy-policy')}</Text>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            <Text style={[fontStyles.bodySmallLight,styles.versionText]}>{Constants.manifest.version} : {Constants.manifest.revisionId}</Text>
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
        color: colors.tertiary,
        alignSelf: 'center'
    }
});
