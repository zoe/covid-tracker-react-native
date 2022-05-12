import IconInfo from '@assets/v2/svg/icon-info';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Button from '@tracer/components/atoms/Button';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import Screen from '@tracer/components/atoms/Screen';
import IconButton from '@tracer/components/molecules/IconButton';
import ScreenBody from '@tracer/components/molecules/Screen/body';
import ScreenFooter from '@tracer/components/molecules/Screen/footer';
import ScreenProfileHeader from '@tracer/components/templates/ScreenHeaders/profile';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { makeAssessmentFlowService } from '../api';
import AssessmentFlowActionCard from '../components/1-usual-self-bottom-card';
import UsualSelfFrequentSymptoms from '../components/1-usual-self-symptoms-view';
import ModalEmojiExplained from '../modals/EmojiExplained';
import ModalUsualSelfExplanation from '../modals/UsualSelfExplanation';
import { TUsualSelfFrequentSymptom } from '../types';

export default function AssessmentPage1ShowUsualSelf() {
  const [yourUsualSelfSymptoms, setYourUsualSelfSymptoms] = useState<TUsualSelfFrequentSymptom[] | undefined>();
  const [showUsualSelfModal, setUsualSelfModalState] = useState<boolean>(false);
  const [showEmojiExplanationModal, setEmojiExplanationModal] = useState<boolean>(false);
  const assessmentFlowService = makeAssessmentFlowService();

  const onToggleUsualSelfModal = () => setUsualSelfModalState(!showUsualSelfModal);
  const onToggleEmojiExplanationModal = () => setEmojiExplanationModal(!showEmojiExplanationModal);

  const onFeelDifferent = () => {
    NavigatorService.navigate('AssessmentPage2UpdateUsualSelf', {
      usualSelfSymptoms: yourUsualSelfSymptoms || [],
    });
  };

  const onFeelLikeUsualSelf = () => {
    // assessmentFlowService.addNewDailyAssessment(yourUsualSelfSymptoms);
    NavigatorService.navigate('ThankYouUK');
  };

  useEffect(() => {
    assessmentFlowService
      .getUsualSelf()
      .then(({ symptoms }) => {
        setYourUsualSelfSymptoms(symptoms);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Screen>
      {showUsualSelfModal ? (
        <ModalUsualSelfExplanation onClose={() => onToggleUsualSelfModal()} visible={showUsualSelfModal} />
      ) : null}
      {showEmojiExplanationModal ? (
        <ModalEmojiExplained onClose={() => onToggleEmojiExplanationModal()} visible={showEmojiExplanationModal} />
      ) : null}
      <ScreenProfileHeader />
      <ScreenBody style={[baseStyle.body]}>
        {/* TODO: make into it's own component */}
        <Column>
          <Row style={[baseStyle.header]}>
            <Column>
              <Text style={[baseStyle.title]}>{i18n.t('usual-self.assessment-flow.1-title')}</Text>
            </Column>
            <Column style={[baseStyle.infoColumn]}>
              <IconButton buttonType="tertiary" onPress={onToggleUsualSelfModal}>
                <IconInfo fill={colors.transparent} strokeColor={colors.text.primary} />
              </IconButton>
            </Column>
          </Row>
          <Row style={[baseStyle.header]}>
            <Text style={[baseStyle.subTitle]}>{i18n.t('usual-self.assessment-flow.1-subtitle')}</Text>
          </Row>
          <UsualSelfFrequentSymptoms yourFrequentSymptoms={yourUsualSelfSymptoms} />
        </Column>
      </ScreenBody>
      <ScreenFooter>
        <Row style={[baseStyle.cardFooter]}>
          <Button
            buttonType="tertiary"
            onPress={onToggleEmojiExplanationModal}
            text={i18n.t('usual-self.assessment-flow.1-emoji-explain-button')}
            textStyle={[baseStyle.buttonTextStyle]}
          />
        </Row>
        <AssessmentFlowActionCard onFeelDifferent={() => onFeelDifferent()} onFeelLikeUsualSelf={onFeelLikeUsualSelf} />
      </ScreenFooter>
    </Screen>
  );
}

const baseStyle = StyleSheet.create({
  body: {
    backgroundColor: colors.surface.interactive,
  },
  buttonTextStyle: {
    textTransform: 'none',
  },
  cardFooter: {
    backgroundColor: colors.surface.interactive,
    justifyContent: 'flex-start',
    paddingHorizontal: grid.g16,
    paddingVertical: grid.g24,
  },
  header: {
    marginVertical: grid.g4,
    paddingHorizontal: grid.g16,
  },
  infoColumn: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: grid.g8,
    paddingVertical: grid.g2,
  },
  subTitle: {
    color: colors.text.tertiary,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: 'left',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    textAlign: 'left',
  },
});
