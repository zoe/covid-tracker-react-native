import UsualSelfReportsScreen from '@covid/features/usual-self/components/UsualSelfReportsScreen';
import i18n from '@covid/locale/i18n';
import * as React from 'react';

export default function UsualSelfReportsSymtpomsScreen() {
  const illustration = require('../assets/usual-self-reports-symptoms.png');

  return (
    <UsualSelfReportsScreen
      showTime
      activeDot={3}
      buttonTitle={i18n.t('usual-self.reports-symptoms.button')}
      description={i18n.t('usual-self.reports-symptoms.description')}
      illustration={illustration}
      nextScreenName="UsualSelfSetupForm"
      nextScreenParams={{ screenName: 'UsualSelfSetupMisc' }}
      testID="usual-self-reports-symptoms-screen"
      title={i18n.t('usual-self.reports-symptoms.title')}
    />
  );
}
