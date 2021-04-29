import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { RoundIconButton, Spacer, Text } from '@covid/components';
import { QuoteMarks } from '@assets';
import { TStyleObject } from '@covid/utils/types';
import { getDietStudyDoctorImage } from '@covid/features/diet-study-playback/v2/utils';

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
            <Text textClass="pSmall" style={{ color: '#888B8C' }}>
              {i18n.t('diet-study.doctor-title')}
            </Text>
            <Text textClass="pSmall" style={{ color: '#888B8C' }}>
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
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5,
              }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: 'blue',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
});

export default DietStudyCard;
