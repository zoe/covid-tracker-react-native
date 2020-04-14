import React from "react";
import { RegularText } from "./Text"
import { PatientProfile } from "../core/patient/PatientState"
import { View, StyleSheet, Image } from "react-native";
import {getAvatarByName} from "../utils/avatar"

type NavbarProps = {
    profile: PatientProfile
}

const PatientHeader = ({profile}: NavbarProps) => {
    const avatarImage = !!profile.avatarName && getAvatarByName(profile.avatarName);
    return (
        <View style={styles.headerBar}>
            <View style={styles.left}>

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