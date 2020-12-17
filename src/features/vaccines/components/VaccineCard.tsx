import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import moment from 'moment';
import { Text } from 'native-base';

import { BrandedButton, ClickableText, RegularText } from '@covid/components/Text';
import { pending, tick } from '@assets';
import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { Dose, VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';

type Props = {
  vaccine: VaccineRequest;
};

export const VaccineCard: React.FC<Props> = ({ vaccine }) => {
  const formatDateString = (dateString: string): string => {
    return moment(dateString).format('MMM D YYYY');
  };

  const getIcon = (hasDate: boolean) => {
    return hasDate ? tick : pending;
  };

  const formatVaccineDate = (dose: Dose) => {
    if (dose.date_taken_specific) {
      return formatDateString(dose.date_taken_specific);
    } else {
      return `${formatDateString(dose.date_taken_between_start)} - ${formatDateString(dose.date_taken_between_end)}`;
    }
  };

  const hasFirstDoseDate = !!vaccine.doses[0].date_taken_specific;
  const hasSecondDoseDate = !!vaccine.doses[1].date_taken_specific;

  return (
    <View style={styles.container}>
      <RegularText>{i18n.t('vaccines.vaccine-card.dose-1')}</RegularText>
      <View style={styles.row}>
        <Image source={getIcon(hasFirstDoseDate)} style={styles.tick} />
        <RegularText style={[!hasFirstDoseDate && styles.pendingText]}>
          {hasFirstDoseDate ? formatVaccineDate(vaccine.doses[0] as Dose) : 'Logged but date missing'}
        </RegularText>
      </View>
      <BrandedButton
        style={styles.button}
        onPress={() => {
          //TODO
        }}>
        <Text style={styles.buttonText}>{i18n.t('vaccines.vaccine-card.add-date')}</Text>
      </BrandedButton>

      <RegularText style={{ marginTop: 16 }}>{i18n.t('vaccines.vaccine-card.dose-2')}</RegularText>
      <View style={styles.row}>
        <Image source={getIcon(hasSecondDoseDate)} style={styles.tick} />
        <RegularText style={[!hasSecondDoseDate && styles.pendingText]}>
          {hasSecondDoseDate ? formatVaccineDate(vaccine.doses[1] as Dose) : 'Not yet logged'}
        </RegularText>
      </View>
      <BrandedButton
        style={styles.button}
        enable={hasFirstDoseDate}
        onPress={() => {
          //TODO
        }}>
        <Text style={styles.buttonText}>{i18n.t('vaccines.vaccine-card.add-info')}</Text>
      </BrandedButton>

      <ClickableText
        onPress={() => {
          //TODO
        }}
        style={styles.deleteText}>
        Delete vaccine
      </ClickableText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    borderColor: colors.tertiary,
  },
  row: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tick: {
    marginEnd: 8,
    height: 16,
    width: 16,
  },
  pendingText: {
    color: colors.secondary,
  },
  button: {
    marginVertical: 4,
    borderWidth: 1,
    height: 40,
    borderColor: colors.purple,
    backgroundColor: colors.backgroundSecondary,
    marginHorizontal: 16,
  },
  buttonText: {
    color: colors.purple,
  },
  deleteText: {
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
    color: colors.purple,
  },
});
