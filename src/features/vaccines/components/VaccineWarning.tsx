import React from 'react';
import { View } from 'native-base';
import { StyleSheet } from 'react-native';

import i18n from '@covid/locale/i18n';
import { Text, ThemeButton } from '@covid/components';
import { SButtonRowView } from '@covid/components/messaging/banners/styles';
import { IUIAction } from '@covid/common';

interface IProps {
  actions: IUIAction[];
}

function VaccineWarning({ actions }: IProps) {
  return (
    <View style={[styles.container]}>
      <Text> {i18n.t('vaccines.banner.body')}</Text>
      <SButtonRowView>
        {actions
          ? actions.map((action, index) => {
              const key = `banner-action-${index}`;
              return (
                <ThemeButton
                  key={key}
                  onPress={action.action}
                  title={action.label}
                  colorPalette="teal"
                  colorShade="main"
                  simple
                />
              );
            })
          : null}
      </SButtonRowView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 12,
    paddingTop: 48,
    paddingBottom: 12,
    paddingHorizontal: 16,
    position: 'absolute',
    top: 0,
    zIndex: 100,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
});

export default VaccineWarning;
