import { QuoteMarks } from '@assets';
import { RoundIconButton, Spacer, Text } from '@covid/components';
import { getDietStudyDoctorImage } from '@covid/features/diet-study-playback/v2/utils';
import i18n from '@covid/locale/i18n';
import { TStyleObject } from '@covid/utils/types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import appCoordinator from '../../AppCoordinator';

interface IProps {
  style?: TStyleObject;
}

function DietStudyCard({ style }: IProps) {
  const handleOnPress = () => {
    appCoordinator.goToDietStudy();
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={[styles.container, style]}>
        <View style={[styles.row, { marginBottom: 12 }]}>
          <View style={styles.column}>
            <QuoteMarks />
            <Spacer />
            <Text textClass="h5Regular">{i18n.t('diet-study.results-ready')}</Text>
          </View>
          <View>
            {getDietStudyDoctorImage()}
            <Text>{i18n.t('diet-study.doctor-name')}</Text>
            <Text style={{ color: '#888B8C' }} textClass="pSmall">
              {i18n.t('diet-study.doctor-title')}
            </Text>
            <Text style={{ color: '#888B8C' }} textClass="pSmall">
              {i18n.t('diet-study.doctor-location')}
            </Text>
          </View>
        </View>
        <View style={[styles.row, { alignItems: 'center' }]}>
          <View style={{ flex: 1 }}>
            <View style={styles.button}>
              <Text style={{ color: 'white' }} textClass="label">
                {i18n.t('navigation.insights').toUpperCase()}
              </Text>
            </View>
          </View>
          <View>
            <RoundIconButton
              iconName="arrow_forward_ios"
              onPress={handleOnPress}
              style={{
                backgroundColor: 'white',
                elevation: 5,
                shadowColor: '#000',
                shadowOffset: { height: 0, width: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    backgroundColor: 'blue',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  column: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    borderColor: '#e5e5e5',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  row: {
    flexDirection: 'row',
  },
  shadow: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
});

export default DietStudyCard;
