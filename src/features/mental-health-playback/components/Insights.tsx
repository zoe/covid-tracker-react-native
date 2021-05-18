import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import Background from '@assets/mental-health-playback/Background';
import { selectInsightsByName } from '@covid/core/state/mental-health-playback/slice';
import { colors, grid, styling } from '@covid/themes';
import { IInsight } from '@covid/types/mental-health-playback';
import BarChart from '@covid/features/mental-health-playback/components/BarChart';
import InsightIllustration from '@covid/features/mental-health-playback/components/InsightIllustration';
import { Card, Spacer, Text, TextHighlight } from '@covid/components';
import i18n from '@covid/locale/i18n';

interface IProps {
  itemHeight: number;
  insights: IInsight[];
}

type TNumberObject = { [key: number]: number };

export default React.memo(function Insights(props: IProps) {
  const [illustrationHeights, setIllustrationHeights] = useState<TNumberObject>({});
  const insightsByName = useSelector(selectInsightsByName);

  function onLayoutView(event: LayoutChangeEvent, index: number) {
    setIllustrationHeights({
      ...illustrationHeights,
      [index]: event.nativeEvent.layout.height,
    });
  }

  return (
    <>
      {(props.insights || []).map((insight: IInsight, index: number) => (
        <View key={`insight-${index}`} style={{ height: props.itemHeight }}>
          {index === 0 ? (
            <View style={styling.flex}>
              <Spacer space={60} />
              <Card useShadow style={styles.card}>
                <Text>{i18n.t('mental-health-playback.general.explanation-card')}</Text>
              </Card>
            </View>
          ) : (
            <View style={styles.illustrationWrapper}>
              <Background
                preserveAspectRatio="none"
                height={index in illustrationHeights ? illustrationHeights[index] : 0}
              />
              <View
                onLayout={(event: LayoutChangeEvent) => onLayoutView(event, index)}
                style={[styling.absoluteFill, styling.centerCenter]}>
                <InsightIllustration
                  height={index in illustrationHeights ? illustrationHeights[index] - grid.xxl * 2 : 0}
                  type={insight.activity_name}
                />
              </View>
            </View>
          )}

          <View style={styles.contentWrapper}>
            <TextHighlight textClass="h3Regular" color={colors.accentBlue.main.bgColor} query="less">
              {i18n.t(`mental-health-playback.insights.${insight.activity_name}.title`)}
            </TextHighlight>
            <Text inverted style={styles.description} colorPalette="uiDark" colorShade="dark" textClass="p">
              {i18n.t(`mental-health-playback.insights.${insight.activity_name}.description`)}
            </Text>

            <BarChart color="#0165B5" items={insight.answers} />
          </View>

          <View style={styles.correlatedWrapper}>
            <Text inverted colorPalette="accentBlue" colorShade="main" textClass="p" textAlign="center">
              {i18n.t('mental-health-playback.general.correlated-description')}
            </Text>
            <View style={styles.activitiesWrapper}>
              {(insight.correlated_activities || [])
                .filter((activityName: string) => activityName in insightsByName)
                .map((activityName: string) => (
                  <View key={`insight-${index}-correlated-${activityName}`} style={styles.activityWrapper}>
                    <InsightIllustration height={45} width={50} type={activityName} />
                    <Text
                      textAlign="center"
                      inverted
                      colorPalette="accentBlue"
                      colorShade="main"
                      textClass="pSmall"
                      style={styling.marginTopSmall}>
                      {i18n.t(`mental-health-playback.insights.${activityName}.abbreviation`)}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        </View>
      ))}
    </>
  );
});

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    marginBottom: 'auto',
    marginHorizontal: 14,
    marginTop: 'auto',
  },
  illustrationWrapper: {
    flex: 1,
    position: 'relative',
  },
  contentWrapper: {
    marginBottom: grid.xxl,
    marginTop: grid.m,
    paddingHorizontal: grid.gutter,
  },
  description: {
    marginBottom: grid.xxl,
    marginTop: grid.m,
  },
  correlatedWrapper: {
    backgroundColor: '#F5F9FC',
    padding: grid.l,
  },
  activitiesWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: grid.m,
  },
  activityWrapper: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    paddingHorizontal: grid.m,
  },
});
