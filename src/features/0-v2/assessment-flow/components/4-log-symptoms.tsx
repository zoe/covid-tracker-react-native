import i18n from '@covid/locale/i18n';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import Tag from '@tracer/components/atoms/Tag';
import FormPageLabel from '@tracer/components/molecules/Form/labels/page';
import { CheckboxInfoLabel } from '@tracer/components/molecules/Form/questions/multiCheckbox';
import FormRadioQuestion from '@tracer/components/molecules/Form/questions/radio';
import FormSingleCheckboxQuestion, {
  IFormSingleCheckboxItemProps,
} from '@tracer/components/molecules/Form/questions/singleCheckbox';
import ScreenBody from '@tracer/components/molecules/Screen/body';
import { FormikValues } from 'formik';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import {
  SYMPTOM_FREQUENCY_LABELS,
  SYMPTOM_SEVERITY_LABELS,
  TSubSymptom,
  TSymptom,
  TSymptomCategory,
} from '../../usual-self/types';
import InfoLabel from './2-usual-self-label';

const makeRadioSubItem = (symptom: TSubSymptom) => ({
  id: symptom.name,
  label: symptom.display_name,
  selected: false,
  value: symptom.name,
});

const makeCheckboxSubItem = (symptom: TSubSymptom) => ({
  id: symptom.name,
  label: symptom.display_name,
  selected: false,
});

const makeCheckboxItem = (symptom: TSymptom): IFormSingleCheckboxItemProps => ({
  id: symptom.name,
  label: symptom.display_name,
  selected: false,
});

interface ILogSymptomScreenBodyProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  symptomCategory?: TSymptomCategory;
  isUsualSelf?: boolean;
  values: FormikValues;
  onToggleFrequencyModal?: () => void;
  onToggleImpactOnLifeModal?: () => void;
}

