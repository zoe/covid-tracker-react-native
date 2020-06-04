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
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 40,
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  socialIcon: {
    resizeMode: 'contain',
    width: '100%',
    aspectRatio: 1.205,
  },
});
