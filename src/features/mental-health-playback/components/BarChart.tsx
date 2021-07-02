import Mention from '@assets/mental-health-playback/Mention';
import { Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { styling } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IItem {
  title: string;
  label: string;
  value: number;
}

interface IProps {
  color: string;
  items: IItem[];
  userAnswer?: string;
}

const ITEM_HEIGHT = 50;
const MAX_WIDTH = 100;
const MIN_OPACITY = 0.4;

export default React.memo(function BarChart({ items = [], ...props }: IProps) {
  const totalValue = items.reduce((previousValue, item) => previousValue + item.value, 0);
  const translationDict: { [key: string]: string } = {
    LESS: i18n.t('less'),
    MORE: i18n.t('more'),
    NO_CHANGE: i18n.t('no-change'),
  };
  const answerIndex = items.findIndex((item) => item.title === props.userAnswer);
  return (
    <View>
      {items.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={`bar-chart-item-${index}`} style={styling.rowCenter}>
          {answerIndex === index ? (
            <Mention color="#A10056">
              <Text inverted colorPalette="ui" colorShade="lighter" style={styles.text} textClass="h6Regular">
                {i18n.t('you')}
              </Text>
            </Mention>
          ) : null}
          {answerIndex > -1 && answerIndex !== index ? <Mention color="#ffffff" /> : null}
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
              style={styling.marginHorizontalTiny}
              textClass="pMedium"
            >
              {item.label}
            </Text>
            <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pSmall">
              {item.title in translationDict ? translationDict[item.title] : item.title}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  text: {
    marginBottom: 'auto',
    marginLeft: 8,
    marginTop: 'auto',
  },
});
