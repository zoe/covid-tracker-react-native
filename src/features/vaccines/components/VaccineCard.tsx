import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import moment from 'moment';
import { Text } from 'native-base';

import { BrandedButton, ClickableText, RegularText } from '@covid/components/Text';
import { pending, tick } from '@assets';
import { colors } from '@theme';
import i18n from '@covid/locale/i18n';
import { Dose, VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';

type Props = {
  vaccine: VaccineRequest;
  style?: ViewStyle;
  onPressDose: (index: number) => void;
  onPressEdit: () => void;
};

export const VaccineCard: React.FC<Props> = ({ vaccine, style, onPressDose }) => {
  const formatDateString = (dateString: string): string => {
    return moment(dateString).format('MMM D YYYY');
  };

  const renderTick = (hasDate: boolean, hasName: boolean) => {
    if (hasDate && hasName) {
      return <Image source={tick} style={styles.tick} />;
    }
  };

  const renderPending = (hasDate: boolean, hasName: boolean) => {
    if (hasDate && hasName) {
      return <Image source={pending} style={styles.tick} />;
    }
  };

  const formatVaccineDate = (dose: Dose) => {
    if (dose.date_taken_specific) {
      return formatDateString(dose.date_taken_specific);
    } else {
      return `${formatDateString(dose.date_taken_between_start)} - ${formatDateString(dose.date_taken_between_end)}`;
    }
  };

  const pendingIconAndText = (textKey: string) => (
    <View style={styles.row}>
      <Image source={pending} style={styles.tick} />
      <RegularText style={styles.pendingText}>{i18n.t(textKey)}</RegularText>
    </View>
  );

  const dateRequired = pendingIconAndText('vaccines.vaccine-card.date-missing');
  const notYetLogged = pendingIconAndText('vaccines.vaccine-card.not-logged');

  const dose1: Dose | undefined = vaccine.doses[0];
  const dose2: Dose | undefined = vaccine.doses[1];
  console.log('dose1:', dose1, '\ndose2:', dose2);

  const hasFirstDoseDate = !!dose1?.date_taken_specific;
  const hasSecondDoseDate = !!dose2?.date_taken_specific;
  const hasFirstDoseName = !!dose1?.brand && !!dose1?.description;
  const hasSecondDoseName = !!dose2?.brand && !!dose2?.description;
  const hasFirstDoseBrand = !!dose1?.brand;
  const hasSecondDoseBrand = !!dose2?.brand;
  const hasFirstDoseDescription = !!dose1?.description;
  const hasSecondDoseDescription = !!dose2?.description;

  return (
    <>
      <View style={styles.row}>
        {renderTick(hasFirstDoseDate, hasFirstDoseName)}
        <RegularText>{i18n.t('vaccines.vaccine-card.dose-1')}</RegularText>
      </View>
      <RegularText style={[!hasFirstDoseName && styles.pendingText]}>
        {hasFirstDoseName
          ? hasFirstDoseBrand
            ? dose1.brand
            : dose1.description
          : pendingIconAndText('vaccines.vaccine-card.name-missing')}
      </RegularText>
      <RegularText style={[!hasFirstDoseDate && styles.pendingText]}>
        {hasFirstDoseDate ? formatVaccineDate(dose1 as Dose) : i18n.t('vaccines.vaccine-card.date-missing')}
      </RegularText>

      {!hasFirstDoseDate && dateRequired}

      <View style={styles.row}>
        {renderTick(hasSecondDoseDate, hasSecondDoseName)}
        <RegularText>{i18n.t('vaccines.vaccine-card.dose-2')}</RegularText>
      </View>

      {hasSecondDoseDate && (
        <RegularText style={[!hasSecondDoseName && styles.pendingText]}>
          {hasSecondDoseName
            ? hasSecondDoseBrand
              ? dose2.brand
              : dose2.description
            : pendingIconAndText('vaccines.vaccine-card.name-missing')}
        </RegularText>
      )}

      <RegularText style={[!hasSecondDoseDate && styles.pendingText]}>
        {hasSecondDoseDate ? formatVaccineDate(dose2 as Dose) : notYetLogged}
      </RegularText>
    </>
  );
};

const styles = StyleSheet.create({
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
});
