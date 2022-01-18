import { Card, Text } from '@covid/components';
import { IllustrationDiseaseRisk } from '@covid/features/study-hub/onboarding/IllustrationDiseaseRisk';
import { IllustrationHabitsBehaviours } from '@covid/features/study-hub/onboarding/IllustrationHabitsBehaviours';
import { IllustrationImmuneHealth } from '@covid/features/study-hub/onboarding/IllustrationImmuneHealth';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet } from 'react-native';

type TCardContent = {
  IllustrationComponent: React.ComponentType;
  description: string;
  id: string;
  title: string;
};

const getCardsData = (): TCardContent[] => [
  {
    IllustrationComponent: IllustrationImmuneHealth,
    description: i18n.t('study-hub.onboarding.slide-3.card-1.description'),
    id: 'card-disease-risk',
    title: i18n.t('study-hub.onboarding.slide-3.card-1.title'),
  },
  {
    IllustrationComponent: IllustrationHabitsBehaviours,
    description: i18n.t('study-hub.onboarding.slide-3.card-2.description'),
    id: 'card-habits-behaviours',
    title: i18n.t('study-hub.onboarding.slide-3.card-2.title'),
  },
  {
    IllustrationComponent: IllustrationDiseaseRisk,
    description: i18n.t('study-hub.onboarding.slide-3.card-3.description'),
    id: 'card-immune-health',
    title: i18n.t('study-hub.onboarding.slide-3.card-3.title'),
  },
];

export function OnboardingSlideThree() {
  const cards = React.useMemo(getCardsData, [i18n.currentLocale]);
  return (
    <>
      <Text inverted colorPalette="uiDark" colorShade="darker" textAlign="center" textClass="h3Light">
        {i18n.t('study-hub.onboarding.slide-3.title')}
      </Text>
      {cards.map((card: TCardContent) => (
        <Card
          backgroundColor={colors.lightBlueBackground}
          style={{
            marginTop: sizes.l,
          }}
        >
          <card.IllustrationComponent style={styles.illustration} />

          <Text
            inverted
            colorPalette="blue"
            colorShade="main"
            style={styles.title}
            // textAlign="center"
            textClass="h4Medium"
          >
            {card.title}
          </Text>
          <Text inverted colorPalette="uiDark" colorShade="darker" textClass="pLight">
            {card.description}
          </Text>
        </Card>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  illustration: {
    left: 0,
    position: 'absolute',
    top: -sizes.s,
  },
  title: {
    marginBottom: sizes.l,
    marginLeft: 60,
  },
});
