import { BigButton } from '@covid/components/Button';
import Screen, { FieldWrapper, Header } from '@covid/components/Screen';
import { HeaderText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { StackNavigationProp } from '@react-navigation/stack';
import { Form, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { ScreenParamList } from '../../ScreenParamList';

type HowYouFeelProps = {
  navigation: StackNavigationProp<ScreenParamList, 'BeforeWeStartUS'>;
};

type State = {
  errorMessage: string;
};

const initialState: State = {
  // TODO - This is not used
  errorMessage: '',
};

export default class BeforeWeStart extends Component<HowYouFeelProps, State> {
  constructor(props: HowYouFeelProps) {
    super(props);
    this.state = initialState;
  }

  render() {
    return (
      <Screen>
        <Header>
          <HeaderText>{i18n.t('before-we-start.title')}</HeaderText>
        </Header>

        <Form style={styles.form}>
          <FieldWrapper style={styles.fieldWrapper}>
            <BigButton onPress={() => this.props.navigation.navigate('NursesConsentUS', { viewOnly: false })}>
              <Text>{i18n.t('before-we-start.yes')}</Text>
            </BigButton>
          </FieldWrapper>

          <FieldWrapper style={styles.fieldWrapper}>
            <BigButton onPress={() => this.props.navigation.navigate('Consent', { viewOnly: false })}>
              <Text>{i18n.t('before-we-start.no')}</Text>
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
});
