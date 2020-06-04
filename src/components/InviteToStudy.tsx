import { studyInvite } from '@assets';
import Navigator from '@covid/features/Navigation';

import React, { Component } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Analytics, { events } from '@covid/core/Analytics';

export default class InviteToStudy extends Component<{ placement: string }> {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Analytics.track(events.CLICK_STUDY_AD_CALLOUT, { placement: this.props.placement });
          Navigator.gotoScreen('ValidationStudyConsent', {
            viewOnly: false,
          });
        }}>
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
