import React, {Component} from "react";
import {ScrollView, StyleSheet, View, Dimensions} from "react-native";
import {Header, ProgressBlock} from "../../components/Screen";
import {HeaderText} from "../../components/Text";
import ProgressStatus from "../../components/ProgressStatus";
import {colors} from "../../../theme"
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import MapView from "react-native-maps";

type RenderProps = {
    navigation: StackNavigationProp<ScreenParamList, 'NearYou'>
    route: RouteProp<ScreenParamList, 'NearYou'>;
}

export default class NearYouScreen extends Component<RenderProps, {}> {

    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.rootContainer}>
                    <Header>
                        <HeaderText>Near You Map</HeaderText>
                    </Header>

                    <ProgressBlock>
                        <ProgressStatus step={5} maxSteps={5}/>
                    </ProgressBlock>

                    <View style={styles.shareContainer}>
                        <MapView style={styles.mapStyle}/>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const MAP_WIDTH = Dimensions.get('window').width - 48;

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        backgroundColor: colors.backgroundSecondary,
        justifyContent: 'space-between'
    },

    rootContainer: {
        padding: 10,
    },

    shareContainer: {
        backgroundColor: colors.white,
        borderRadius: 10,
        margin: 16,
    },

    mapStyle: {
        width: MAP_WIDTH,
        height: MAP_WIDTH * 4 / 5,
        borderWidth: 1, borderColor: 'green',
    },
});
