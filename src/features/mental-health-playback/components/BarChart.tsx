import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import Mention from '@assets/mental-health-playback/Mention';
import { styling } from '@covid/themes';

interface IItem {
  title: string;
  label: string;
  value: number;
}

interface IProps {
  color: string;
  items: IItem[];
}

const ITEM_HEIGHT = 50;
const MAX_WIDTH = 100;
const MIN_OPACITY = 0.4;

export default React.memo(function BarChart({ items = [], ...props }: IProps) {
  const totalValue = items.reduce((previousValue, item) => previousValue + item.value, 0);
  return (
    <>
      {items.map((item, index) => (
        <View key={`bar-chart-item-${index}`} style={styling.rowCenter}>
          {index === 0 ? (
            <Mention color="#A10056">
              <Text inverted colorPalette="ui" colorShade="lighter" textClass="h6Regular" style={styles.text}>
                {i18n.t('mental-health-playback.you')}
              </Text>
            </Mention>
          ) : (
            <Mention color="#ffffff" />
          )}
          <View
            style={{
              backgroundColor: props.color,
              borderBottomRightRadius: 8,
              borderTopRightRadius: 8,
              height: ITEM_HEIGHT,
              opacity:
                index + 1 === items.length ? 1.0 : MIN_OPACITY + (1.0 - MIN_OPACITY) * (index * (1 / items.length)),
              width: MAX_WIDTH * (item.value / totalValue),
            }}
          />
          <View style={styling.rowCenter}>
            <Text
              inverted
              colorPalette="accentBlue"
              colorShade="main"
              textClass="pMedium"
              style={styling.marginHorizontalTiny}>
              {item.label}
            </Text>
            <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pSmall">
              {item.title}
            </Text>
          </View>
        </View>
      ))}
    </>
  );
});

const styles = StyleSheet.create({
  text: {
    marginBottom: 'auto',
    marginLeft: 8,
    marginTop: 'auto',
  },
});
