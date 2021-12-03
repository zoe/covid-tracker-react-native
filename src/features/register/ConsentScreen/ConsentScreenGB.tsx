import { Text } from '@covid/components';
import { ELegalCardType, LegalCard } from '@covid/components/cards/LegalCard';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'Consent'>;
  route: RouteProp<TScreenParamList, 'Consent'>;
  setAgreed: (agreed: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

const hitSlop = {
  bottom: 20,
  top: 20,
};

const cards = [
  ELegalCardType.FightCovid19,
  ELegalCardType.AdvanceScience,
  ELegalCardType.ImproveHealth,
  ELegalCardType.BuildProducts,
];

export const ConsentScreenGB: React.FC<TProps> = React.memo((props: TProps) => {
  React.useEffect(() => {
    props.setAgreed(true);
  }, []);

  const onPrivacyPolicyPress = () => NavigatorService.navigate('PrivacyPolicyUK');

  const onInformationSheetPress = () => openWebLink('https://covid.joinzoe.com/wider-health-studies-infosheet');

  return (
    <View style={props.style}>
      <Text rhythm={24} style={styles.center} textClass="h3Light">
        {i18n.t('consent-normal-uk.title')}
      </Text>
      <Text rhythm={24} style={[styles.center, styles.secondaryColour]} textClass="pLight">
        {i18n.t('consent-normal-uk.subtitle')}
      </Text>
      {cards.map((type, i) => (
        <LegalCard index={i} key={`legal-card-${type}`} type={type} />
      ))}
      <TouchableOpacity
        hitSlop={hitSlop}
        onPress={onPrivacyPolicyPress}
        style={styles.marginTop}
        testID="button-privacy-notice"
      >
        <Text style={styles.externalLink} textClass="pSmallLight">
          {i18n.t('reconsent.request-consent.privacy-notice')}{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        hitSlop={hitSlop}
        onPress={onInformationSheetPress}
        style={styles.marginTop}
        testID="button-information-sheet"
      >
        <Text style={styles.externalLink} textClass="pSmallLight">
          {i18n.t('reconsent.request-consent.information-sheet')}{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  externalLink: {
    color: colors.darkblue,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  marginTop: {
    marginTop: sizes.xl,
  },
  secondaryColour: {
    color: colors.secondary,
  },
});
