---
to: src/features/<%= feature %>/<%= h.screenName(name) %>.tsx
---
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { colors } from '@covid/theme';
import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, RegularText, RegularBoldText } from '@covid/components/Text';
import { Button } from '@covid/components/Buttons/Button';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import NavigatorService from '@covid/NavigatorService';
// import i18n from '@covid/locale/i18n';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, '<%= name %>'>;
  route: RouteProp<ScreenParamList, '<%= name %>'>;
};

export const <%= h.screenName(name) %>: React.FC<Props> = ({ route, navigation }) => {

  const goNext = () => { };

  return (
    <View style={styles.container}>
      <Screen showBackButton navigation={navigation} style={styles.container}>
        <View style={styles.container}>

          <Header>
            <HeaderText style={styles.header}>Header</HeaderText>
          </Header>

          <View style={styles.description}>
            <RegularBoldText>Title 1</RegularBoldText>
            <RegularText>Description 1</RegularText>
            <View style={{ height: 16 }} />
            <RegularBoldText>Title 2</RegularBoldText>
            <RegularText>Description 2</RegularText>
            <View style={{ height: 16 }} />
            <RegularBoldText>Title 3</RegularBoldText>
            <RegularText>Description 3</RegularText>
          </View>
        </View>
      </Screen>

      <View style={styles.buttonsContainer}>
        <Button onPress={goNext} branded>
          CTA - a
        </Button>
        <Button onPress={() => NavigatorService.navigate('Dashboard')}>CTA 2</Button>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  header: {
    marginRight: 72,
  },

  description: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  button: {
    marginVertical: 16,
    marginHorizontal: 24,
    marginBottom: 32,
  },

  buttonsContainer: {
    paddingHorizontal: 8,
    marginBottom: 48,
  },
});
