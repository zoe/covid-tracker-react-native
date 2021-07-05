import { BrandedButton } from '@covid/components';
import { CheckboxItem } from '@covid/components/Checkbox';
import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { covidTestService } from '@covid/core/user/CovidTestService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { ListItem } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'CovidTestConfirm'>;
  route: RouteProp<ScreenParamList, 'CovidTestConfirm'>;
}

export default function CovidTestConfirmScreen({ navigation, route }: IProps) {
  const [agreed, setAgreed] = React.useState(false);

  const handleConsentClick = (checked: boolean) => {
    setAgreed(checked);
  };

  const handleAgreeClicked = async () => {
    if (!agreed) {
      return;
    }

    const test = route.params?.test;

    if (test.id) {
      covidTestService.updateTest(test.id, test).then(() => {
        assessmentCoordinator.gotoNextScreen(route.name);
      });
    } else {
      covidTestService.addTest(test).then(() => {
        assessmentCoordinator.gotoNextScreen(route.name);
      });
    }
  };

  return (
    <Screen showBackButton navigation={navigation} style={styles.container} testID="covid-test-confirm-screen">
      <Header>
        <HeaderText>{i18n.t('covid-test.confirm-test.title')}</HeaderText>
      </Header>

      <RegularText style={styles.body}>{i18n.t('covid-test.confirm-test.body')}</RegularText>

      <View style={{ flex: 1 }} />

      <ListItem>
        <CheckboxItem onChange={handleConsentClick} value={agreed}>
          {i18n.t('covid-test.confirm-test.consent')}
        </CheckboxItem>
      </ListItem>

      <BrandedButton enabled={agreed} onPress={handleAgreeClicked} style={styles.button} testID="confirm">
        {i18n.t('legal.confirm')}
      </BrandedButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: 17,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  button: {
    marginTop: 20,
  },
  container: {
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
  },
});
