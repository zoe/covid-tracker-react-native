import { IUIAction } from '@covid/common';
import { Text, ThemeButton } from '@covid/components';
import { SButtonRowView } from '@covid/components/messaging/banners/styles';
import i18n from '@covid/locale/i18n';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

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
                  simple
                  colorPalette="teal"
                  colorShade="main"
                  key={key}
                  onPress={action.action}
                  title={action.label}
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
    elevation: 5,
    marginTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    paddingTop: 48,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { height: 12, width: 0 },

    shadowOpacity: 0.1,
    shadowRadius: 12,
    top: 0,
    width: '100%',
    zIndex: 100,
  },
});

export default VaccineWarning;
