import { BrandedButton } from '@covid/components';
import { CheckboxItem } from '@covid/components/Checkbox';
import { Screen } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { covidTestService } from '@covid/core/user/CovidTestService';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';

interface IProps {
  route: RouteProp<TScreenParamList, 'CovidTestConfirm'>;
}

export default function CovidTestConfirmScreen({ route }: IProps) {
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
    <Screen backgroundColor={colors.backgroundSecondary} testID="covid-test-confirm-screen">
      <HeaderText style={styling.marginBottomHuge}>{i18n.t('covid-test.confirm-test.title')}</HeaderText>

      <RegularText style={styling.marginBottom}>{i18n.t('covid-test.confirm-test.body')}</RegularText>

      <CheckboxItem onChange={handleConsentClick} style={styling.marginTopAuto} value={agreed}>
        {i18n.t('covid-test.confirm-test.consent')}
      </CheckboxItem>

      <BrandedButton enabled={agreed} onPress={handleAgreeClicked} style={styling.marginTopHuge} testID="confirm">
        {i18n.t('legal.confirm')}
      </BrandedButton>
    </Screen>
  );
}
