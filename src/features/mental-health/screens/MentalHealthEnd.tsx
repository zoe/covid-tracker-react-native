import React from 'react';
import { View, StyleSheet } from 'react-native';

import { BasicPage, Icon, Text, SimpleShare, Spacer } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';

function MentalHealthSupport() {
  return (
    <BasicPage footerTitle="Back to home" onPress={() => NavigatorService.navigate('Dashboard', undefined)} withGutter>
      <View style={styles.tickContainer}>
        <View style={styles.tick}>
          <Icon iconName="tick" iconStyle={{ color: '#C0D904' }} iconSize={32} />
        </View>
      </View>
      <Text textClass="h3" rhythm={32} textAlign="center">
        Thank you for your time!
      </Text>
      <Text textAlign="center" textClass="pLight" rhythm={24}>
        Your input is what makes our research possible. We will share any insights we learn from responses on our blog
        and in the app.
      </Text>
      <Text textAlign="center" textClass="pLight" rhythm={24}>
        If you know people that would be interested in taking part in this research, share the app with them below:
      </Text>
      <SimpleShare title="Share this app" onPress={() => null} />
      <Spacer space={24} />
    </BasicPage>
  );
}

const styles = StyleSheet.create({
  tickContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  tick: {
    alignItems: 'center',
    borderColor: '#C0D904',
    borderRadius: 24,
    borderWidth: 3,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
});

export default MentalHealthSupport;
