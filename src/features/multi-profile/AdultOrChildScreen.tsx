import { BigButton } from '@covid/components/Button';
import Screen, { FieldWrapper, Header } from '@covid/components/Screen';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors, fontStyles } from '@theme';
import { Form, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { ConsentType, ScreenParamList } from '../ScreenParamList';

type HowYouFeelProps = {
  navigation: StackNavigationProp<ScreenParamList, 'AdultOrChild'>;
  route: RouteProp<ScreenParamList, 'AdultOrChild'>;
};

type State = {
  errorMessage: string;
};

const initialState: State = {
  errorMessage: '',
};

export default class BeforeWeStart extends Component<HowYouFeelProps, State> {
  constructor(props: HowYouFeelProps) {
    super(props);
    this.state = initialState;
  }

  buildRouteParams = (consentType: ConsentType) => {
    return {
      consentType,
      profileName: this.props.route.params.profileName,
      avatarName: this.props.route.params.avatarName,
    };
  };

  render() {
    return (
      <Screen>
        <Header>
          <HeaderText style={{ marginBottom: 12 }}>{i18n.t('adult-or-child-title')}</HeaderText>
          <SecondaryText>{i18n.t('adult-or-child-text')}</SecondaryText>
        </Header>

        <Form style={styles.form}>
          <FieldWrapper style={styles.fieldWrapper}>
            <BigButton
              onPress={() =>
                this.props.navigation.navigate('ConsentForOther', this.buildRouteParams(ConsentType.Adult))
              }>
              <Text style={[fontStyles.bodyLight, styles.buttonText]}>{i18n.t('person-over-18')}</Text>
            </BigButton>
          </FieldWrapper>

          <FieldWrapper style={styles.fieldWrapper}>
            <BigButton
              onPress={() =>
                this.props.navigation.navigate('ConsentForOther', this.buildRouteParams(ConsentType.Child))
              }>
              <Text style={[fontStyles.bodyLight, styles.buttonText]}>{i18n.t('person-under-18')}</Text>
            </BigButton>
          </FieldWrapper>
        </Form>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    marginVertical: 32,
  },

  fieldWrapper: {
    marginVertical: 32,
  },

  buttonText: {
    color: colors.primary,
  },
});
