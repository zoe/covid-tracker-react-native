import { Text } from '@covid/components';
import { BrandedButton } from '@covid/components/buttons';
import { reconsentReducer, selectDiseasesActivated, selectReconsentState } from '@covid/core/state/reconsent';
import {
  resetDiseasePreferences,
  setDiseasePreferences,
  updateDiseasePreference,
} from '@covid/core/state/reconsent/slice';
import { TDiseaseId } from '@covid/core/state/reconsent/types';
import { TDiseasePreference } from '@covid/features/reconsent/types';
import DiseaseCard from '@covid/features/wider-health-studies/components/DiseaseCard';
import InfoBox from '@covid/features/wider-health-studies/components/InfoBox';
import { diseasePreferences } from '@covid/features/wider-health-studies/data/diseases';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

function keyExtractor(disease: TDiseasePreference) {
  return disease.name;
}

type TProps = {
  buttonTitle: string;
  onSubmit: () => void;
  showActiveText?: boolean;
  topChildren?: React.ReactNode;
};

export const DiseasePreferencesList: React.FC<TProps> = React.memo((props: TProps) => {
  const reconsentGlobalState = useSelector(selectReconsentState);
  const [reconsentLocalState, dispatchLocal] = React.useReducer(reconsentReducer, reconsentGlobalState);
  const dispatchGlobal = useDispatch();

  const diseasesActivated = useSelector(() => selectDiseasesActivated(reconsentLocalState));

  const onPressCard = (diseaseId: TDiseaseId) => {
    if (diseaseId === 'prefer_not_to_say' && !reconsentLocalState.diseasePreferences[diseaseId]) {
      dispatchLocal(resetDiseasePreferences());
    } else if (
      reconsentLocalState.diseasePreferences.prefer_not_to_say === true &&
      diseaseId !== 'prefer_not_to_say' &&
      !reconsentLocalState.diseasePreferences[diseaseId]
    ) {
      dispatchLocal(
        updateDiseasePreference({
          diseaseId: 'prefer_not_to_say',
          value: false,
        }),
      );
    }
    dispatchLocal(
      updateDiseasePreference({
        diseaseId,
        value: !reconsentLocalState.diseasePreferences[diseaseId],
      }),
    );
  };

  const renderItem = ({ item, index }: { item: TDiseasePreference; index: number }) => {
    return (
      <DiseaseCard
        description={i18n.t(`disease-cards.${item.name}.description`, { defaultValue: '' })}
        IconComponent={item.IconComponent}
        key={item.name}
        onPress={() => onPressCard(item.name)}
        selected={!!reconsentLocalState.diseasePreferences[item.name]}
        style={index !== 0 && styles.marginTop}
        testID={`disease-card-${item.name}`}
        title={i18n.t(`disease-cards.${item.name}.name`, { defaultValue: '' })}
      />
    );
  };

  function onPress() {
    props.onSubmit();
    dispatchGlobal(setDiseasePreferences({ diseasePreferences: reconsentLocalState.diseasePreferences }));
  }

  return (
    <>
      <ScrollView style={styles.flex}>
        {props.topChildren}
        {props.showActiveText ? (
          <Text style={styles.selfCenter}>
            <Text inverted colorPalette="accentBlue" colorShade="main" textClass="pMedium">
              {diseasesActivated.length}{' '}
            </Text>
            <Text inverted colorPalette="accentBlue" colorShade="main" textClass="pLight">
              {i18n.t('wider-health-studies.disease-preferences.description', { count: diseasesActivated.length })}
            </Text>
          </Text>
        ) : null}
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={diseasePreferences}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          scrollEnabled={false}
          style={styles.flex}
        />
        <InfoBox style={styles.marginHorizontal} text={i18n.t('reconsent.disease-preferences.how-data-used')} />
      </ScrollView>
      <BrandedButton onPress={onPress} style={styles.button} testID="button-cta-disease-preferences-submit">
        {props.buttonTitle}
      </BrandedButton>
    </>
  );
});

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
    margin: sizes.l,
  },
  contentContainer: {
    padding: sizes.l,
  },
  flex: {
    flex: 1,
  },
  marginHorizontal: {
    marginHorizontal: sizes.l,
  },
  marginTop: {
    marginTop: sizes.l,
  },
  selfCenter: {
    alignSelf: 'center',
  },
});
