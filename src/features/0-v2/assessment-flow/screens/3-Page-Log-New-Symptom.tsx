import IconArrowLeft from '@assets/v2/svg/icon-arrow-left';
import IconBoneJoints from '@assets/v2/svg/icon-bones-joints';
import IconHeadFace from '@assets/v2/svg/icon-head-and-face';
import IconMiscellaneous from '@assets/v2/svg/icon-miscellaneous';
import IconReproductive from '@assets/v2/svg/icon-reproductive';
import IconSkinNails from '@assets/v2/svg/icon-skin-and-nails';
import IconStomachGutBladder from '@assets/v2/svg/icon-stomach-gut-and-bladder';
import IconThoughtBubble from '@assets/v2/svg/icon-thought-bubble';
import IconThroatChestLungs from '@assets/v2/svg/icon-throat-chest-and-lungs';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import Screen from '@tracer/components/atoms/Screen';
import Form from '@tracer/components/molecules/Form/form';
import FormCheckboxQuestion, { IFormCheckboxItemProps } from '@tracer/components/molecules/Form/questions/checkbox';
import ScreenBody from '@tracer/components/molecules/Screen/body';
import ScreenFooter from '@tracer/components/molecules/Screen/footer';
import { ScreenNavigatorCompact } from '@tracer/components/organisms/Screen/nav';
import { FormikValues } from 'formik';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { makeAssessmentFlowService } from '../api';
import UsualSelfActionCardButtonGroup from '../components/0-usual-self-action-card-button-group';

const svgIconMap: { [id: number]: ReactNode } = {
  0: <IconMiscellaneous />,
  1: <IconHeadFace />,
  2: <IconThroatChestLungs />,
  3: <IconStomachGutBladder />,
  4: <IconBoneJoints />,
  5: <IconSkinNails />,
  6: <IconReproductive />,
  7: <IconThoughtBubble />,
};

type TSymptomArea = {
  name: string;
  id: number;
};

type TNewSymptomLocationFormInitValues = {
  [name: string]: object;
};

const makeCheckBoxItems = (areas: TSymptomArea[]): IFormCheckboxItemProps[] => {
  return areas
    .map((area, index) => ({
      icon: svgIconMap[index],
      id: index,
      label: area.name,
      selected: false,
    }))
    .concat({
      icon: null,
      id: areas.length,
      label: 'Other',
      selected: false,
    });
};

export default function AssessmentPage3LogNewSymptom() {
  const [symptomAreas, setSymptomAreas] = useState<TSymptomArea[]>([]);
  const assessmentService = makeAssessmentFlowService();
  const formRef = useRef<FormikValues>();

  const onNewLogSymptomFlowNext = () => {
    // get values from form
    handleSubmit();
    NavigatorService.navigate('AssessmentPage4LogNewSymptomFlow', { categories: ['head_face'] });
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  useEffect(() => {
    assessmentService
      .getSymptomAreas(false)
      .then((areas: TSymptomArea[]) => {
        setSymptomAreas(areas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const checkboxItems = makeCheckBoxItems(symptomAreas);
  const formInitValues: TNewSymptomLocationFormInitValues = {
    'symptom-locations': checkboxItems.reduce((prev, area) => {
      return { ...prev, ...{ [area.id]: '' } };
    }, {}),
  };

  return (
    <Screen>
      <ScreenNavigatorCompact left={<IconArrowLeft />} />
      <ScreenBody style={[baseStyle.body]}>
        {/* TODO: make into it's own assessment flow body component */}
        <Column>
          <Row style={[baseStyle.titleRow]}>
            <Text style={[baseStyle.title]}>{i18n.t('usual-self.assessment-flow.3-title')}</Text>
          </Row>
          <Form initValues={formInitValues} ref={formRef}>
            <FormCheckboxQuestion items={checkboxItems} key="input-form-checkbox" name="symptom-locations" />
          </Form>
        </Column>
      </ScreenBody>
      <ScreenFooter>
        <UsualSelfActionCardButtonGroup
          style={[baseStyle.cardButtonGroup]}
          topButton={{
            onPress: onNewLogSymptomFlowNext,
            text: i18n.t('usual-self.assessment-flow.3-action-card-cta-1'),
          }}
        />
      </ScreenFooter>
    </Screen>
  );
}

const baseStyle = StyleSheet.create({
  body: {
    backgroundColor: colors.surface.interactive,
  },
  cardButtonGroup: {
    backgroundColor: colors.white,
    paddingVertical: grid.g24,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 40,
    marginBottom: grid.g24,
    paddingHorizontal: grid.g32,
    textAlign: 'center',
  },
  titleRow: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
