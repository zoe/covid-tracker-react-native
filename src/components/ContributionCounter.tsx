import I18n from 'i18n-js';
import React from 'react';
import { StyleSheet } from 'react-native';
import reactStringReplace from 'react-string-replace';

import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { RegularBoldText, RegularText } from '@covid/components/Text';
import { ITest } from '@covid/components/types';

interface ContributionCounterProps extends ITest {
  variant: number;
  count: number | null;
}

export const ContributionCounter = (props: ContributionCounterProps) => {
  const localisationService = useInjection<ILocalisationService>(Services.Localisation);

  if (props.count) {
    const features = localisationService.getConfig();
    const delimiter = features ? features.thousandSeparator : ',';

    const countValue = I18n.toNumber(props.count, { precision: 0, delimiter });
    return props.variant === 1 ? (
      <RegularText style={styles.contributingText}>
        {reactStringReplace(
          i18n.t('join-total-people-contributing', { total: '{{TOTAL}}' }),
          '{{TOTAL}}',
          (match, i) => (
            <RegularBoldText key={i} style={styles.contributingTextValue}>
              {countValue}
            </RegularBoldText>
          )
        )}
      </RegularText>
    ) : props.variant === 2 ? (
      <RegularText style={styles.contributingText2}>
        {reactStringReplace(i18n.t('total-people-contributing', { total: '{{TOTAL}}' }), '{{TOTAL}}', (match, i) => (
          <RegularBoldText key={i} style={styles.contributingTextValue2}>
            {countValue}
          </RegularBoldText>
        ))}
      </RegularText>
    ) : null;
  }
  return null;
};

const styles = StyleSheet.create({
  contributingText: {
    fontSize: 24,
    lineHeight: 32,
    color: colors.lightBrand,
    textAlign: 'center',
  },
  contributingTextValue: {
    fontSize: 24,
    lineHeight: 32,
    color: colors.white,
    textAlign: 'center',
  },
  contributingText2: {
    fontSize: 14,
    lineHeight: 32,
    marginTop: 16,
    color: colors.lightBrand,
    textAlign: 'center',
  },
  contributingTextValue2: {
    fontSize: 16,
    lineHeight: 32,
    color: colors.white,
    textAlign: 'center',
  },
});
