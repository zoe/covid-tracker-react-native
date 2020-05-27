import i18n from '@covid/locale/i18n';
import { getDaysAgo } from '@covid/utils/datetime';
import React, { Component } from 'react';

import { SecondaryText } from './Text';

type ProgressProps = {
  timeAgo: Date | undefined;
};

export default class DaysAgo extends Component<ProgressProps> {
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
      text = i18n.t('select-profile-last-report') + ' ' + text;
    }

    return <SecondaryText style={{ textAlign: 'center', fontSize: 12 }}>{text}</SecondaryText>;
  }
}
