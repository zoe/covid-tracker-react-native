import i18n from '@covid/locale/i18n';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Column from '@tracer/components/atoms/Column';
import Row from '@tracer/components/atoms/Row';
import StackedCard from '@tracer/components/organisms/Card/stacked';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import UsualSelfActionCardButtonGroup from './0-usual-self-action-card-button-group';

interface IAssessmentFlowActionCardProps {
  onFeelDifferent: () => void;
  onFeelLikeUsualSelf: () => void;
}

export default function AssessmentFlowActionCard({
  onFeelDifferent,
  onFeelLikeUsualSelf,
}: IAssessmentFlowActionCardProps) {
  return (
    <StackedCard
      cardProps={{
        customBody: (
          <Text style={[baseStyle.actionTitle]}>{i18n.t('usual-self.assessment-flow.1-action-card-title')}</Text>
        ),
        customFooter: (
          <Row>
            <Column style={[{ justifyContent: 'center' }]}>
              <UsualSelfActionCardButtonGroup
                bottomButton={{
                  buttonType: 'secondary',
                  onPress: onFeelDifferent,
                  text: i18n.t('usual-self.assessment-flow.1-action-card-cta-2'),
                }}
                topButton={{
                  onPress: onFeelLikeUsualSelf,
                  text: i18n.t('usual-self.assessment-flow.1-action-card-cta-1'),
                }}
              />
              <Row style={[baseStyle.actionFooterRow]}>
                <Text style={[baseStyle.footerOuterText]}>
                  {i18n.t('usual-self.assessment-flow.1-action-card-footer-start')}
                  <Text style={[baseStyle.footerHiglightText]}>
                    {i18n.t('usual-self.assessment-flow.1-action-card-footer-highlight-1')}
                  </Text>
                  {i18n.t('usual-self.assessment-flow.1-action-card-footer-middle')}
                  <Text style={[baseStyle.footerHiglightText]}>
                    {i18n.t('usual-self.assessment-flow.1-action-card-footer-highlight-2')}
                  </Text>
                  {i18n.t('usual-self.assessment-flow.1-action-card-footer-end')}
                </Text>
              </Row>
            </Column>
          </Row>
        ),
      }}
      style={[baseStyle.view]}
    />
  );
}

const baseStyle = StyleSheet.create({
  actionFooterRow: {
    marginBottom: grid.g24,
    marginTop: grid.g8,
    paddingHorizontal: grid.g24,
  },
  actionTitle: {
    fontSize: 28,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 40,
    marginBottom: grid.g24,
    marginTop: grid.g32,
    paddingHorizontal: grid.g32,
    textAlign: 'center',
  },
  footerHiglightText: {
    color: colors.text.brand,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: 'center',
  },
  footerOuterText: {
    color: colors.text.brand,
    fontSize: 14,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: 'center',
  },
  view: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: grid.g32,
    borderTopRightRadius: grid.g32,
    flexDirection: 'column',
    flexGrow: 1,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 30,
    width: '100%',
  },
});
