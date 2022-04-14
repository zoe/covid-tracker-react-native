import InfoCircle from '@assets/icons/InfoCircle';
import { Header3Text, Text } from '@covid/components';
import { CheckboxItem } from '@covid/components/inputsRedesigned/Checkbox';
import { TUsualSelfSetupRequest } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import { FormikProps } from 'formik';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export type TItemCheckbox = {
  label: string;
  name: keyof TUsualSelfSetupRequest;
};

interface IProps {
  formikProps: FormikProps<any>;
  item: TItemCheckbox;
}

export function UsualSelfSymptomFrequencyQuality(props: IProps) {
  const [isSelected, setIsSelected] = React.useState(false);

  const frequencyIconOnPress = () => {
    // TODO: Add modal
    console.log('frequencyIconOnPress');
  };

  const impactIconOnPress = () => {
    // TODO: Add modal
    console.log('impactIconOnPress');
  };

  return (
    <View>
      <CheckboxItem
        onChange={(checked: boolean) => {
          setIsSelected(checked);
          props.formikProps.setFieldValue(props.item.name, checked);
        }}
        testID={`checkbox-${props.item.name}`}
        value={props.formikProps.values[props.item.name]}
      >
        {props.item.label}
      </CheckboxItem>
      {isSelected ? (
        <View style={styles.frequencyImpactContainer}>
          <View>
            <View style={styles.rowWithIcon}>
              <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.marginRight} textClass="pMedium">
                {i18n.t('usual-self.symptom.select-frequency')}
              </Text>
              <TouchableOpacity onPress={frequencyIconOnPress}>
                <InfoCircle color={colors.secondary} />
              </TouchableOpacity>
            </View>
            <Header3Text>ADD FREQUENCY SLIDER</Header3Text>
          </View>

          <View style={styles.impactContainer}>
            <View style={styles.rowWithIcon}>
              <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.marginRight} textClass="pMedium">
                {i18n.t('usual-self.symptom.select-impact')}
              </Text>
              <TouchableOpacity onPress={impactIconOnPress}>
                <InfoCircle color={colors.secondary} />
              </TouchableOpacity>
            </View>
            <Header3Text>ADD IMPACT SLIDER</Header3Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  frequencyImpactContainer: {
    marginVertical: sizes.m,
  },
  impactContainer: {
    marginTop: sizes.m,
  },
  marginRight: {
    marginRight: sizes.xs,
  },
  rowWithIcon: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: sizes.l,
  },
});
