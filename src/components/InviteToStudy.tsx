import { studyInvite } from '@assets';
import Analytics, { events } from '@covid/core/Analytics';
import { appCoordinator } from '@covid/features/AppCoordinator';
import * as React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

export default class InviteToStudy extends React.Component<{ placement: string }> {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Analytics.track(events.CLICK_STUDY_AD_CALLOUT, { placement: this.props.placement });
          appCoordinator.goToUKValidationStudy();
        }}
      >
        <View style={styles.socialIconContainer}>
          <Image source={studyInvite} style={styles.socialIcon} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  socialIcon: {
    aspectRatio: 1.205,
    resizeMode: 'contain',
    width: '100%',
  },
  socialIconContainer: {
    alignSelf: 'center',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 40,
  },
});
