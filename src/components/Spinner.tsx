import {StyleSheet, View} from "react-native";
import {Spinner} from "native-base";

import {colors} from "../../theme";
import React from "react";


const BrandedSpinner = () => {
    return (
      <View style={styles.middleOfScreen}>
          <Spinner color={colors.brand}/>
      </View>
    )
};

const styles = StyleSheet.create({
    middleOfScreen: {
        flex: 1,
        alignContent: "center"
    }
});

export default BrandedSpinner
