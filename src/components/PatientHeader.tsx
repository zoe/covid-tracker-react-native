import React from "react";
import { RegularText } from "./Text"
import { PatientProfile } from "../core/patient/PatientState"
import { View, StyleSheet, Image } from "react-native";
import {getAvatarByName} from "../utils/avatar"
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenParamList } from "../features/ScreenParamList";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "native-base";
import { colors } from "../../theme";

type BackButtonProps = {
    navigation: StackNavigationProp<ScreenParamList>
}

const BackButton = ({navigation}: BackButtonProps) => {
    return (
        <TouchableOpacity onPress={navigation.goBack}>
            <View style={styles.iconButton}>
                <Icon name="chevron-thin-left" type="Entypo" style={styles.icon}/>
            </View>
        </TouchableOpacity>
    );
}

type NavbarProps = {
    profile: PatientProfile,
    navigation: StackNavigationProp<ScreenParamList> | undefined
}

const PatientHeader = ({profile, navigation}: NavbarProps) => {
    const avatarImage = !!profile.avatarName && getAvatarByName(profile.avatarName);

    return (
        <View style={styles.headerBar}>
            <View style={styles.left}>
                {!!navigation && (
                    <BackButton navigation={navigation} />
                )}
            </View>
            <View style={styles.center}>

            </View>
            <View style={styles.right}>
                <View style={styles.textbox}>
                    <RegularText style={styles.patientName}>{profile.name}</RegularText>
                </View>
                {!!avatarImage && <Image source={avatarImage} style={styles.avatar} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    iconButton: {
        height: 32, width: 32,
        marginVertical: 16,
        marginHorizontal: 8,
        backgroundColor: colors.backgroundFour,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        fontSize: 16,
        color: colors.secondary
    },

    headerBar: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 16,
        // borderWidth: 1, borderColor: 'red',
    },
    center: {
        flex: 1
    },
    left: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    right: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    textbox: {
        justifyContent: "center",
    },
    patientName: {
    },
    avatar: {
        marginVertical: 16,
        marginHorizontal: 8,
        height: 32,
        width: 32,
        borderRadius: 16,
    }
});

export default PatientHeader;