import UsualSelfReportsScreen from '@covid/features/usual-self/components/UsualSelfReportsScreen';
import i18n from '@covid/locale/i18n';
import * as React from 'react';

export default function UsualSelfReportsPowerfulScreen() {
  const illustration = require('../assets/usual-self-reports-powerful.png');

  return (
    <UsualSelfReportsScreen
      activeDot={1}
      buttonTitle={i18n.t('next')}
      description={i18n.t('usual-self.reports-powerful.description')}
      illustration={illustration}
      nextScreenName="UsualSelfReportsSingleTap"
      testID="usual-self-reports-powerful-screen"
      title={i18n.t('usual-self.reports-powerful.title')}
    />
  );
}
