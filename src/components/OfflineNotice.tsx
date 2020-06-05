import i18n from '@covid/locale/i18n';
import React from 'react';

import { ErrorMessageBar } from './ErrorMessageBar';

type NoticeProps = {
  isOnline: boolean;
  isApiOnline: boolean;
};

export const OfflineNotice = ({ isOnline, isApiOnline }: NoticeProps) => {
  const message: string | null = !isOnline
    ? i18n.t('errors.user-is-offline')
    : !isApiOnline
    ? i18n.t('errors.server-is-busy')
    : null;

  return message ? <ErrorMessageBar>{message}</ErrorMessageBar> : null;
};
