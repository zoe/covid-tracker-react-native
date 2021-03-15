import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon, Text } from '@covid/components';

import ProgressBars from './progress-bars';
import { TProgress } from './progress-bar';

export type TStudy = 'ONGOING' | 'FUTURE';

interface IProps {
  footerTitle: string;
  progress: TProgress[];
  studyType: TStudy;
  subTitle: string;
  title: string;
}

function StudyCard({ footerTitle, progress, studyType, subTitle, title }: IProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon iconName={studyType === 'ONGOING' ? 'search' : 'processed'} iconSize={18} style={{ marginTop: 4 }} />
        <Text textClass="pBold" style={{ color: '#24262B', marginLeft: 12 }}>
          {title}
        </Text>
      </View>
      <Text textClass="h5Light" style={styles.body}>
        {subTitle}
      </Text>
      <ProgressBars progress={progress} />
      <Text style={{ color: '#024364', marginTop: 12 }} textClass="pMedium">
        {footerTitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 48,
    padding: 16,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {
    marginBottom: 24,
    marginTop: 12,
  },
});

export default StudyCard;
