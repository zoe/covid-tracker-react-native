import React, { Component } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { studyInvite } from '@assets';
import Analytics, { events } from '@covid/core/Analytics';
import appCoordinator from '@covid/features/AppCoordinator';

export default class InviteToStudy extends Component<{ placement: string }> {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Analytics.track(events.CLICK_STUDY_AD_CALLOUT, { placement: this.props.placement });
          appCoordinator.goToUKValidationStudy();
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
    marginHorizontal: 10,
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
