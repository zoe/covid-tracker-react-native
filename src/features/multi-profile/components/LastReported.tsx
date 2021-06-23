import { SecondaryText } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { getDaysAgo } from '@covid/utils/datetime';
import * as React from 'react';

type ProgressProps = {
  timeAgo: Date | undefined;
};

export default class LastReported extends React.Component<ProgressProps> {
  render() {
    let text = i18n.t('never-reported');
    if (this.props.timeAgo) {
      const diffDays = getDaysAgo(this.props.timeAgo);
      if (diffDays === 0) {
        text = i18n.t('today');
      } else if (diffDays === 1) {
        text = i18n.t('yesterday');
      } else {
        text = i18n.t('days-ago', { diffDays });
      }
      text = `${i18n.t('select-profile-last-report')} ${text}`;
    }

    return <SecondaryText style={{ fontSize: 12, textAlign: 'center' }}>{text}</SecondaryText>;
  }
}
