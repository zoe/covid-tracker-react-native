import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {screenWidth} from "./Screen";
import { colors } from '../../theme';


type ProgressProps = {
    step: number;
    maxSteps: number;
}

export default class ProgressStatus extends Component<ProgressProps> {
    render() {
        const progress = this.props.step * 100 / this.props.maxSteps;

        return (
          <View style={styles.progressBar}>
              <Progress.Bar progress={progress / 100} width={screenWidth - 36} color={colors.brand} unfilledColor={colors.backgroundFour} borderWidth={0} />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    progressBar: {
        width: screenWidth - 36,
    }
});