export default function LogSymptomScreenBody({
  symptomCategory,
  setFieldValue,
  isUsualSelf,
  onToggleFrequencyModal,
  onToggleImpactOnLifeModal,
  values,
}: ILogSymptomScreenBodyProps) {
  if (!symptomCategory) return null;
  return (
    <>
      <ScreenBody style={[baseStyle.screenBody]}>
        {isUsualSelf ? (
          <Column style={[baseStyle.titleRow]}>
            <Row style={[baseStyle.flexGrow]}>
              <Column style={{ justifyContent: 'flex-start' }}>
                <Tag text={i18n.t('usual-self.setup.tag')} />
              </Column>
            </Row>
            {/* eslint-disable-next-line no-restricted-syntax */}
            {symptomCategory.name === 'misc' && (
              <FormPageLabel
                highlightedStart={i18n.t('usual-self.setup.question-highlighted')}
                label={i18n.t('usual-self.setup.question-label')}
                required={false}
                style={[{ flexGrow: 1, marginVertical: grid.g12 }]}
              />
            )}
            {/* eslint-disable-next-line no-restricted-syntax */}
            {symptomCategory.name !== 'misc' && (
              <FormPageLabel
                highlightedEnd={`${symptomCategory.display_name}?`}
                label={i18n.t('usual-self.setup.1-log-new-symptom-flow-title-2')}
                required={false}
                style={[{ flexGrow: 1, marginVertical: grid.g12 }]}
              />
            )}
          </Column>
        ) : (
          <Row style={[baseStyle.titleRow]}>
            <Text style={baseStyle.title}>
              {i18n.t('usual-self.assessment-flow.4-log-new-symptom-flow-title')}
              <Text style={baseStyle.titleHighlight}>{symptomCategory.display_name}?</Text>
            </Text>
          </Row>
        )}
        <Column>
          <Row style={{ paddingBottom: grid.g16 }}>
            <CheckboxInfoLabel />
          </Row>
          {symptomCategory
            ? symptomCategory.symptoms.map((symptom: TSymptom, index: number) => {
                const formID = `${symptomCategory.name}`;
                return (
                  <FormSingleCheckboxQuestion
                    handleChange={setFieldValue}
                    item={makeCheckboxItem(symptom)}
                    key={`form.checkbox.${symptomCategory.id}-${index + 1}`}
                    name={formID}
                    textStyle={{ marginLeft: 0 }}
                  >
                    {values[formID] && values[formID][symptom.name]?.state ? (
                      <>
                        <Row style={[{ flexGrow: 1, marginHorizontal: grid.g32 }]}>
                          {/* eslint-disable-next-line no-restricted-syntax */}
                          {symptom.display_type === 'single_select' && symptom.symptoms && (
                            <FormRadioQuestion
                              flow
                              handleChange={setFieldValue}
                              items={symptom.symptoms.map((subItem) => makeRadioSubItem(subItem))}
                              labelStyle={{ marginLeft: 0 }}
                              name={`${formID}.${symptom.name}.options`}
                            />
                          )}
                        </Row>
                        {/* eslint-disable-next-line no-restricted-syntax */}
                        {symptom.display_type === 'multi_select' &&
                          symptom.symptoms &&
                          symptom.symptoms.map((subItem, subItemIndex) => (
                            <FormSingleCheckboxQuestion
                              handleChange={setFieldValue}
                              item={makeCheckboxSubItem(subItem)}
                              key={`form-${symptom.name}-options-${subItem.name}-${subItemIndex + 1}`}
                              name={`${formID}.${symptom.name}.subSymptoms`}
                              style={{ paddingHorizontal: grid.g32 }}
                              textStyle={{ marginLeft: 0 }}
                            />
                          ))}
                        {isUsualSelf ? (
                          <>
                            <Row>
                              <Column style={{ marginTop: grid.g16, paddingHorizontal: grid.g16 }}>
                                <InfoLabel
                                  onPressInfo={() => (onToggleFrequencyModal ? onToggleFrequencyModal() : () => {})}
                                  text={i18n.t('usual-self.setup.1-setup-flow-frequency-slider')}
                                  textStyle={[baseStyle.infoLabel]}
                                />
                                <FormRadioQuestion
                                  handleChange={setFieldValue}
                                  items={SYMPTOM_FREQUENCY_LABELS}
                                  labelStyle={{ marginLeft: 0 }}
                                  name={`${formID}.${symptom.name}.frequency`}
                                />
                              </Column>
                            </Row>
                            <Row>
                              <Column style={{ paddingHorizontal: grid.g16 }}>
                                <InfoLabel
                                  onPressInfo={() =>
                                    onToggleImpactOnLifeModal ? onToggleImpactOnLifeModal() : () => {}
                                  }
                                  text={i18n.t('usual-self.setup.1-setup-flow-severity-slider')}
                                  textStyle={baseStyle.infoLabel}
                                />
                                <FormRadioQuestion
                                  handleChange={setFieldValue}
                                  items={SYMPTOM_SEVERITY_LABELS}
                                  labelStyle={{ marginLeft: 0 }}
                                  name={`${formID}.${symptom.name}.severity`}
                                />
                              </Column>
                            </Row>
                          </>
                        ) : null}
                      </>
                    ) : null}
                  </FormSingleCheckboxQuestion>
                );
              })
            : null}
        </Column>
      </ScreenBody>
    </>
  );
}

const baseStyle = StyleSheet.create({
  cardButtonGroup: {
    backgroundColor: colors.white,
    paddingTop: grid.g16,
  },
  flexGrow: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 30,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: grid.g24,
    textAlign: 'left',
  },
  screenBody: {
    marginTop: grid.g16,
    paddingHorizontal: grid.g24,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 26,
    textAlign: 'left',
  },
  titleHighlight: {
    color: colors.accent,
  },
  titleRow: {
    justifyContent: 'flex-start',
    marginBottom: grid.g24,
  },
});
