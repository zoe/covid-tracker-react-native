import InfoCircle from '@assets/icons/InfoCircle';
import { Header3Text, Text } from '@covid/components';
import { CheckboxItem } from '@covid/components/inputsRedesigned/Checkbox';
import { RadioInput } from '@covid/components/inputsRedesigned/RadioInput';
import { TUsualSelfSetupSymptom } from '@covid/features/usual-self/data/types';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import { FormikProps } from 'formik';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface IProps {
  formikProps: FormikProps<any>;
  item: TUsualSelfSetupSymptom;
}

interface IFrequencySliderProps {
  frequencyIconOnPress: () => void;
  impactIconOnPress: () => void;
}

function FrequencyImpactSliders(props: IFrequencySliderProps) {
  return (
    <>
      <View style={styles.frequencyImpactContainer}>
        <View>
          <View style={styles.rowWithIcon}>
            <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.marginRight} textClass="pMedium">
              {i18n.t('usual-self.symptom.select-frequency')}
            </Text>
            <TouchableOpacity onPress={props.frequencyIconOnPress}>
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
            <TouchableOpacity onPress={props.impactIconOnPress}>
              <InfoCircle color={colors.secondary} />
            </TouchableOpacity>
          </View>
          <Header3Text>ADD IMPACT SLIDER</Header3Text>
        </View>
      </View>
    </>
  );
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

  const renderSubSymptoms = () => {
    if (props.item.subSymptomType === 'checkbox') {
      return (
        <>
          <View style={styles.indent}>
            {props.item.subSymptoms.map((subSymptom) => (
              <>
                <CheckboxItem
                  onChange={(checked: boolean) => {
                    props.formikProps.setFieldValue(subSymptom.name, checked);
                  }}
                  testID={`checkbox-${subSymptom.name}`}
                  value={props.formikProps.values[subSymptom.name]}
                >
                  {subSymptom.label}
                </CheckboxItem>

                {/* TODO: Add conditional to only show sliders if checked */}
                <View style={{ marginLeft: -sizes.xxl }}>
                  <FrequencyImpactSliders
                    frequencyIconOnPress={frequencyIconOnPress}
                    impactIconOnPress={impactIconOnPress}
                  />
                </View>
              </>
            ))}
          </View>
          <View style={styles.hr} />
        </>
      );
    }

    if (props.item.subSymptomType === 'radio') {
      // Note: handlechange will error until Formik is hooked up
      return (
        <View style={styles.indent}>
          <RadioInput
            hideLabel
            items={props.item.subSymptoms}
            onValueChange={props.formikProps.handleChange(props.item.name)}
            selectedValue={props.formikProps.values[props.item.name]}
            testID={`radio-${props.item.name}`}
          />
        </View>
      );
    }

    return null;
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

      {isSelected && props.item.subSymptomType && props.item.subSymptoms ? renderSubSymptoms() : null}

      {isSelected && props.item.subSymptomType !== 'checkbox' ? (
        <FrequencyImpactSliders frequencyIconOnPress={frequencyIconOnPress} impactIconOnPress={impactIconOnPress} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  frequencyImpactContainer: {
    marginVertical: sizes.m,
  },
  hr: {
    backgroundColor: colors.backgroundFour,
    height: 1,
    marginBottom: sizes.xl,
    marginTop: sizes.l,
    width: '100%',
  },
  impactContainer: {
    marginTop: sizes.m,
  },
  indent: {
    marginLeft: sizes.xxl,
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
