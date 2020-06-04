import { studyInvite } from '@assets';
import Navigator from '@covid/features/Navigation';

import React, { Component } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

export default class InviteToStudy extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          Navigator.gotoScreen('ValidationStudyConsent', {
            viewOnly: false,
          })
        }>
        <View style={styles.socialIconContainer}>
          <Image source={studyInvite} style={styles.socialIcon} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  socialIconContainer: {
    marginVertical: -10,
    borderRadius: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  socialIcon: {
    resizeMode: 'contain',
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
});
