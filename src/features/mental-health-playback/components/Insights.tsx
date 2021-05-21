import React, { useState } from 'react';
import { useWindowDimensions, LayoutChangeEvent, StyleSheet, View } from 'react-native';
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

  const windowWidth = useWindowDimensions().width;

  function onLayoutView(event: LayoutChangeEvent, index: number) {
    setIllustrationHeights({
      ...illustrationHeights,
      [index]: Math.floor(event.nativeEvent.layout.height),
    });
  }

  return (
    <>
      {(props.insights || []).map((insight: IInsight, index: number) => (
        <View key={`insight-${index}`} style={{ height: props.itemHeight, justifyContent: 'space-between' }}>
          {index === 0 ? (
            <View>
              <Spacer space={60} />
              <Card useShadow style={styles.card}>
                <Text>
                  {i18n.t('mental-health-playback.general.explanation-card')}{' '}
                  {i18n.t(`mental-health-playback.segments.${insight.segment}`, {
                    defaultValue: i18n.t('mental-health-playback.segments.general'),
                  })}
                </Text>
              </Card>
            </View>
          ) : null}

          {illustrationHeights[index] > 0 && illustrationHeights[index] < 100 ? null : (
            <View
              onLayout={(event: LayoutChangeEvent) => onLayoutView(event, index)}
              style={styles.illustrationWrapper}>
              {illustrationHeights[index] >= 100 ? (
                <>
                  <Background height={illustrationHeights[index]} preserveAspectRatio="none" width={windowWidth} />
                  <View style={[styling.absoluteFill, styling.centerCenter]}>
                    <InsightIllustration
                      height={illustrationHeights[index] - grid.xxl * 2}
                      type={insight.activity_name}
                    />
                  </View>
                </>
              ) : null}
            </View>
          )}

          <View style={styles.contentWrapper}>
            <TextHighlight
              textClass="h3Regular"
              color={colors.accentBlue.main.bgColor}
              query={
                insight.activity_name.includes('less')
                  ? i18n.t('mental-health-playback.less')
                  : i18n.t('mental-health-playback.more')
              }>
              {i18n.t(`mental-health-playback.insights.${insight.activity_name}.title`, {
                defaultValue: i18n.t('mental-health-playback.general.default-title'),
              })}
            </TextHighlight>
            <TextHighlight
              inverted
              color={colors.accentBlue.main.bgColor}
              style={styles.description}
              colorPalette="uiDark"
              colorShade="dark"
              textClass="p"
              query={insight.direction}>
              {i18n.t('mental-health-playback.general.insight-description', {
                direction: insight.direction,
                level_of_association: insight.level_of_association,
              })}
            </TextHighlight>
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
                      {i18n.t(`mental-health-playback.insights.${activityName}.abbreviation`, { defaultValue: '' })}
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
    maxHeight: 250,
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
