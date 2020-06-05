import { chevronLeft } from '@assets';
import { Header } from '@covid/components/Screen';
import { BrandedButton, HeaderText, RegularBoldText, RegularText, SecondaryText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenParamList } from '../../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'ValidationStudyInfo'>;
  route: RouteProp<ScreenParamList, 'ValidationStudyInfo'>;
};

export default class ValidationStudyInfoScreen extends Component<Props, object> {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundSecondary }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <TouchableOpacity style={styles.backIcon} onPress={this.props.navigation.goBack}>
            <Image source={chevronLeft} />
          </TouchableOpacity>

          <Header>
            <HeaderText style={styles.header}>{i18n.t('validation-study-info.title')}</HeaderText>
          </Header>

          <View style={styles.card}>
            <RegularBoldText>
              {i18n.t('validation-study-info.header-1')}
              {'\n'}
            </RegularBoldText>
            <RegularText style={styles.paragraph}>{i18n.t('validation-study-info.para-1')}</RegularText>
          </View>

          <View style={styles.card}>
            <RegularBoldText>
              {i18n.t('validation-study-info.header-2')}
              {'\n'}
            </RegularBoldText>
            <RegularText style={styles.paragraph}>{i18n.t('validation-study-info.para-2')}</RegularText>
          </View>

          <View style={styles.card}>
            <RegularBoldText>
              {i18n.t('validation-study-info.header-3')}
              {'\n'}
            </RegularBoldText>
            <RegularText style={styles.paragraph}>{i18n.t('validation-study-info.para-3')}</RegularText>
          </View>

          <RegularBoldText style={styles.interestedTitle}>
            {i18n.t('validation-study-info.interested')}
            {'\n'}
          </RegularBoldText>
          <SecondaryText style={styles.interestedTest}>{i18n.t('validation-study-info.visit-next')}</SecondaryText>

          <View style={styles.buttonContainer}>
            <BrandedButton
              style={styles.mainButton}
              onPress={() => {
                this.props.navigation.navigate('ValidationStudyConsent', {
                  viewOnly: false,
                  ...(this.props.route.params?.currentPatient && {
                    currentPatient: this.props.route.params.currentPatient,
                  }),
                });
              }}>
              <RegularText style={styles.buttonText}>{i18n.t('validation-study-intro.yes')}</RegularText>
            </BrandedButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 32,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  backIcon: {
    alignSelf: 'flex-start',
    marginTop: 32,
  },
  header: {
    marginTop: 24,
    textAlign: 'center',
  },
  paragraph: {
    marginVertical: 8,
  },
  mainButton: {
    marginTop: 32,
    marginBottom: 16,
    marginHorizontal: 16,
    backgroundColor: colors.purple,
  },
  buttonText: {
    color: colors.white,
  },
  card: {
    backgroundColor: colors.white,
    marginVertical: 24,
    width: '100%',
    elevation: 0,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 32,
  },
  interestedTitle: {
    marginTop: 20,
    fontSize: 20,
  },
  interestedTest: {
    textAlign: 'center',
  },
});
