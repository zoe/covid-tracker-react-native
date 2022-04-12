import UsualSelfReportsScreen from '@covid/features/usual-self/components/UsualSelfReportsScreen';
import i18n from '@covid/locale/i18n';
import * as React from 'react';

export default function UsualSelfReportsSingleTapScreen() {
  const illustration = require('../assets/usual-self-reports-single-tap.png');

  return (
    <UsualSelfReportsScreen
      activeDot={2}
      buttonTitle={i18n.t('next')}
      description={i18n.t('usual-self.reports-single-tap.description')}
      illustration={illustration}
      nextScreenName="UsualSelfReportsSymptoms"
      testID="usual-self-reports-single-tap-screen"
      title={i18n.t('usual-self.reports-single-tap.title')}
    />
  );
}
