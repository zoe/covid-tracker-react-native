import { Card, Tag, Text } from '@covid/components';
import { IconHealthProfile } from '@covid/features/study-hub/onboarding/IconHealthProfile';
import { IconSimplifiedReporting } from '@covid/features/study-hub/onboarding/IconSimplifiedReporting';
import { IconStudiesHub } from '@covid/features/study-hub/onboarding/IconStudiesHub';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

type TCard = {
  IllustrationComponent: React.ComponentType;
  description: string;
  id: string;
  isComingSoon?: boolean;
  isNew?: boolean;
  title: string;
};

const getCardsData = (): TCard[] => [
  {
    IllustrationComponent: IconStudiesHub,
    description: i18n.t('study-hub.onboarding.slide-4.card-1.description'),
    id: 'card-disease-risk',
    isNew: true,
    title: i18n.t('study-hub.onboarding.slide-4.card-1.title'),
  },
  {
    IllustrationComponent: IconHealthProfile,
    description: i18n.t('study-hub.onboarding.slide-4.card-2.description'),
    id: 'card-habits-behaviours',
    isComingSoon: true,
    title: i18n.t('study-hub.onboarding.slide-4.card-2.title'),
  },
  {
    IllustrationComponent: IconSimplifiedReporting,
    description: i18n.t('study-hub.onboarding.slide-4.card-3.description'),
    id: 'card-immune-health',
    isComingSoon: true,
    title: i18n.t('study-hub.onboarding.slide-4.card-3.title'),
  },
];

export function OnboardingSlideFour() {
  const cards = React.useMemo(getCardsData, [i18n.currentLocale]);
  return (
    <>
      <Text inverted colorPalette="uiDark" colorShade="darker" textAlign="center" textClass="h3Light">
        {i18n.t('study-hub.onboarding.slide-4.title')}
      </Text>
      {cards.map((card: TCard, index: number) => (
        <Card style={index === 0 ? styles.firstCard : styles.card}>
          {card.isNew ? <Tag color={colors.accent} style={styles.tag} text={i18n.t('new')} /> : null}
          {card.isComingSoon ? (
            <Text inverted colorPalette="accentMagenta" colorShade="main" style={styles.marginBottom} textClass="tag">
              {i18n.t('coming-soon').toUpperCase()}
            </Text>
          ) : null}
          <View style={styles.wrapper}>
            <card.IllustrationComponent />

            <Text
              inverted
              colorPalette="uiDark"
              colorShade="darker"
              style={styles.marginLeft}
              textAlign="center"
              textClass="h3"
            >
              {card.title}
            </Text>
          </View>
          <Text inverted colorPalette="uiDark" colorShade="darker" textClass="pLight">
            {card.description}
          </Text>
        </Card>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderColor: colors.darkBlue80,
    borderStyle: 'dashed',
    borderWidth: 2,
    marginTop: sizes.l,
  },
  firstCard: {
    backgroundColor: colors.lightBlueBackground,
    borderColor: colors.lightBlueBackground,
    borderWidth: 2,
    marginTop: sizes.l,
  },
  marginBottom: {
    marginBottom: sizes.s,
  },
  marginLeft: {
    marginLeft: sizes.l,
  },
  tag: {
    alignSelf: 'flex-start',
    marginBottom: sizes.s,
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: sizes.s,
  },
});
