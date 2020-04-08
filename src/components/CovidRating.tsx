import React, { Component } from "react";
import { Linking, Modal, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { AirbnbRating } from 'react-native-ratings';
import { View } from "native-base";
import { colors } from "../../theme";
import { RegularBoldText, RegularText } from "./Text";
import UserService from "../core/user/UserService";

type PropsType = {}

type State = {
    isModalOpen: boolean,
    showTakeToStore: boolean,
    rating: number | null,
}

const storeLinks = 'com.joinzoe.covid_zoe';

const ModalContainer = (props: any) => (
    <Modal transparent={true}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                {props.children}
            </View>
        </View>
    </Modal>
);

export class CovidRating extends Component<PropsType, State> {
    state = {
        isModalOpen: true,
        showTakeToStore: false,
        rating: 0
    };
    private userService = new UserService();

    setRating = (rating: number) => this.setState({rating});

    decline = (e: any) => {
        this.userService.setAskedToRateStatus('asked');
        this.setState({isModalOpen: false})
    };

    takeToStore = () => {
        setTimeout(() => {
            if (Platform.OS != 'ios') {
                Linking.openURL(`market://details?id=${storeLinks}`).catch(err =>
                    alert('Please rate us on the Google Play Store!')
                );
            } else {
                Linking.openURL(
                    `itms://itunes.apple.com/in/app/apple-store/${storeLinks}`
                ).catch(err => alert('Please rate us on the App Store!'));
            }
            this.setState({isModalOpen: false});
        }, 2000);
    };

    rate = (e: any) => {
        this.userService.setAskedToRateStatus('asked');
        if (this.state.rating >= 4) {
            this.setState({showTakeToStore: true});
            this.takeToStore();
        } else {
            this.setState({isModalOpen: false});
        }
    };

    renderHeader = (headerText: string, subText: string) => (
        <>
            <RegularBoldText style={styles.ratingHeader}>{headerText}</RegularBoldText>
            <RegularText style={styles.ratingText}>{subText}</RegularText>
        </>
    );

    renderActionButtons = (rateLabel: string, rateAction: any) => (
        <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.ratingButton} onPress={this.decline}>
                <RegularText style={styles.buttonText}>No thanks</RegularText>
            </TouchableOpacity>
            <View style={styles.verticalDivider}/>
            <TouchableOpacity style={styles.ratingButton} onPress={rateAction}>
                <RegularText style={styles.buttonText}>{rateLabel}</RegularText>
            </TouchableOpacity>
        </View>
    );


    render() {
        const store_name = Platform.OS === 'ios' ? 'App Store' : 'Google Play store';
        return (
            this.state.isModalOpen && (
                <ModalContainer>
                    {this.state.showTakeToStore ?
                        <>
                            {this.renderHeader('Please rate this app', `We will now redirect you to the ${store_name}`)}
                        </>
                        : (
                            <>
                                {this.renderHeader('Please rate this app', 'Your feedback can help more people join the fight against COVID-19')}
                                <AirbnbRating
                                    showRating={false}
                                    onFinishRating={this.setRating}
                                    size={35}
                                    defaultRating={0}
                                />
                                {this.renderActionButtons('Rate', this.rate)}
                            </>
                        )}
                </ModalContainer>
            )
        );
    }
}


const actionButtonBorder = 'rgba(240, 240, 240, 1)';
const styles = StyleSheet.create({
    verticalDivider: {
        height: '100%',
        width: 1,
        backgroundColor: actionButtonBorder,
    },
    ratingText: {
        // color: colors.white,
        paddingBottom: 20,
        marginHorizontal: 60,
        fontSize: 14,
        textAlign: "center",
    },
    ratingHeader: {
        paddingBottom: 10,
        fontSize: 18,
        textAlign: "center",
    },
    actionContainer: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "center",
        borderTopWidth: 1,
        borderColor: actionButtonBorder,
    },
    buttonText: {
        textAlign: "center",
        color: colors.linkBlue,
    },
    ratingButton: {
        width: '50%',
        height: 60,
        justifyContent: "center",
        color: colors.linkBlue,
    },
    centeredView: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 30,
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: 35,
        alignItems: "center",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
});
