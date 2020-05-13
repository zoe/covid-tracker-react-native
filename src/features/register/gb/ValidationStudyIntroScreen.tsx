import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Header } from '../../../components/Screen';
import { BrandedButton, HeaderText, RegularText } from '../../../components/Text';
import i18n from '../../../locale/i18n';
import { ScreenParamList } from '../../ScreenParamList';
import { icon } from '../../../../assets';
import { colors } from '../../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'ValidationStudyIntro'>;
  route: RouteProp<ScreenParamList, 'ValidationStudyIntro'>;
};

export default class ValidationStudyIntroScreen extends Component<Props, object> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image source={icon} style={styles.covidIcon} resizeMode="contain" />
          </View>

          <Header>
            <HeaderText style={styles.header}>{i18n.t('validation-study-intro.title')}</HeaderText>
          </Header>

          <RegularText style={styles.subtitle}>{i18n.t('validation-study-intro.subtitle')}</RegularText>
          <RegularText style={styles.info}>{i18n.t('validation-study-intro.info')}</RegularText>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              // TODO Correct the navigation stack to start from profile screen
              this.props.navigation.navigate('StartAssessment', {
                currentPatient: this.props.route.params.currentPatient,
              });
            }}>
            <Text>{i18n.t('validation-study-intro.no')}</Text>
          </TouchableOpacity>

          <BrandedButton
            style={styles.mainButton}
            onPress={() =>
              this.props.navigation.navigate('ValidationStudyConsent', {
                viewOnly: false,
                currentPatient: this.props.route.params.currentPatient,
              })
            }>
            <Text>{i18n.t('validation-study-intro.yes')}</Text>
          </BrandedButton>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  covidIcon: {
    height: 48,
    width: 48,
    borderRadius: 8,
  },
  contentContainer: {
    marginHorizontal: 16,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
  },
  header: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginVertical: 8,
  },
  info: {
    textAlign: 'center',
    marginVertical: 8,
    color: colors.secondary,
    fontSize: 14,
  },
  mainButton: {
    marginTop: 32,
    marginHorizontal: 16,
  },
});
