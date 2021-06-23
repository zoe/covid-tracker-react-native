import { cardBackground1, cardBackground2, cardBackground3 } from '@assets';
import { colors } from '@theme';
import { View } from 'native-base';
import * as React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

import { RegularBoldText, RegularText } from './Text';

type CardProps = {
  header: string;
  body: string;
  backgroundVariant?: 1 | 2 | 3;
};

export const InfoCard: React.FC<CardProps> = (props) => {
  const backgroundImage = (backgroundVariant: number) => {
    switch (backgroundVariant) {
      case 1:
        return cardBackground1;
      case 2:
        return cardBackground2;
      case 3:
        return cardBackground3;
      default:
        return cardBackground1;
    }
  };

  return props.backgroundVariant ? (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage(props.backgroundVariant)} style={styles.backgroundImage}>
        <View style={styles.contentContainer}>
          <RegularBoldText>
            {props.header}
            {'\n'}
          </RegularBoldText>
          <RegularText style={styles.paragraph}>{props.body}</RegularText>
        </View>
      </ImageBackground>
    </View>
  ) : (
    <View style={styles.container}>
      <RegularBoldText>
        {props.header}
        {'\n'}
      </RegularBoldText>
      <RegularText style={styles.paragraph}>{props.body}</RegularText>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    elevation: 0,
    marginVertical: 24,
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  paragraph: {
    marginVertical: 8,
  },
});
