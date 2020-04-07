import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {screenWidth} from "../components/Screen";


type ProgressProps = {
    step: number;
    maxSteps: number;
}

export default class ProgressStatus extends Component<ProgressProps> {
    render() {
        const progress = this.props.step * 100 / this.props.maxSteps;
        const width = screenWidth - 16;
        const progressWidth = width * progress / 100;
        // console.log("[DEBUG[ Progress:", this.props.step, this.props.maxSteps, progress, progressWidth);
        return (
          <View style={styles.progressBar}>
              <Progress.Bar progress={progress / 100} width={screenWidth - 16}>

              </Progress.Bar>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    progressBar: {
        width: screenWidth - 16,
    }
});
